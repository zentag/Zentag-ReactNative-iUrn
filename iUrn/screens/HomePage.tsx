import { Image, View, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { Feather } from "@expo/vector-icons";
export default function HomePage({
  navigation,
}: {
  navigation: StackNavigationHelpers;
}) {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("items-center bg-light-primary w-full h-full")}>
      {/*TODO: Fix positioning*/}
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile")}
        style={tailwind("relative top-8 left-1/3")}
        accessibilityLabel="Profile"
        accessibilityHint="Navigate to Profile Page"
      >
        <Image
          source={require("../assets/images/ProfileIcon.png")}
          style={tailwind("w-24 h-24")}
        />
      </TouchableOpacity>
      <Image
        style={{ ...tailwind("w-96 h-96 mt-4") }}
        source={require("../assets/images/I-urn-logo.png")}
      />
      {/* TODO: FIX STYLING SO ADDMEMORY DOESN'T COLIDE WITH BOTTOM ROW */}
      <TouchableOpacity
        onPress={() => navigation.navigate("RememberWhen")}
        activeOpacity={0.6}
        style={tailwind("m-auto")}
        accessibilityLabel="Add Memory"
        accessibilityHint="Navigates to the page where you can add a memory"
      >
        <Image
          source={require("../assets/images/AddButton.png")}
          style={tailwind("w-24 h-24")}
        />
      </TouchableOpacity>
      <View style={tailwind("flex flex-row absolute bottom-4")}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Benefits")}
          accessibilityLabel="Benefits"
          accessibilityHint="Navigate to 'Benefits' page"
        >
          <Image
            source={require("../assets/images/BenefitsIcon.png")}
            style={tailwind("w-24 h-24")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ComingSoon")}
          accessibilityLabel="Connent"
          accessibilityHint="Navigates to 'Connect' page"
        >
          <Image
            source={require("../assets/images/SupportIcon.png")}
            style={tailwind("w-24 h-24")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("ComingSoon")}
          accessibilityLabel="Legacy Protection"
          accessibilityHint="Navigates to 'Legacy Protection' page"
        >
          <Image
            source={require("../assets/images/SecurityIcon.png")}
            style={tailwind("w-24 h-24")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
