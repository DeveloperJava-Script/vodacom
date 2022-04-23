import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Dimensions,
} from "react-native"
import axios from "axios"
import { useAppContext } from "../navigation/AuthProvider"
import { Container, Title } from "../styles/Common"
import BtnBack from "../components/BtnBack"
export default function ActionInfo({ navigation, route }) {
  const { user } = useAppContext()
  const item = route.params.action
  const valid = route.params.valid
  const windowHeight = Dimensions.get("window").height
  const [actionText, setActionText] = useState("")
  const regex = /(<([^>]+)>)/gi
  const getAction = async () => {}
  useEffect(() => {
    getAction()
  }, [])
  return (
    <>
      <Container>
        <BtnBack navigation={navigation} />
        <Title style={{ paddingHorizontal: 15 }}>{item.title}</Title>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 14, margin: 0 }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={
                valid
                  ? { uri: item.image }
                  : require("../assets/images/action_temp.png")
              }
              resizeMode={"stretch"}
              style={{
                width: "100%",
                height: windowHeight * 0.285,
                borderRadius: 10,
              }}
            />
            <Text style={styles.text}>{actionText}</Text>
          </View>
        </ScrollView>
      </Container>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    color: "#56565f",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 32,
    paddingBottom: 10,
    marginTop: 50,
  },
  text: {
    fontSize: 16,
    color: "#56565F",
    paddingBottom: 3,
    fontFamily: "Montserrat-Medium",
    textAlign: "center",
  },
})
