import { DocumentData } from "firebase/firestore";
import { Text, View, Image } from "react-native";
import { useTailwind } from "tailwind-rn";
import { useEffect, useState } from "react";
import { UserNdefParams } from "../types";
import Database from "../database/Database";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import goBack from "../local_functions/goBack";
import { IconButton } from "react-native-paper";

export default function MemorialWall({ params }: { params: UserNdefParams }) {
  const [userDoc, setUserDoc] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState<Array<number> | null>(null);
  // TODO: modularize this stuff and un-bodge it
  useEffect(() => {
    setIsLoading(true);
    Database.getUserMemorial(params.userNdef).then(
      (doc: DocumentData | null) => {
        Image.getSize(doc?.img, (width, height) => {
          const coefficient = (0.9 * Dimensions.get("window").width) / width;
          setDimensions([width * coefficient, height * coefficient]);
          setUserDoc(doc);
          setIsLoading(false);
        });
      }
    );
  }, []);
  const tailwind = useTailwind();
  const navigation = useNavigation();
  return (
    <>
      <IconButton icon="close" onPress={goBack(navigation)} />
      {isLoading == false && (
        <>
          <View style={tailwind("justify-center items-center p-8")}>
            <Text style={tailwind("text-lg font-bold")}>
              {`Celebrating the life of ${userDoc?.Name}` || "No Memorial Available"}
            </Text>
            <Image
              source={
                userDoc?.img
                  ? {
                      uri: userDoc?.img,
                    }
                  : require("../assets/images/placeholder.png")
              }
              style={{
                width: dimensions?.[0] || 192,
                height: dimensions?.[1] || 192,
                ...tailwind(""),
              }}
            />
            <Text>{userDoc?.Memorial || ""}</Text>
          </View>
        </>
      )}
    </>
  );
}
