import { Route, StackActionHelpers } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { Image, View } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { Button } from "react-native-paper";
export default function ImagePreview({ route, navigation, setImage }: { route: any, navigation:StackNavigationHelpers, setImage:Function }) {
  const tailwind = useTailwind();
  const image = route?.params?.image;
  const dimensions = route?.params?.dimensions;
  const video = route?.params?.video
  return (
    <View
      style={tailwind(
        "w-full h-full bg-light-primary items-center justify-center"
      )}
    >
      {!video && <Image
        source={{ uri: image && !image.cancelled ? image.uri : "" }}
        style={{
          width: dimensions ? dimensions[0] : 0,
          height: dimensions ? dimensions[1] : 0,
        }}
      />}
      <Button
        mode="contained"
        color="#0099ff"
        style={tailwind("mt-8 rounded-full")}
        onPress={() => navigation.navigate("AddMemory", {cancelled:false})}
      >
        Use this image
      </Button>
      <Button onPress={() =>{ 
        navigation.navigate("AddMemory", {cancelled:true})}}>Cancel</Button>
    </View>
  );
}
