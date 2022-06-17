import {Alert} from "react-native"
export default function scanAsUser() {
    Alert.alert(
        "Continue to page?",
        "View the memories of John Doe",
        [
          {
            text: "Stay here",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Yes", onPress: () => console.log("OK Pressed") }
        ]
      );
}