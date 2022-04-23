import React, { useEffect } from "react"
import { StatusBar } from "react-native"
import Firebase from "@react-native-firebase/app"
import messaging from "@react-native-firebase/messaging"
import PushNotification from "react-native-push-notification"
import Providers from "./src/navigation"
import { AuthProvider } from "./src/navigation/AuthProvider"
import FlashMessage from "react-native-flash-message"

export default function App() {
  const credentials = {
    clientId: "*",
    apiKey: "*",
    appId: "*",
    projectId: "****",
  }
  useEffect(() => {
    if (!Firebase.apps.length) {
      Firebase.initializeApp(credentials)
    } else {
      Firebase.app()
    }
    PushNotification.createChannel({
      channelId: "*",
      channelName: "*",
    })
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      PushNotification.localNotification({
        channelId: "*",
        message: remoteMessage.notification.body,
        title: remoteMessage.notification.title,
        smallIcon: "notification_icon",
        color: "#2AA6FF",
        vibrate: true,
        vibration: 700,
      })
    })
    return unsubscribe
  }, [])

  return (
    <AuthProvider>
      <Providers />
      <StatusBar backgroundColor={"#2AA6FF"} />
      <FlashMessage position="top" duration={2500} />
    </AuthProvider>
  )
}
