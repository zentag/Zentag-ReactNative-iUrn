import { Dimensions } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { Image, View, Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { Button } from "react-native-paper";
import { Video, ResizeMode } from "expo-av";
import { useRef } from "react";
export default function ImagePreview({
  route,
  navigation,
  setImage,
}: {
  route: any;
  navigation: StackNavigationHelpers;
  setImage: Function;
}) {
  const tailwind = useTailwind();
  const videoRef = useRef(null);
  const image = route?.params?.image;
  const dimensions = route?.params?.dimensions;
  const video = route?.params?.video;
  return (
    <View
      style={tailwind(
        "w-full h-full bg-light-primary items-center justify-center"
      )}
    >
      {!video && image && (
        <Image
          source={{ uri: image && !image.cancelled ? image.uri : "" }}
          style={{
            width: dimensions ? dimensions[0] : 0,
            height: dimensions ? dimensions[1] : 0,
          }}
        />
      )}
      {!image && video && (
        <Video
          resizeMode={ResizeMode.COVER}
          style={{
            width: dimensions ? dimensions[0] : Dimensions.get("window").width * .9,
            height: dimensions ? dimensions[1] : Dimensions.get("window").height * .9,
          }}
          ref={videoRef}
          isLooping={true}
          shouldPlay={true}
          isMuted={false}
          source={{ uri: video }}
          volume={1}
        ></Video>
      )}
      <Button
        mode="contained"
        color="#0099ff"
        style={tailwind("mt-8 rounded-full")}
        onPress={() => navigation.navigate("AddMemory", { cancelled: false })}
      >
        Use this image
      </Button>
      <Button
        onPress={() => {
          navigation.navigate("AddMemory", { cancelled: true });
        }}
      >
        Cancel
      </Button>
    </View>
  );
}
