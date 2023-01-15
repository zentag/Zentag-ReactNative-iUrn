import { Camera, CameraType } from "expo-camera";
import { useEffect, useState, useRef } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { Dimensions } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Animated } from "react-native";
import * as FileSystem from "expo-file-system"
export default function RememberWhen() {
  const [type, setType] = useState(CameraType.back);
  const [camPermission, requestCamPermission] = Camera.useCameraPermissions();
  const [micPermission, requestMicPermission] = Camera.useMicrophonePermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [opacity, setOpacity] = useState(new Animated.Value(1))
  const camera = useRef<Camera>(null)
  const tailwind = useTailwind();

  useEffect(() => {
    requestCamPermission()
    requestMicPermission()
    const width = Dimensions.get("window").width;
    let height = width * (4 / 3);
    function animate() {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(opacity, {
            toValue: 1,
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

  async function toggleRecord(){
    camera?.current?.stopRecording()
    if(!isRecording) camera?.current?.recordAsync()
    setIsRecording(current => !current)
    //@ts-ignore
    console.log(await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory + "Camera"))

  }

  async function takePicture(){
    if(!camera) return
    camera.current?.takePictureAsync()
    //@ts-ignore
    console.log(await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory + "Camera"))
  }

  return (
    <View
      style={tailwind("bg-gray-900 w-full h-full flex flex-col items-center")}
    >
      <Camera
      ref={camera}
        style={{
          height: Dimensions.get("window").width * (4 / 3),
          ...tailwind("w-full mt-16"),
        }}
        type={type}
      />
      <View
        style={tailwind(
          "flex flex-row justify-between items-center flex-1 w-5/6"
        )}
      >
        <TouchableOpacity style={tailwind("w-24 h-24")}>
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
                <Animated.View style={{opacity: opacity}}>
                    <MaterialCommunityIcons name="square-rounded" size={20} color="red"/>
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
  );
}
