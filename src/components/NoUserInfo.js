import React from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"

export const NoUserInfo = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 15 }}>
      <Text style={styles.text}>
        Для просмотра этой страницы необходимо войти в аккаунт
      </Text>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.btn}
        onPress={() => {
          navigation.navigate("Авторизация")
        }}
      >
        <Text style={styles.bottomBtnText}>Войти в аккаунт</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    textAlign: "center",
    color: "#56565F",
  },
  bottomBtnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold",
  },
  btn: {
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#2AA6FF",
    marginTop: 15,
    marginBottom: "20%",
  },
})
