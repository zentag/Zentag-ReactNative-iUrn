import { Text, View, Image } from "react-native";
import { useTailwind } from "tailwind-rn";

export default function HomeScreen() {
  const tailwind = useTailwind();
  return (
    <View>
      <View>
          <Image source={require('../assets/images/placeholder.png')}/>
      </View>
    </View>
  );
}
