import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"

const BtnBack = ({ navigation, backToCatalog }) => {
  return (
    <TouchableOpacity
      style={styles.btnBack}
      onPress={() => {
        if (backToCatalog) {
          navigation.navigate("Каталог")
        } else {
          navigation.goBack()
        }
      }}
    >
      <Ionicons name="chevron-back-outline" color={"#2AA6FF"} size={28} />
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
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
export default BtnBack
