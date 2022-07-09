import { NavigationProp } from "@react-navigation/native";

export default function goBack(navigation: NavigationProp<ReactNavigation.RootParamList>) {
  return () => {
    // TODO: this only goes back one, meaning if you press it on memorial wall it goes back to memory vault
    navigation.goBack();
  };
}
