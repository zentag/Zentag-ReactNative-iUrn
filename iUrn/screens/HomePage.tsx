import { Image, View, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { Feather } from '@expo/vector-icons'; 
export default function HomePage({
    navigation,
  }: {
    navigation: StackNavigationHelpers;
  }) {
    const tailwind = useTailwind()
  return (
    <View style={tailwind("items-center bg-light-primary w-full h-full")}>
      {/*TODO: Fix positioning*/}
      <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={tailwind("relative top-8 left-1/3")}><Image source={require("../assets/images/ProfileIcon.png")} style={tailwind("w-24 h-24")}/></TouchableOpacity>
      <Image
        style={{ ...tailwind("w-96 h-96 mt-4") }}
        source={require("../assets/images/I-urn-logo.png")}
      />
      <TouchableOpacity onPress={() => navigation.navigate("RememberWhen")} activeOpacity={.6} style={tailwind("")}>
      <Image source={require("../assets/images/AddButton.png")} style={tailwind("w-24 h-24")}/></TouchableOpacity>
    <View style={tailwind("flex flex-row absolute bottom-4")}>
        <TouchableOpacity onPress={() => navigation.navigate("Benefits")}><Image source={require("../assets/images/BenefitsIcon.png")} style={tailwind("w-24 h-24")}/></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ComingSoon")}><Image source={require("../assets/images/SupportIcon.png")} style={tailwind("w-24 h-24")}/></TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ComingSoon")}><Image source={require("../assets/images/SecurityIcon.png")} style={tailwind("w-24 h-24")}/></TouchableOpacity>
    </View>
    </View>
  );
}
