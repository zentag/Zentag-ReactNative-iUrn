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
      <Image
        source={require("../assets/images/benefits.png")}
        style={tailwind("w-5/6 mx-auto mt-8")}
      />
      <Button
        mode="contained"
        color="#00b4d8"
        dark
        disabled //TODO: Remove disabled and add page
        style={tailwind("rounded-full m-8 w-[88.8%] h-12 mx-auto")}
        contentStyle={tailwind("h-full")}
        onPress={() => navigation.navigate("ESympathy")}
      >
        E-Sympathy
      </Button>
      <Image
        source={require("../assets/images/givinghand.png")}
        style={tailwind("mx-auto mt-2")}
      />
      <Button
        mode="contained"
        color="#0096c7"
        dark
        style={tailwind("rounded-full m-8 w-[66.6%] h-12 mx-auto")}
        contentStyle={tailwind("h-full")}
        onPress={() => navigation.navigate("LivingWill")}
      >
        Living Will
      </Button>
      <Button
        mode="contained"
        color="#0077b6"
        dark
        style={tailwind("rounded-full w-[55.5%] h-12 mx-auto")}
        contentStyle={tailwind("h-full")}
        onPress={() => navigation.navigate("Insurance")}
      >
        Insurance
      </Button>
      <Button
        mode="contained"
        color="#015ba0"
        dark
        disabled //TODO: Remove disabled and add page
        style={tailwind("rounded-full mt-8 w-[50%] h-12 mx-auto")}
        contentStyle={tailwind("h-full")}
        onPress={() => navigation.navigate("Support")}
      >
        Support
      </Button>
      
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
