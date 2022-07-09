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
  const [isScanning, setIsScanning] = useState(false);
  const isFocused = useIsFocused()
  useEffect(() => {
    if(!isFocused) return
    scanNfc({ navigation, userNdef, setIsScanning });
  }, [isFocused]);
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

        {/*TODO: REMOVE THIS AFTER DEVELOPMENT. DO NOT STYLE.*/}
        <Button
          onPress={() => {
            navigation.navigate("Lorem Ipsum", { userNdef });
            setIsScanning(true);
            NfcManager.cancelTechnologyRequest();
          }}
          title="FOR DEVELOPMENT MODE ONLY: press this if you do not have an NFC tag"
        />
        {isScanning && (
          // DESIGN: style this grey maybe?
          // To see this, press the development button and hit the back button on your phone
          <Text>Reading Tag...</Text>
        )}
      </View>
    </View>
  );
}
