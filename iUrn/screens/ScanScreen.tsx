import { Image } from "react-native";
import { Button } from "react-native-paper";
import { Text, View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { useEffect } from "react";
import { useState } from "react";
import scanNfc from "../local_functions/scanNfc";
import { useIsFocused } from "@react-navigation/native";
import IFirebase from "../firebase/IFirebase";
import NfcManager from "react-native-nfc-manager";

// TODO: fix typing
export default function ScanScreen({
  navigation,
}: {
  navigation: StackNavigationHelpers;
}) {
  const tailwind = useTailwind();
  let userNdef: string = "q7lDmb4P33TPDqbJdyMKiqM4EJA2";
  // TODO: set hasScannedNFCTag to false on back button press and when a user clicks the X
  const [showReading, setShowReading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNfcInitialized, setIsNfcInitialized] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function setLogin(){
      setIsLoggedIn(Boolean(await IFirebase.getUser()));
    }
    setLogin()
    if (!isNfcInitialized) {
      NfcManager.start();
      setIsNfcInitialized(true);
    }
    if (!isFocused || isScanning) return;
    scanNfc({ navigation, userNdef, setShowReading, setIsScanning });
  }, [isFocused]);
  tailwind("bg-light-secondary");
  tailwind("text-light-text");
  return (
    <View style={tailwind("items-center bg-light-primary w-full h-full")}>
      <Image
        style={{ ...tailwind("w-96 h-96 mt-4") }}
        source={require("../assets/images/I-urn-logo.png")}
      />
      <View style={tailwind("absolute bottom-8")}>
        {isLoggedIn ? (
          <Button
            mode="contained"
            color="#0099ff"
            style={tailwind("mr-2 rounded-full")}
            onPress={() => navigation.navigate("AfterSignIn")}
          >
            Go to your page
          </Button>
        ) : (
          <View style={tailwind("flex flex-row mt-24")}>
            <Button
              mode="contained"
              color="#0099ff"
              style={tailwind("mr-2 rounded-full")}
              onPress={() => navigation.navigate("SignIn")}
            >
              Log in
            </Button>
            <Button
              mode="contained"
              color="#0099ff"
              style={tailwind("rounded-full")}
              onPress={() => navigation.navigate("SignUp")}
            >
              Sign up
            </Button>
          </View>
        )}
        <Text style={tailwind("text-lg text-center font-bold my-2")}>Or</Text>
        <Text style={tailwind("text-lg text-center")}>
          Hold the iUrn NFC tag{"\n"}close to the phone
        </Text>
      </View>
      {/*TODO: REMOVE THIS AFTER DEVELOPMENT. DO NOT STYLE.*/}
      {/* <Button
          onPress={() => {
            navigation.navigate("AfterScanning", { userNdef });
            setShowReading(true);
            NfcManager.cancelTechnologyRequest();
          }}
          title="FOR DEVELOPMENT MODE ONLY: press this if you do not have an NFC tag"
        /> */}
      {showReading && (
        // DESIGN: style this grey maybe?
        // To see this, press the development button and hit the back button on your phone
        <Text style={tailwind("mt-48 text-gray-700")}>Reading Tag...</Text>
      )}
    </View>
  );
}
