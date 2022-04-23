import React, { useState, useEffect } from "react"
import { StyleSheet, View, KeyboardAvoidingView } from "react-native"
import { WebView } from "react-native-webview"
import Indicator from "../components/Indicator"

export default function Chat() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1, paddingBottom: 50, backgroundColor: "#fff" }}
        behavior={"height"}
      >
        <WebView
          androidHardwareAccelerationDisabled
          source={{
            uri: "http://g904756a.beget.tech/",
          }}
          cacheEnabled={false}
        />
      </KeyboardAvoidingView>
      {loading && <Indicator />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // justifyContent: "center",
    // alignItems: "center",
  },
})
