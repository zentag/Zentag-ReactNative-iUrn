import { Text, View, Image } from "react-native";
import { useTailwind } from "tailwind-rn";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import Database from "../database/Database";
import { DocumentData } from "firebase/firestore";
import { useState } from "react";

type UserNdefParams = {
  userNdef?: string;
  setIsScanning?: Function;
};
//TODO: add typing to userNdef
export default function HomeScreen({ params }: { params: UserNdefParams }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userDoc, setUserDoc] = useState<DocumentData | null>(null);
  const [dimensions, setDimensions] = useState<Array<number> | null>(null);
  useEffect(() => {
    setIsLoading(true);
    Database.getRandomMemory(params.userNdef).then(
      (doc: DocumentData | null) => {
        Image.getSize(doc?.img, (width, height) => {
          setDimensions([width, height]);
        });
        
      Database.getUserName(params.userNdef).then((name: String | null) => {
        setUserDoc({...doc, Name:name})
        setIsLoading(false);
      })
      }
      
    );
  }, []);
  const tailwind = useTailwind();
  const navigation = useNavigation();
  function handlePress() {
    navigation.goBack();
  }
  return (
    <View>
      {/*DESIGN: This should be in the upper right corner*/}
      <IconButton icon="close" onPress={handlePress} />
      {isLoading == false && (
        <View>
          <Text>{userDoc?.Name || "No Memories Available"}</Text>
          <Image
            source={
              userDoc?.img
                ? { uri: userDoc?.img }
                : require("../assets/images/placeholder.png")
            }
            style={{
              width: dimensions?.[0] || 192,
              height: dimensions?.[1] || 192,
              ...tailwind(""),
            }}
          />
          <Text>{userDoc?.Description || ""}</Text>
        </View>
      )}
    </View>
  );
}
