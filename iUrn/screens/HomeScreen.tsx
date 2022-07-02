import { Text, View, Button } from "react-native";
import { useTailwind } from "tailwind-rn";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

type UserNdefParams = {
  userNdef?: string;
  setIsScanning?:Function;
}
//TODO: add typing to userNdef
export default function HomeScreen({
  params,
}: {
  params: UserNdefParams;
}) {
  const tailwind = useTailwind();
  const navigation = useNavigation();
  function handlePress() {
    navigation.goBack();
  }
  return (
    <View>
      {/*DESIGN: This should be in the upper right corner*/}
      <IconButton icon="close" onPress={handlePress} />
      <Text>{params.userNdef}</Text>
    </View>
  );
}
