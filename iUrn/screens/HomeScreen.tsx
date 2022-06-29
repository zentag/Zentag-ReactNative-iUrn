import { Text, View } from "../components/Themed";
import { useTailwind } from "tailwind-rn";

export default function HomeScreen({ route }: { route: string }) {
  const tailwind = useTailwind();
  console.log("works at homescreen, ", route)
  return (
    <View>
      <Text>{}</Text>
    </View>
  );
}
