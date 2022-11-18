import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useEffect, useState } from "react";
import { TextInput, View, Text } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useTailwind } from "tailwind-rn/dist";
import IFirebase from "../firebase/IFirebase";
import goBack from "../local_functions/goBack";

export default function AddMemorial({
    navigation,
  }: {
    navigation: StackNavigationHelpers;
  }) {
  const tailwind = useTailwind();
  const [memorial, setMemorial] = useState<string>("Memorial");
  const nav = useNavigation();
  const isFocused = useIsFocused();
  useEffect(() => {
    async function fun() {
      const user = await IFirebase.getUser();
      const userDoc = await IFirebase.getUserMemorial(user.uid);
      setMemorial(userDoc?.Memorial);
    }
    fun();
  }, [isFocused]);
  const inputStyles = {
    ...tailwind("border-b-2 w-2/3 p-2 text-center border-light-secondary"),
  };
  return (
    <View style={tailwind("w-full h-full bg-light-primary items-center")}>
      <IconButton
        icon={require("../assets/images/back-arrow.png")}
        onPress={goBack(nav)}
        color="#000000"
        style={tailwind("absolute left-2 top-2")}
      />
      <Text style={tailwind("mt-12 text-xl")}>Edit Memorial</Text>
      <TextInput
        accessibilityLabel="memorial"
        placeholder="Memorial"
        style={{ ...inputStyles, ...tailwind("mt-24") }}
        onChangeText={setMemorial}
        value={memorial}
        multiline
      />
      <Button
        mode="contained"
        color="#0099ff"
        style={tailwind("rounded-full mt-8")}
        onPress={() => {
          IFirebase.updateMemorial(memorial);
          navigation.navigate("Home");
        }}
      >
        Submit Memorial
      </Button>
    </View>
  );
}
