import React from "react"
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { WebView } from "react-native-webview"
const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height
export default function Paywindow({ url, closePay }) {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableOpacity style={styles.btnBack} onPress={() => closePay()}>
          <Ionicons name="chevron-back-outline" color={"#2AA6FF"} size={28} />
        </TouchableOpacity>
        <WebView
          source={{
            uri: url,
          }}
          cacheEnabled={false}
        />
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
    width: windowWidth,
    height: windowHeight,
  },
  btnBack: {
    position: "absolute",
    top: 20,
    zIndex: 100,
    left: "3%",
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 1,
    paddingHorizontal: 2,
  },
})
