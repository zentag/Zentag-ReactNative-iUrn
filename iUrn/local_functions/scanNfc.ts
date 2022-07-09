import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { Alert } from "react-native";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import Database from "../database/Database"
export default async function scanNfc({
    navigation, userNdef, setShowReading, setIsScanning
  }: {
    //TODO: fix typing and remove userNdef prop once development is done
    navigation: StackNavigationHelpers, userNdef:any, setShowReading:Function, setIsScanning:Function
  }){
    NfcManager.start();
    setIsScanning(true)
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
          setIsScanning(false)
        } finally {
          setShowReading(true)
          // stop the nfc scanning
          NfcManager.cancelTechnologyRequest();
          setIsScanning(false)
          Alert.alert("Continue to page?", `View the memories of ${await Database.getUserName(userNdef) || "john doe"}`, [
            {
              text: "Stay here",
              onPress: () => {setShowReading(false) 
              scanNfc({navigation, userNdef, setShowReading, setIsScanning})},
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => {
                navigation.navigate("Lorem Ipsum", { userNdef });
                setShowReading(false)
              },
            },
          ]);
        }
  }