import React from "react"
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native"
import BtnBack from "../components/BtnBack"
export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <BtnBack navigation={navigation} />
      <View style={styles.imageBlock}>
        <Image source={require("../assets/images/logotype.png")} />
        <Text style={styles.title}>Водаком</Text>
        <Text style={styles.subtitle}>Доставка воды</Text>
      </View>
      <View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.btn, { backgroundColor: "#2AA6FF", marginBottom: 10 }]}
          onPress={() => {
            navigation.navigate("Signup")
          }}
        >
          <Text style={[styles.btnText, { color: "#fff" }]}>Регистрация</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.btn,
            {
              backgroundColor: "#fff",
              elevation: 2,
              borderColor: "#E5E5E5",
              borderTopWidth: 1,
            },
          ]}
          onPress={() => {
            navigation.navigate("Login")
          }}
        >
          <Text style={[styles.btnText, { color: "#56565F" }]}>Войти</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    paddingHorizontal: 15,
  },
  imageBlock: {
    paddingTop: "20%",
    alignItems: "center",
    paddingBottom: "30%",
  },
  title: {
    color: "#2AA6FF",
    fontSize: 24,
    textTransform: "uppercase",
    fontFamily: "Montserrat-Black",
    letterSpacing: 1.6,
  },
  subtitle: {
    color: "#2AA6FF",
    fontSize: 15,
    textTransform: "uppercase",
    fontFamily: "Montserrat-Medium",
    marginTop: -4,
  },
  btn: {
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
  },
  btnText: {
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
  },
})
