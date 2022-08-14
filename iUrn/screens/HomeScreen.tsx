import { View, Text } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import IFirebase from "../firebase/IFirebase";
import goBack from "../local_functions/goBack";
import { IconButton } from "react-native-paper";

export default function HomeScreen({
  navigation,
}: {
  navigation: StackNavigationHelpers;
}) {
  const tailwind = useTailwind();
  const isFocused = useIsFocused();
  const [array, setArray] = useState<any>(null);
  useEffect(() => {
    if (isFocused) {
      async function statenstuff() {
        const setup = await IFirebase.setupCheck();
        setArray(setup);
      }
      statenstuff();
    }
  }, [isFocused]);
  const dimension = 0.45 * Dimensions.get("window").width;
  return (
    <View
      style={tailwind(
        "flex flex-col bg-light-primary w-full h-full items-center"
      )}
    >
      <IconButton
        icon={require("../assets/images/back-arrow.png")}
        onPress={() => navigation.navigate("ScanScreen")}
        color="#000000"
        style={tailwind("absolute left-2 top-2")}
      />
      <Text style={tailwind("text-2xl mt-4")}>Your iUrn Page</Text>
      {Array.isArray(array) &&
        array != [] &&
        array.map(
          (
            {
              display,
              redirect,
              params,
            }: {
              display: string;
              redirect: string;
              params?: object;
            },
            index
          ) => (
            <TouchableOpacity
              style={tailwind(
                `border-4 rounded-lg w-96 h-40 mt-4 items-center justify-center`
              )}
              onPress={() => navigation.navigate(redirect, params)}
              key={index}
            >
              <Text style={tailwind("text-3xl font-bold")}>{display}</Text>
              <View style={tailwind("bg-light-secondary h-0.5 w-52")} />
            </TouchableOpacity>
          )
        )}
    </View>
  );
}
