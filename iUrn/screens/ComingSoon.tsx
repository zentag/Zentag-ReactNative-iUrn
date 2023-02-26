import { View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { Feather } from "@expo/vector-icons";
export default function ComingSoon({
    navigation,
  }: {
    navigation: StackNavigationHelpers;
  }) {
    const tailwind = useTailwind();
  return (
    <View style={tailwind("bg-light-primary w-full h-full")}>
      <Text style={tailwind("mx-auto")}>Coming Soon</Text>
      <TouchableOpacity
        style={tailwind(
          "border-2 border-black rounded-full absolute bottom-8 ml-[-12px] left-1/2"
        )}
        onPress={() => navigation.goBack()}
        accessibilityLabel="Close page"
        accessibilityHint="Closes the current page"
      >
        <Feather name="x" size={24} color="black" />
      </TouchableOpacity>
    </View>
  )
}