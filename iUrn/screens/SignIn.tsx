import { useNavigation } from "@react-navigation/native"
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { Text, TouchableOpacity, View } from "react-native"
import { useTailwind } from "tailwind-rn/dist";
export default function SignIn({
    navigation,
  }: {
    navigation: StackNavigationHelpers;
  }){
    const tailwind = useTailwind()
    return (
        <View style={tailwind("bg-light-primary w-full h-full")}>
            <Text>Sign in</Text>
            <TouchableOpacity onPress={() => {navigation.navigate("ScanScreen")}}>
                <Text style={tailwind("text-blue-800")}>Or continue anonymously</Text>
            </TouchableOpacity>
        </View>
    )
}