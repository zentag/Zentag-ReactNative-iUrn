import IFirebase from "../firebase/IFirebase";
import { DocumentData } from "firebase/firestore";
import { UserNdefParams } from "../types";
import { Dimensions, Image } from "react-native";
//TODO: typing
export default function getAndSetMemory(
  setIsLoading: Function,
  params: UserNdefParams,
  setDimensions: Function,
  setUserDoc: Function
) {
  setIsLoading(true);
  IFirebase.getRandomMemory(params.userNdef).then(
    (doc: DocumentData | null) => {
      Image.getSize(doc?.img, (width, height) => {
        let coefficient = (0.9 * Dimensions.get("window").width) / width;
        if ((height * coefficient) > (Dimensions.get("window").height * 0.6))
          coefficient = (0.6 * Dimensions.get("window").height) / height
        setDimensions([width * coefficient, height * coefficient]);
      });

      IFirebase.getUserName(params.userNdef).then((name: String | null) => {
        setUserDoc({ ...doc, Name: name });
        setIsLoading(false);
      });
    }
  );
}
