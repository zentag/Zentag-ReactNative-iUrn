import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useEffect, useState } from "react";
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
export default function ForgotPassword({
  navigation,
}: {
  navigation: StackNavigationHelpers;
}) {
  const tailwind = useTailwind();
  const nav = useNavigation();
  const [email, setEmail] = useState<string | null>(null);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    setIncorrectEmail(false);
    setEmail(null);
  }, [isFocused]);
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
      <Text style={tailwind("mt-12 text-xl")}>Forgot Password</Text>
      <View style={tailwind("bg-light-secondary h-0.5 w-48 mt-1")} />
      <TextInput
        accessibilityHint="email"
        placeholder="Email"
        style={{ ...inputStyles, ...tailwind("mt-24") }}
        onChangeText={(e) => {
          setEmail(e);
          setIncorrectEmail(false);
        }}
      />
      <Text
        style={{ opacity: incorrectEmail ? 1 : 0, ...tailwind("text-red-800") }}
      >
        Please enter a valid email
      </Text>
      <Button
        mode="contained"
        color="#0A73EB"
        style={tailwind("rounded-full mt-8")}
        onPress={async () => {
          if (!email) return setIncorrectEmail(true);
          const error = await IFirebase.sendResetEmail(email)
          if (error)
            return setIncorrectEmail(true);
          navigation.navigate("SignIn");
        }}
      >
        Send Reset Email
      </Button>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Text style={tailwind("text-blue-800 mt-[90%] mx-2")}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
