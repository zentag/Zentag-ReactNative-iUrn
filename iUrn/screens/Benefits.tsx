import { View, TouchableOpacity, Image } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { Feather } from "@expo/vector-icons";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { Button } from "react-native-paper";

export default function Benefits({
  navigation,
}: {
  navigation: StackNavigationHelpers;
}) {
  const tailwind = useTailwind();
  /*

  | -------------------------------------------------------------------------------------------- |
  | IMPORTANT: THESE BUTTONS ARE STYLED WITH PERCENTAGES, CALUCLATED USING 18 AS THE DENOMINATOR |
  | -------------------------------------------------------------------------------------------- |

  */
 // TODO: Animate buttons and images sliding up?
  return (
    <View style={tailwind("bg-light-primary h-full")}>
      <View style={tailwind("flex items-center justify-around h-5/6")}>
      <TouchableOpacity onPress={() => navigation.navigate("ComingSoon")}>
        <Image source={require("../assets/images/ESympathyIcon.png")} style={tailwind("w-36 h-36 my-auto")}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("LivingWill")}>
        <Image source={require("../assets/images/LivingWillIcon.png")} style={tailwind("w-36 h-36 my-auto")}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Insurance")}>
        <Image source={require("../assets/images/LifeInsuranceIcon.png")} style={tailwind("w-36 h-36 my-auto")}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ComingSoon")}>
      <Image source={require("../assets/images/SupportIcon.png")} style={tailwind("w-36 h-36 my-auto")}/>
    </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        style={tailwind(
          "border-2 border-black rounded-full m-auto"
        )}
        onPress={() => navigation.navigate("NewHome")}
      >
        <Feather name="x" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
