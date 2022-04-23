import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useGlobalContext } from "../components/context/DataContext"
import { useNavigation } from "@react-navigation/native"

const CartCountIcon = ({ color }) => {
  const navigation = useNavigation().dangerouslyGetState().index
  const { cart } = useGlobalContext()
  return (
    <View style={{ alignItems: "center" }}>
      <View style={[styles.circle, navigation === 2 && { marginTop: 35 }]}>
        <View style={{ marginTop: 4 }}>
          <Ionicons name="cart-outline" size={30} color={"#fff"} />
        </View>
      </View>
      {cart.length > 0 && navigation !== 2 && (
        <View
          style={[
            styles.wrap,
            cart.length < 10
              ? { width: 16, right: 9 }
              : { width: 20, right: 6 },
          ]}
        >
          <Text style={styles.text}>{cart.length}</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  circle: {
    marginTop: 6,
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2AA6FF",
    borderRadius: 32,
    borderColor: "#fff",
    borderWidth: 2,
  },
  wrap: {
    position: "absolute",
    top: 18,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#20C997",
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    fontFamily: "Montserrat-Bold",
    marginTop: -2,
    fontSize: 12,
  },
})

export default CartCountIcon
