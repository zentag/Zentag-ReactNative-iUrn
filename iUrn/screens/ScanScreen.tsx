import { Button, Image } from "react-native";

import { Text, View } from "../components/Themed";
import { Alert } from "react-native";
import { useTailwind } from "tailwind-rn";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";

export default function ScanScreen({
  navigation,
}: {
  navigation: StackNavigationHelpers;
}) {
  NfcManager.start();

  const tailwind = useTailwind();
  return (
    
    <View>
      <View>
        <Text>iUrn</Text>
      </View>
      <View>
        <Image
          style={tailwind("w-60 h-60")}
          source={require("../assets/images/placeholder.png")}
        />
        <Text>Please hold the iUrn NFC tag close to the phone.</Text>
        <Button
          onPress={() => {
            Alert.alert("Continue to page?", "View the memories of John Doe", [
              {
                text: "Stay here",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: async () => {
                  let userNdef;
                  try {
                    // register for the NFC tag with NDEF in it
                    await NfcManager.requestTechnology(NfcTech.Ndef);
                    // the resolved tag object will contain `ndefMessage` property
                    const tag = await NfcManager.getTag();
                    // TODO: check if payload exists
                    const payload = tag?.ndefMessage[0].payload!;
                    payload.shift();
                    payload.shift();
                    payload.shift();
                    userNdef = String.fromCharCode(...payload);
                    console.warn(userNdef);
                  } catch (ex) {
                    console.warn("Oops!", ex);
                  } finally {
                    // stop the nfc scanning
                    NfcManager.cancelTechnologyRequest();
                    console.warn("works at scanscreen", userNdef)
                    // TODO: pass userNdef prop to HomeScreen. It currently is passed to TabNavigator.
                    navigation.navigate("Lorem Ipsum");
                  }
                },
              },
            ]);
          }}
          title="Scan an iUrn Tag"
        />
      </View>
    </View>
  );
}
