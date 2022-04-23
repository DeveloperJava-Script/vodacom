import React from "react"
import { View, ActivityIndicator, StyleSheet } from "react-native"

const Indicator = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator color={"#2AA6FF"} size={40} />
    </View>
  )
}

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
})

export default Indicator
