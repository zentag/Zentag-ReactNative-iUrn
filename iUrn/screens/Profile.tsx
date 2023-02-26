import { Feather } from "@expo/vector-icons";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { User } from "firebase/auth";
import { DocumentSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useTailwind } from "tailwind-rn/dist";
import IFirebase from "../firebase/IFirebase";

type TuserDoc = {
  Nickname: string;
  Pages: Array<string>;
  userId: string;
};

export default function Profile({
  navigation,
}: {
  navigation: StackNavigationHelpers;
}) {
  const tailwind = useTailwind();
  const [nickname, setNickname] = useState<null | string>(null);
  const [pages, setPages] = useState<null | string[]>(null)
  useEffect(() => {
    IFirebase.getUser().then((data: User) => {
      IFirebase.getUserName(data.uid).then((name: string) => {
        setNickname(name);
      });
      IFirebase.getUserDoc(data.uid).then((doc: TuserDoc) => {
        doc.Pages.forEach((el) => {
          console.log(el)
            IFirebase.getPageName(el).then((pageName:string) => {
                console.log("made it")
                setPages(p => {
                    if(!p) return [pageName]
                    p.push(pageName)
                    return p
                })
            })
        })
      });
    });
  }, []);
  //TODO: Add options to edit name, memorial, etc.
  return (
    <View style={tailwind("bg-light-primary w-full h-full")}>
      <View style={tailwind("flex flex-row")}>
      <Text style={tailwind("text-2xl font-bold mt-4 ml-4 mr-2")}>
        Hey, {nickname ?? "User"}!
      </Text>
      <TouchableOpacity onPress={() => {
          
          IFirebase.signOut()
            navigation.navigate("ScanScreen")
        }
    } style={tailwind("self-end")}>
          <Text style={tailwind("text-red-800 underline")}>Sign out</Text>
      </TouchableOpacity>
      </View>
      <View style={tailwind("bg-gray-200 rounded-xl w-5/6 h-96 mx-auto mt-4")}>
        <Text style={tailwind("text-lg ml-2 mt-2 font-bold")}>Your pages:</Text>
        <Text>Coming Soon</Text>
        {/* TODO:
        <View>
          {pages?.map((name) => (<Text>{name}</Text>))}
        </View> */}
      </View>
      <TouchableOpacity
        style={tailwind(
          "border-2 border-black rounded-full absolute bottom-8 ml-[-12px] left-1/2"
        )}
        onPress={() => navigation.navigate("NewHome")}
        accessibilityLabel="Close page"
        accessibilityHint="Closes the current page"
      >
        <Feather name="x" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
