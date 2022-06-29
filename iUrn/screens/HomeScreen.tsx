import { Text, View } from "../components/Themed";
import { useTailwind } from "tailwind-rn";
import { NavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

//TODO: add typing to userNdef
export default function HomeScreen({ userNdef }: { userNdef: any }) {
  const tailwind = useTailwind();
  return (
    // returning the string value in the tag
    <View>
      <Text>{userNdef?.userNdef}</Text>
    </View>
  );
}
