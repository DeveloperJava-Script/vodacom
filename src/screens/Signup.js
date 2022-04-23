import React, { useState } from "react"
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Text,
} from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import TextInputMask from "react-native-text-input-mask"
import BtnBack from "../components/BtnBack"
import { useAppContext } from "../navigation/AuthProvider"
import ProfileIcon from "../assets/icons/ProfileIcon"
import MailIcon from "../assets/icons/MailIcon"
import PassIcon from "../assets/icons/PassIcon"
import VisibleIcon from "../assets/icons/VisibleIcon"
import PhoneIcon from "../assets/icons/PhoneIcon"
import Indicator from "../components/Indicator"
export default function Signup({ navigation }) {
  const { register, loading } = useAppContext()
  const [hide, setHide] = useState(true)
  const [data, setData] = useState({
    name: "",
    login: "",
    phone: "",
    password: "",
  })
  return (
    <>
      <BtnBack navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageBlock}>
          <Image source={require("../assets/images/logotype.png")} />
        </View>
        <View>
          <View style={{ paddingBottom: "10%" }}>
            <View style={styles.input}>
              <View style={styles.row}>
                <View style={{ paddingRight: 5 }}>
                  <ProfileIcon color={"#56565F"} />
                </View>
                <TextInput
                  placeholder="Как Вас зовут?"
                  placeholderTextColor="#AAAAAE"
                  autoCorrect={false}
                  style={styles.inputText}
                  value={data.name}
                  onChangeText={txt => setData({ ...data, name: txt })}
                />
              </View>
              <FontAwesome5
                name="check"
                size={16}
                color={"#2AA6FF"}
                style={{ marginLeft: -10 }}
              />
            </View>

            <View style={styles.input}>
              <View style={styles.row}>
                <View style={{ paddingRight: 5 }}>
                  <PhoneIcon />
                </View>
                <TextInputMask
                  autoCorrect={false}
                  placeholder="Ваш телефон"
                  placeholderTextColor="#AAAAAE"
                  mask={"+7 ([000]) [000]-[00]-[00]"}
                  style={styles.inputText}
                  value={data.phone}
                  onChangeText={txt => setData({ ...data, phone: txt })}
                  keyboardType="number-pad"
                />
              </View>
              <FontAwesome5
                name="check"
                size={16}
                color={"#2AA6FF"}
                style={{ marginLeft: -10 }}
              />
            </View>

            <View style={styles.input}>
              <View style={styles.row}>
                <View style={{ paddingRight: 5 }}>
                  <MailIcon />
                </View>
                <TextInput
                  placeholder="Ваш email"
                  placeholderTextColor="#AAAAAE"
                  autoCorrect={false}
                  style={styles.inputText}
                  value={data.login}
                  onChangeText={txt => setData({ ...data, login: txt })}
                />
              </View>
              <FontAwesome5
                name="check"
                size={16}
                color={"#2AA6FF"}
                style={{ marginLeft: -10 }}
              />
            </View>

            <View style={styles.input}>
              <View style={styles.row}>
                <View style={{ paddingRight: 5 }}>
                  <PassIcon color={"#56565F"} />
                </View>
                <TextInput
                  placeholder="Введите Ваш пароль"
                  placeholderTextColor="#AAAAAE"
                  autoCorrect={false}
                  style={styles.inputText}
                  secureTextEntry={hide}
                  value={data.password}
                  onChangeText={txt => setData({ ...data, password: txt })}
                />
              </View>
              <TouchableOpacity
                onPress={() => setHide(hide => !hide)}
                style={{ marginLeft: -10 }}
              >
                <VisibleIcon color={"#56565F"} />
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 2 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={[
                  styles.btn,
                  { backgroundColor: "#2AA6FF", marginBottom: 10 },
                ]}
                onPress={() => {
                  register(
                    data.login,
                    data.phone,
                    data.password,
                    data.name,
                    () => {
                      navigation.navigate("Главный Каталог", {
                        screen: "Профиль",
                      })
                    }
                  )
                }}
              >
                <Text style={[styles.btnText, { color: "#fff" }]}>
                  Регистрация
                </Text>
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
                <Text style={[styles.btnText, { color: "#56565F" }]}>
                  Войти
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {loading && <Indicator />}
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
    fontFamily: "Montserrat-Medium",
    color: "#56565F",
    width: "90%",
    padding: 0,
  },
})
