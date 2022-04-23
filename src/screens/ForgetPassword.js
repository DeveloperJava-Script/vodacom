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
import { useAppContext } from "../navigation/AuthProvider"
import Indicator from "../components/Indicator"
import MailIcon from "../assets/icons/MailIcon"

export default function ForgetPassword({ navigation }) {
  const { loading, restorePassword } = useAppContext()
  const [email, setEmail] = useState("")
  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageBlock}>
          <Image source={require("../assets/images/logotype.png")} />
        </View>
        <View>
          <View style={{ paddingBottom: "10%" }}>
            <View style={styles.input}>
              <View style={styles.row}>
                <View style={{ paddingRight: 5 }}>
                  <MailIcon />
                </View>
                <TextInput
                  placeholder="Ваш логин"
                  placeholderTextColor="#AAAAAE"
                  autoCorrect={false}
                  value={email}
                  onChangeText={txt => setEmail(txt)}
                  style={styles.inputText}
                />
              </View>
              <FontAwesome5
                name="check"
                size={16}
                color={"#AAAAAE"}
                style={{ marginLeft: -10 }}
              />
            </View>

            <View style={{ paddingHorizontal: 2 }}>
              <TouchableOpacity
                activeOpacity={0.6}
                style={[
                  styles.btn,
                  { backgroundColor: "#2AA6FF", marginBottom: 10 },
                ]}
                onPress={() => {
                  restorePassword(email)
                }}
              >
                <Text style={[styles.btnText, { color: "#fff" }]}>
                  Восстановить
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
                  navigation.goBack()
                }}
              >
                <Text style={[styles.btnText, { color: "#56565F" }]}>
                  Вернуться назад
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
