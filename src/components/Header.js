import React from "react"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { useAppContext } from "../navigation/AuthProvider"
import { useProductContext } from "./context/ProductsContext"
import Burger from "../assets/icons/Burger"

export default function Header({ navigation, marginRight }) {
  const { notifications } = useAppContext()
  const { showNotifications, setShowNotifications } = useProductContext()
  return (
    <View style={styles.centered}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Burger />
        </TouchableOpacity>
        <Text style={styles.title}>Водаком</Text>
      </View>
      <TouchableOpacity
        style={{ marginRight: marginRight }}
        onPress={() => {
          navigation.navigate("Уведомления")
          setShowNotifications(false)
        }}
      >
        <FontAwesome5 name="bell" size={24} color="#56565F" />
        {notifications.length > 0 && showNotifications && (
          <View style={styles.wrap}>
            <Text style={styles.text}>{notifications.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  centered: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 7,
  },
  title: {
    color: "#2AA6FF",
    fontSize: 24,
    textTransform: "uppercase",
    fontFamily: "Montserrat-Black",
    letterSpacing: 1.6,
    marginLeft: 5,
  },
  wrap: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#20C997",
    width: 16,
    height: 16,
    borderRadius: 8,
    top: -3,
    right: -4,
  },
  text: {
    color: "#fff",
    fontFamily: "Montserrat-Bold",
    marginTop: -2,
    fontSize: 12,
  },
})
