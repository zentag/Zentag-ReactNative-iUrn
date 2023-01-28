import { useTailwind } from "tailwind-rn/dist";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Form from "../components/Form"
import FormElement from "../components/FormElement";
export default function LivingWill({
  navigation,
}: {
  navigation: StackNavigationHelpers;
}) {
  const tailwind = useTailwind();
  return (
    <View style={tailwind("bg-light-primary h-full")}>
      <Form style={tailwind("my-auto")}>
        <FormElement question="1Do you own or rent your home?" optionAnswerPairs={[{option: "Own", answer: "Congratulations on the wise investment. Home ownership can be the greatest asset to you and your family. Protecting it in the unfortunate event of a loss is an easy process, but if left unprotected, it can takes years for your family to resolve."}, {option: "Rent", answer: "If you have the funds, you may want to reconsider. Buying a hope is a wise investment and a great asset to you and your family."}]}/>
        <FormElement question="2Do you own or rent your home?" optionAnswerPairs={[{option: "Own", answer: "Congratulations on the wise investment. Home ownership can be the greatest asset to you and your family. Protecting it in the unfortunate event of a loss is an easy process, but if left unprotected, it can takes years for your family to resolve."}, {option: "Rent", answer: "If you have the funds, you may want to reconsider. Buying a hope is a wise investment and a great asset to you and your family."}]}/>
      </Form>
      <TouchableOpacity
        style={tailwind("border-2 border-black rounded-full absolute bottom-8 ml-[-12px] left-1/2")}
        onPress={() => navigation.navigate("Benefits")}
      >
        <Feather name="x" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
