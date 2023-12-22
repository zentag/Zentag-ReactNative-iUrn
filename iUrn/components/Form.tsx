import { useTailwind } from "tailwind-rn/dist";
import { StackNavigationHelpers } from "@react-navigation/stack/lib/typescript/src/types";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";

export default function LivingWill({
  style,
  children,
}: {
  style: object;
  children: JSX.Element[];
}) {
  const tailwind = useTailwind();
  const [hiddenArray, setHiddenArray] = useState<boolean[] | null>(null);
  const [arrayIndex, setArrayIndex] = useState<number>(0)
  const [isLast, setIsLast] = useState(false)

  useEffect(() => {
    setHiddenArray(null)
    setIsLast(false)
    setArrayIndex(0)
    children.forEach(() => {
      setHiddenArray((old) => {
        if (old) old.push(true);
        else return [false];
        return old;
      });
    });
  }, []);
  return (
    <View style={{ ...tailwind("bg-light-primary"), ...style }}>
      {children.map((child, index) => {
        return (
          <View
            key={index}
            //@ts-expect-error
            style={{ height: hiddenArray?.[index] ? 0 : null, marginLeft: "auto", marginRight: "auto" }}
          >
            {child}
          </View>
        );
      })}
      <View style={tailwind("flex flex-row justify-center mt-4")}>
        <TouchableOpacity
          style={tailwind("m-2")}
          activeOpacity={arrayIndex === 0 ? 1 : 0.2}
          onPress={() => {
            if(arrayIndex === 0) return
            setIsLast(false)
            let finished = false
            hiddenArray?.forEach((element, index, array) => {
              const arrayNew = array.slice()
              if(finished) return
              if(element === false){
                finished = true
                arrayNew[index] = true
                arrayNew[index-1] = false
                setHiddenArray(arrayNew)
                setArrayIndex(index - 1)
              }
            })
          }}
        >
          <Feather name="arrow-left-circle" size={36} color={arrayIndex === 0 ? "gray" : "black"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind("m-2")}
          activeOpacity={isLast ? 1 : 0.2}
          onPress={() => {
            let finished = false
            if(isLast) return
            hiddenArray?.forEach((element, index, array) => {
              const arrayNew = array.slice()
              if(finished) return
              if(element === false){
                finished = true
                arrayNew[index] = true
                if(arrayNew[index+1]) {arrayNew[index+1] = false}
                if(!arrayNew[index+2]) setIsLast(true)
                setArrayIndex(index + 1)
                setHiddenArray(arrayNew)
              }
            })
          }}
        >
          <Feather name="arrow-right-circle" size={36} color={isLast ? "gray" : "black"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
