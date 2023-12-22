import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { memo, useEffect, useState } from "react";
import { TextInput, View, Text, Image, Dimensions, Alert } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useTailwind } from "tailwind-rn/dist";
import IFirebase from "../firebase/IFirebase";
import goBack from "../local_functions/goBack";
import * as ImagePicker from "expo-image-picker";
import { connectAuthEmulator } from "firebase/auth";
import DropDownPicker from 'react-native-dropdown-picker';
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
  const [media, setMedia] = useState<null | string>(
    null
  );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Loading...", value: "loading" }
  ]);
  const inputStyles = {
    ...tailwind("border-b-2 w-2/3 p-2 text-center border-light-secondary"),
  };
  useEffect(() => {
    if (!isFocused) return
    
    IFirebase.getUser().then((u: Object) => {
      //@ts-ignore
      IFirebase.getUserDoc(u.uid).then((doc: any) => {
        let items: Object[] = [];
        console.warn(doc)
        doc.Pages?.forEach((str: String) => {
          console.log(str)
          IFirebase.getPageName(str).then((n: String) => {
            items.push({ label: n, value: str })
            console.log(items)
          })
        })
        console.log(items)

        //@ts-ignore
        setItems(items)
      })
    })

    if (!route.params?.videoURI && !route.params?.imageURI) {
      navigation.navigate("RememberWhen")
      Alert.alert("Something went wrong")
    } else {
      setMedia(route.params.videoURI ?? route.params.imageURI)
    }
  }, [isFocused])
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
      <View style={tailwind("bg-light-secondary h-0.5 w-64")} />
      <Text>Media Selected</Text>
      <TextInput
        accessibilityLabel="description of memory"
        placeholder="Description of Media"
        style={{ ...inputStyles, ...tailwind("mt-24") }}
        onChangeText={setMemory}
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
      />
      <Button
        mode="contained"
        color="#0099ff"
        style={tailwind("rounded-full mt-8")}
        onPress={() => {
          IFirebase.addMemory(media, memory, route.params.videoURI ? true : false, value);
          navigation.navigate("NewHome");
        }}
      >
        Submit Memory
      </Button>
    </View>
  );
}
