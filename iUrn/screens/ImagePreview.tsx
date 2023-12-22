import { Dimensions } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { Image, View, Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { Button } from "react-native-paper";
import { Video, ResizeMode } from "expo-av";
import { useEffect, useRef, useState } from "react";
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
  const [imageURI, setImageURI] = useState(route?.params?.imageURI)
  const [dimensions, setDimensions] = useState(route?.params?.dimensions)
  const [videoURI, setVideoURI] = useState(route?.params?.videoURI)

  useEffect(() => {
    setImageURI(route?.params?.imageURI)
    setDimensions(route?.params?.dimensions)
    setVideoURI(route?.params?.videoURI)
  }, [])
  return (
    <View
      style={tailwind(
        "w-full h-full bg-light-primary items-center justify-center"
      )}
    >
      {!videoURI && imageURI && (
        <Image
          source={{ uri: imageURI || "" }}
          style={{
            width: dimensions ? dimensions[0] : 0,
            height: dimensions ? dimensions[1] : 0,
          }}
        />
      )}
      {!imageURI && videoURI && (
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
          source={{ uri: videoURI }}
          volume={1}
        ></Video>
      )}
      <Button
        mode="contained"
        color="#0099ff"
        style={tailwind("mt-8 rounded-full")}
        onPress={() => navigation.navigate("AddMemory", { videoURI: videoURI, imageURI: imageURI })}
      >
        Use this image
      </Button>
      <Button
        onPress={() => {
          navigation.navigate("RememberWhen");
        }}
      >
        Cancel
      </Button>
    </View>
  );
}
