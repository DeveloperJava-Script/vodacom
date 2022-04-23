import React from "react"
import { View, Image, StyleSheet } from "react-native"

const Loading = () => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/logotype.png")} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default Loading
