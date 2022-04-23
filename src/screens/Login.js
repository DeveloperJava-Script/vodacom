import React, { useState } from "react"
import {
  Alert,
  ActivityIndicator,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
} from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MailIcon from "../assets/icons/MailIcon"
import PassIcon from "../assets/icons/PassIcon"
import VisibleIcon from "../assets/icons/VisibleIcon"
import BtnBack from "../components/BtnBack"
import { useAppContext } from "../navigation/AuthProvider"

export default function Login({ navigation }) {
  const { login, loading } = useAppContext()
  const [hide, setHide] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function loginHandler(log, pas) {
    if (!log.trim() || !pas.trim()) {
      Alert.alert("Ошибка", "Заполните все поля!")
    } else {
      login(log, pas, () => {
        navigation.navigate("Меню", { screen: "Главный Каталог" })
        setTimeout(() => {
          navigation.navigate("Каталог")
        }, 100)
      })
    }
  }

  return (
    <>
      <BtnBack navigation={navigation} />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={"handled"}
      >
        <View style={styles.imageBlock}>
          <Image source={require("../assets/images/logotype.png")} />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <View style={{ paddingBottom: 70 }}>
            <View style={styles.input}>
              <View style={styles.row}>
                <View style={{ paddingRight: 5 }}>
                  <MailIcon />
                </View>
                <TextInput
                  autoCorrect={false}
                  value={email}
                  placeholder="Введите Ваш логин"
                  placeholderTextColor="#AAAAAE"
                  onChangeText={userEmail => {
                    setEmail(userEmail)
                  }}
                  style={styles.inputText}
                />
              </View>
              <FontAwesome5
                name="check"
                size={16}
                color={"#2AA6FF"}
                style={{ marginLeft: -10 }}
              />
            </View>
            <View style={[styles.input, { marginBottom: 5 }]}>
              <View style={styles.row}>
                <View style={{ paddingRight: 5 }}>
                  <PassIcon color={"#56565F"} />
                </View>
                <TextInput
                  secureTextEntry={hide}
                  value={password}
                  placeholder="Введите Ваш пароль"
                  placeholderTextColor="#AAAAAE"
                  onChangeText={userPassword => {
                    setPassword(userPassword)
                  }}
                  style={styles.inputText}
                />
              </View>
              <TouchableOpacity
                onPress={() => setHide(hide => !hide)}
                style={{ marginLeft: -10 }}
              >
                <VisibleIcon color={"#56565F"} />
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 15, alignItems: "flex-end" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ForgetPassword")}
              >
                <Text
                  style={{
                    color: "#56565F",
                    fontSize: 12,
                    fontFamily: "Montserrat-SemiBold",
                  }}
                >
                  Забыли пароль?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 2 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={[
                  styles.btn,
                  { backgroundColor: "#2AA6FF", marginBottom: 10 },
                ]}
                onPress={() => loginHandler(email, password)}
              >
                <Text style={[styles.btnText, { color: "#fff" }]}>Войти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator color={"#2AA6FF"} size={40} />
        </View>
      )}
    </>
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
    paddingBottom: "15%",
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
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#56565F",
    borderBottomWidth: 1,
    paddingBottom: 5,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputText: {
    color: "#56565F",
    width: "90%",
    fontFamily: "Montserrat-Medium",
    padding: 0,
  },
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
