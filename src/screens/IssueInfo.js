import React from "react"
import { StyleSheet, ScrollView, Text } from "react-native"
import { Container, Title } from "../styles/Common"
import BtnBack from "../components/BtnBack"
export default function IssueInfo({ navigation, route }) {
  const item = route.params.item
  const regex = /(<([^>]+)>)/gi
  const text = item.text
    .replace(/&deg;/gi, "°")
    .replace(/&ndash;/gi, "–")
    .replace(/&quot;/gi, "")
    .replace(/&ge;/gi, "")
    .replace(/&le;/gi, "≤")
    .replace(/&nbsp;/gi, " ")
    .replace(regex, "")

  return (
    <>
      <Container>
        <BtnBack navigation={navigation} />
        <Title style={{ paddingHorizontal: 15 }}>{item.title}</Title>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 14, margin: 0 }}
        >
          <Text style={styles.text}>{text}</Text>
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
