import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { Alert } from "react-native";
import NfcManager, { NfcTech, Ndef } from "react-native-nfc-manager";
import Database from "../database/Database"
export default async function scanNfc({
    navigation, setHasScannedNFCTag, userNdef
  }: {
    //TODO: fix typing and remove userNdef prop once development is done
    navigation: StackNavigationHelpers, setHasScannedNFCTag:Function, userNdef:any
  }){
    NfcManager.start();
        try {
          // register for the NFC tag with NDEF in it
          await NfcManager.requestTechnology(NfcTech.Ndef);
          // the resolved tag object will contain `ndefMessage` property
          const tag = await NfcManager.getTag();
          if (!tag?.ndefMessage[0].payload) return userNdef = "No NDEF Data"
          const payload = tag?.ndefMessage[0].payload;
          payload.shift();
          payload.shift();
          payload.shift();
          userNdef = String.fromCharCode(...payload);
        } catch (ex) {
          if(ex == "Error") return
          console.warn("Oops!", ex);
        } finally {
          // stop the nfc scanning
          NfcManager.cancelTechnologyRequest();
          Alert.alert("Continue to page?", `View the memories of ${await Database.getUserName(userNdef) || "john doe"}`, [
            {
              text: "Stay here",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                navigation.navigate("Lorem Ipsum", { userNdef });
                setHasScannedNFCTag(true);
              },
            },
          ]);
        }
  }