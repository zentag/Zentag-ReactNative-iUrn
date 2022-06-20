import { Image, ImageSourcePropType } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function RandomImage({
  imgSource,
}: {
  imgSource: ImageSourcePropType | null;
}) {
    if (imgSource == null){
        return <Image testID="error" source={require("../assets/images/placeholder2.png")}/>
    } else return <Image source={imgSource} />;
}
