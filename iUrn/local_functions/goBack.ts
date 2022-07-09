import { NavigationProp } from "@react-navigation/native";

export default function goBack(navigation: NavigationProp<ReactNavigation.RootParamList>) {
  return () => {
    navigation.goBack();
  };
}
