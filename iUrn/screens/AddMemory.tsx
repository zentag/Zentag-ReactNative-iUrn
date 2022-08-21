import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { memo, useEffect, useState } from "react";
import { TextInput, View, Text, Image, Dimensions } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useTailwind } from "tailwind-rn/dist";
import IFirebase from "../firebase/IFirebase";
import goBack from "../local_functions/goBack";
import * as ImagePicker from "expo-image-picker";

export default function AddMemory({
  navigation,
}: {
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      setImage(result);
      const width = result.width;
      const height = result.height;
      let coefficient = (0.6 * Dimensions.get("window").height) / height;
      if (width * coefficient > Dimensions.get("window").width)
        coefficient = (0.9 * Dimensions.get("window").width) / width;
      setDimensions([width * coefficient, height * coefficient]);
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
      <Button onPress={pickImage}>Pick an image from camera roll</Button>
      {image && (
        <Image
          source={{ uri: image && !image.cancelled ? image.uri : "" }}
          style={{
            width: dimensions ? dimensions[0] : 0,
            height: dimensions ? dimensions[1] : 0,
          }}
        />
      )}
      <TextInput
        accessibilityLabel="description of memory"
        placeholder="Description of Image"
        style={{ ...inputStyles, ...tailwind("mt-24") }}
        onChangeText={setMemory}
      />
      <Button
        mode="contained"
        color="#444eff"
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
