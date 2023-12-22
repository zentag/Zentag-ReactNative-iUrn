import { useState } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Chip } from "react-native-paper";
import { useTailwind } from "tailwind-rn/dist";

type OptionAnswerPair = {
  option: string;
  answer: string;
};

export default function FormElement({
  question,
  optionAnswerPairs,
}: {
  question: string;
  optionAnswerPairs: OptionAnswerPair[];
}) {
  const tailwind = useTailwind();
  const [questionAnswer, setQuestionAnswer] = useState<null | OptionAnswerPair>(null);
  return (
    <View style={tailwind("ml-4 mt-4")}>
      <Text style={tailwind("font-bold text-lg")}>{question}</Text>
      <View style={tailwind("flex flex-row")}>
        {questionAnswer ? (
          <View style={tailwind("flex flex-col")}>
            <Text>You answered: {questionAnswer.option}</Text>
            <TouchableOpacity
            onPress={() => setQuestionAnswer(null)}>
              <Text style={tailwind("text-blue-700 underline text-lg")}>Undo</Text>
              </TouchableOpacity>          
            <Text style={tailwind("font-bold text-2xl mt-4")}>{questionAnswer.answer}</Text>
          </View>
        ) : (
          optionAnswerPairs.map((OAP, index) => (
            <Chip
              mode="flat"
              onPress={() => setQuestionAnswer(OAP)}
              key={index}
            >
              {OAP.option}
            </Chip>
          ))
        )}
      </View>
    </View>
  );
}
