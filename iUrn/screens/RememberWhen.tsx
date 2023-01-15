import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import { useEffect, useState, useRef } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { Dimensions } from "react-native";
import {
  AntDesign,
  MaterialCommunityIcons,
  Feather,
  Entypo,
} from "@expo/vector-icons";
import { Animated } from "react-native";
import * as FileSystem from "expo-file-system";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useIsFocused } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
export default function RememberWhen({
  navigation,
}: {
  navigation: StackNavigationHelpers;
}) {
  const [type, setType] = useState(CameraType.back);
  const [camPermission, requestCamPermission] = Camera.useCameraPermissions();
  const [micPermission, requestMicPermission] =
    Camera.useMicrophonePermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [opacity, setOpacity] = useState(new Animated.Value(1));
  const [isReady, setIsReady] = useState(false);
  const [blackoutViewOpacity, setBlackoutViewOpacity] = useState(0);
  const camera = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const tailwind = useTailwind();

  useEffect(() => {
    requestCamPermission();
    requestMicPermission();
    function animate() {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(animate);
      });
    }
    animate();
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  async function toggleRecord() {
    if (!isReady) return;
    if (!isRecording) {
      camera?.current?.recordAsync().then((result) => {
        if (!result) return;
        navigation.navigate("ImagePreview", {
          video: result.uri,
        });
      });
    } else camera?.current?.stopRecording();
    setIsRecording((current) => !current);
  }

  async function takePicture() {
    if (!isReady) return;
    if (!camera) return;
    setBlackoutViewOpacity(0.4);
    const result = await camera.current?.takePictureAsync();
    setBlackoutViewOpacity(0);
    if (!result) return;
    const width = result.width;
    const height = result.height;
    let coefficient = (0.8 * Dimensions.get("window").height) / height;
    if (width * coefficient > Dimensions.get("window").width) {
      coefficient = (0.9 * Dimensions.get("window").width) / width;
    }
    navigation.navigate("ImagePreview", {
      dimensions: [width * coefficient, height * coefficient],
      image: result,
    });
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      const width = result.width;
      const height = result.height;
      let coefficient = (0.8 * Dimensions.get("window").height) / height;
      if (width * coefficient > Dimensions.get("window").width) {
        coefficient = (0.9 * Dimensions.get("window").width) / width;
      }
      navigation.navigate("ImagePreview", {
        dimensions: [width * coefficient, height * coefficient],
        image: result.duration ? null : result,
        video: result.duration ? result.uri : null,
      });
    }
  };

  return (
    <>
      <View
        pointerEvents="none"
        style={{
          opacity: blackoutViewOpacity,
          ...tailwind("bg-black h-full w-full absolute top-0 left-0 z-50"),
        }}
      />
      <View
        style={tailwind("bg-gray-900 w-full h-full flex flex-col items-center")}
      >
        {isFocused && (
          <Camera
            ref={camera}
            style={{
              height: Dimensions.get("window").width * (4 / 3),
              ...tailwind("w-full mt-16"),
            }}
            type={type}
            onCameraReady={() => setIsReady(true)}
          />
        )}

        <View
          style={tailwind(
            "flex flex-row justify-between items-center flex-1 w-5/6"
          )}
        >
          <TouchableOpacity style={tailwind("w-24 h-24")} onPress={pickImage}>
            <AntDesign
              name="picture"
              size={40}
              color="white"
              style={tailwind("m-auto")}
            />
          </TouchableOpacity>
          <View style={tailwind("flex flex-col items-center")}>
            <TouchableOpacity
              style={tailwind(
                "flex flex-row items-center border-2 border-white rounded-full p-1"
              )}
              onPress={toggleRecord}
            >
              {!isRecording ? (
                <>
                  <Entypo name="controller-record" size={20} color="red" />
                  <Text style={tailwind("text-white mr-1")}>Rec</Text>
                </>
              ) : (
                <Animated.View style={{ opacity: opacity }}>
                  <MaterialCommunityIcons
                    name="square-rounded"
                    size={20}
                    color="red"
                  />
                </Animated.View>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={takePicture}>
              <Feather
                name="circle"
                size={75}
                color="white"
                style={tailwind("my-2")}
              />
            </TouchableOpacity>
            {/*TODO: make sure to stop recording when this is pressed*/}
            <TouchableOpacity
              style={tailwind("border-2 border-white rounded-full")}
            >
              <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={tailwind("w-24 h-24")}
            onPress={toggleCameraType}
          >
            <Entypo
              name="cycle"
              size={40}
              color="white"
              style={tailwind("m-auto")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
