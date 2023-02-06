import * as Linking from "expo-linking"
import { EventType } from "expo-linking"
import { SetStateAction, useState } from "react"

export default function addLInkingListeners (setData:React.Dispatch<SetStateAction<object>>) {
    function handleDeepLink (event:EventType) {
        setData(Linking.parse(event.url))
    }
    return Linking.addEventListener("url", handleDeepLink)
}