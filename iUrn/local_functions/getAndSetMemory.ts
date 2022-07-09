import Database from "../database/Database";
import { DocumentData } from "firebase/firestore";
import { UserNdefParams } from "../types";
import { Dimensions, Image } from "react-native";
//TODO: typing
export default function getAndSetMemory(setIsLoading:Function, params:UserNdefParams, setDimensions:Function, setUserDoc:Function ) {
    setIsLoading(true);
    Database.getRandomMemory(params.userNdef).then(
      (doc: DocumentData | null) => {
        Image.getSize(doc?.img, (width, height) => {
          const coefficient = (0.9 * Dimensions.get("window").width) / width;
          setDimensions([width * coefficient, height * coefficient]);
        });

        Database.getUserName(params.userNdef).then((name: String | null) => {
          setUserDoc({ ...doc, Name: name });
          setIsLoading(false);
        });
      }
    );
  }