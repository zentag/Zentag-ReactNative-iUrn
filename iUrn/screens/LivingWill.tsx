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
      <Text style={tailwind("font-bold text-2xl mt-2 mx-auto")}>Living Wills</Text>
      <Form style={tailwind("my-auto")}>
        <FormElement question="This is an example of a question about living wills" optionAnswerPairs={[{option:"Answer 1", answer:"You chose answer 1"}, {option:"Answer 2", answer:"You chose answer 2"}]}/>
        <FormElement question="This is an another example of a question about living wills" optionAnswerPairs={[{option:"Answer 1", answer:"You chose answer 1"}, {option:"Answer 2", answer:"You chose answer 2"}]}/>
      </Form>
      <TouchableOpacity
        style={tailwind("border-2 border-black rounded-full absolute bottom-8 ml-[-12px] left-1/2")}
        onPress={() => navigation.navigate("Benefits")}
        accessibilityLabel="Close page"
        accessibilityHint="Closes the current page"
      >
        <Feather name="x" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
