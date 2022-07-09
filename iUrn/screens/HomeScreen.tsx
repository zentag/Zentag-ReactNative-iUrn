import { RandomMemory } from "../components/RandomMemory";
import { Text, View, Image, Dimensions, PixelRatio } from "react-native";
import { useTailwind } from "tailwind-rn";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { DocumentData } from "firebase/firestore";
import { useState } from "react";
import { UserNdefParams } from '../types';
import getAndSetMemory from "../local_functions/getAndSetMemory";
import goBack from "../local_functions/goBack";


//TODO: add typing to userNdef
export default function HomeScreen({ params }: { params: UserNdefParams }) {
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState<Array<number> | null>(null);
  const [userDoc, setUserDoc] = useState<DocumentData | null>(null)
  useEffect(() => {
    getAndSetMemory(setIsLoading, params, setDimensions, setUserDoc);
  }, []);
  const tailwind = useTailwind();
  const navigation = useNavigation();

  
  return (
    <View>
      {/*DESIGN: This should be in the upper right corner*/}
      <IconButton icon="close" onPress={goBack(navigation)} />
      {isLoading == false && (
        <RandomMemory
          tailwind={tailwind}
          userDoc={userDoc}
          dimensions={dimensions}
        />
      )}
    </View>
  );
}
