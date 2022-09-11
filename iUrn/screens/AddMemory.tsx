import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { memo, useEffect, useState } from "react";
import { TextInput, View, Text, Image, Dimensions } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useTailwind } from "tailwind-rn/dist";
import IFirebase from "../firebase/IFirebase";
import goBack from "../local_functions/goBack";
import * as ImagePicker from "expo-image-picker";
//TODO: typing
export default function AddMemory({
  route,
  navigation,
}: {
  route: any;
  navigation: StackNavigationHelpers;
}) {
  const tailwind = useTailwind();
  const [memory, setMemory] = useState<string>("Memorial");
  const nav = useNavigation();
  const isFocused = useIsFocused();
  const [image, setImage] = useState<null | ImagePicker.ImagePickerResult>(
    null
  );
  const [dimensions, setDimensions] = useState<null | number[]>(null);
  useEffect(() => {
    if(!isFocused) return
    if (route.params?.cancelled === true) {
      setImage(null);
    }
  }, [isFocused]);
  const pickImage = async (launchCamera:boolean) => {
    // No permissions request is necessary for launching the image library
    let result 

    if(launchCamera){
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        base64: true,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        base64: true,
      });
    }

    if (!result.cancelled) {
      setImage(result);
      const width = result.width;
      const height = result.height;
      let coefficient = (0.8 * Dimensions.get("window").height) / height;
      if (width * coefficient > Dimensions.get("window").width){
        coefficient = (0.9 * Dimensions.get("window").width) / width;
        console.warn(width, height, coefficient, Dimensions.get("window"))
      }
      setDimensions([width * coefficient, height * coefficient]);
      navigation.navigate("ImagePreview", {
        dimensions: [width * coefficient, height * coefficient],
        image: result,
      });
    }
  };
  const inputStyles = {
    ...tailwind("border-b-2 w-2/3 p-2 text-center border-light-secondary"),
  };

  return (
    <View
      style={tailwind(
        "w-full h-full bg-light-primary items-center overflow-scroll"
      )}
    >
      <IconButton
        icon={require("../assets/images/back-arrow.png")}
        onPress={goBack(nav)}
        color="#000000"
        style={tailwind("absolute left-2 top-2")}
      />
      <Text style={tailwind("mt-12 text-xl")}>Add Memory</Text>
      <View style={tailwind("bg-light-secondary h-0.5 w-64")}/>
      <Button onPress={() => pickImage(false)} labelStyle={tailwind("text-light-secondary")} style={tailwind("mt-4")}>Pick an image from camera roll</Button>
      <Text style={tailwind("font-bold")}>Or</Text>
      <Button onPress={() => pickImage(true)}>Take a picture</Button>
      {image !== null && <Text>Image Selected</Text>}
      {image == null && <Text>No Image Selected</Text>}
      <TextInput
        accessibilityLabel="description of memory"
        placeholder="Description of Image"
        style={{ ...inputStyles, ...tailwind("mt-24") }}
        onChangeText={setMemory}
      />
      <Button
        mode="contained"
        color="#000cf5"
        style={tailwind("rounded-full mt-8")}
        onPress={() => {
          if (!image || image.cancelled) return navigation.navigate("Home");
          IFirebase.addMemory(image.uri, memory);
          navigation.navigate("Home");
        }}
      >
        Submit Memory
      </Button>
    </View>
  );
}
