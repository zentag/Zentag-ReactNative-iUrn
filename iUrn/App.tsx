import 'react-native-gesture-handler';

import React from "react";

import useCachedResources from "./hooks/useCachedResources";

import { TailwindProvider } from "tailwind-rn/dist";
import utilities from "./tailwind.json";
import MainNavigator from "./navigation/MainNavigator";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      /*
      // @ts-ignore */
      <TailwindProvider utilities={utilities}>
        <PaperProvider>
          <MainNavigator />
        </PaperProvider>
      </TailwindProvider>
    );
  }
}
