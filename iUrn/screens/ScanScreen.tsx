import { Button, Image } from "react-native";

import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useEffect } from "react";
import { useState } from "react";
import NfcManager from "react-native-nfc-manager";
import scanNfc from "../local_functions/scanNfc";
import { useIsFocused } from "@react-navigation/native";

// TODO: fix typing
export default function ScanScreen({
  navigation,
}: {
  navigation: StackNavigationHelpers;
}) {
  const tailwind = useTailwind();
  let userNdef: string = "ivd8WJDQtrf4sebLCa1BQeH4pkG3";
  // TODO: set hasScannedNFCTag to false on back button press and when a user clicks the X
  const [showReading, setShowReading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused || isScanning) return;
    scanNfc({ navigation, userNdef, setShowReading, setIsScanning });
  }, [isFocused]);
  tailwind("bg-light-secondary");
  tailwind("text-light-text");
  return (
    <View
      style={tailwind(
        "items-center bg-light-primary w-full h-full justify-center"
      )}
    >
      <Image
        style={{ ...tailwind("w-96 h-96 ") }}
        source={require("../assets/images/I-urn-logo.png")}
      />
      <Text style={tailwind("mt-80 bottom-16 text-lg text-center")}>
        Please hold the iUrn NFC tag{"\n"}close to the phone
      </Text>

      {/*TODO: REMOVE THIS AFTER DEVELOPMENT. DO NOT STYLE.*/}
      {/* <Button
          onPress={() => {
            navigation.navigate("Lorem Ipsum", { userNdef });
            setShowReading(true);
            NfcManager.cancelTechnologyRequest();
          }}
          title="FOR DEVELOPMENT MODE ONLY: press this if you do not have an NFC tag"
        /> */}
      {showReading && (
        // DESIGN: style this grey maybe?
        // To see this, press the development button and hit the back button on your phone
        <Text style={tailwind("")}>Reading Tag...</Text>
      )}
    </View>
  );
}
