import { useNavigation } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useState } from "react";
import { TextInput, View, Text } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useTailwind } from "tailwind-rn/dist";
import IFirebase from "../firebase/IFirebase";
import goBack from "../local_functions/goBack";

export default function AddName({
  navigation,
}: {
  navigation: StackNavigationHelpers;
}) {
  const tailwind = useTailwind();
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const nav = useNavigation();
  const inputStyles = {
    ...tailwind("border-b-2 w-2/3 h-10 p-2 text-center border-light-secondary"),
  };
  return (
    <View style={tailwind("w-full h-full bg-light-primary items-center")}>
      <IconButton
        icon={require("../assets/images/back-arrow.png")}
        onPress={goBack(nav)}
        color="#000000"
        style={tailwind("absolute left-2 top-2")}
      />
      <Text style={tailwind("mt-12 text-xl")}>Edit Name</Text>
      <TextInput
        accessibilityLabel="first name"
        placeholder="First name"
        style={{ ...inputStyles, ...tailwind("mt-24") }}
        onChangeText={setFirstName}
      />
      <TextInput
        accessibilityLabel="last name"
        placeholder="Last name"
        style={{ ...inputStyles, ...tailwind("mt-4") }}
        onChangeText={setLastName}
      />
      <Button
        mode="contained"
        color="#000cf5"
        style={tailwind("rounded-full mt-8")}
        onPress={() => {
          IFirebase.updateName([firstName, lastName]);
          navigation.navigate("Home");
        }}
      >
        Submit Name
      </Button>
    </View>
  );
}
