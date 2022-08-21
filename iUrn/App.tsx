import 'react-native-gesture-handler';

import React from "react";

import useCachedResources from "./hooks/useCachedResources";

import { TailwindProvider } from "tailwind-rn/dist";
import utilities from "./tailwind.json";
import MainNavigator from "./navigation/MainNavigator";
import { Provider as PaperProvider } from "react-native-paper";
import base64 from "base-64"
global.atob = base64.decode
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
