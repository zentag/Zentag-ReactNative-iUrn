import { useNavigation } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useTailwind } from "tailwind-rn/dist";
import SvgComponent from "../components/ArrowBackSvg";
import goBack from "../local_functions/goBack";
import IFirebase from "../firebase/IFirebase";
export default function SignIn({
  navigation,
}: {
  navigation: StackNavigationHelpers;
}) {
  const tailwind = useTailwind();
  const nav = useNavigation();
  const [email, setEmail] = useState<string | null>(null)
  const [pass, setPass] = useState<string | null>(null)
  //TODO: export this somewhere
  const inputStyles = {
    ...tailwind("border-b-2 w-2/3 h-10 p-2 text-center border-light-secondary"),
  };
  return (
    <View style={tailwind("items-center bg-light-primary w-full h-full")}>
      <IconButton
        icon={require("../assets/images/back-arrow.png")}
        onPress={goBack(nav)}
        color="#000000"
        style={tailwind("absolute left-2 top-2")}
      />
      <Text style={tailwind("mt-12 text-xl")}>Log in</Text>
      <View style={tailwind("bg-light-secondary h-0.5 w-20 mt-1")} />
      <TextInput
        accessibilityLabel="email"
        placeholder="Email"
        style={{ ...inputStyles, ...tailwind("mt-24") }}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        textContentType="password"
        secureTextEntry={true}
        style={{ ...inputStyles, ...tailwind("mt-6") }}
        onChangeText={setPass}
      />
      <Button
        mode="contained"
        color="#0099ff"
        style={tailwind("rounded-full mt-8")}
        onPress={() => {
          if(!email || !pass) return //TODO: error message
          IFirebase.logInUser(email, pass) //TODO: handle unsuccessful login
          //TODO: navigate to better place
          navigation.navigate("AfterSignIn")
        }}
      >
        Log in
      </Button>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text style={tailwind("text-blue-800 mt-[90%]")}>No account?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ScanScreen");
        }}
      >
        {/*TODO:*/}
        <Text style={tailwind("text-blue-800")}>Forgot your password?</Text>
      </TouchableOpacity>
    </View>
  );
}
