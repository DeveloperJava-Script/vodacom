import React, { useEffect } from "react"
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
} from "react-native"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome from "react-native-vector-icons/FontAwesome5"
import TikTokIcon from "../assets/icons/TikTokIcon"
import { useProductContext } from "../components/context/ProductsContext"
import { useAppContext } from "../navigation/AuthProvider"
import { Container } from "../styles/Common"

export default function Support({ navigation }) {
  const { loading, issues, fetchIssues } = useProductContext()
  const { user } = useAppContext()
  const references =
    user.city === "0"
      ? [
          {
            id: 0,
            text: "Доставка",
            link: "https://vodavpskove.ru/uslovija-dostavki-vody.html",
          },
          { id: 1, text: "Бонусы", link: "https://vodavpskove.ru/stock/8" },
          { id: 2, text: "Депозит", link: "https://vodavpskove.ru/news/263" },
          { id: 3, text: "Акции", link: "https://vodavpskove.ru/news/263" },
        ]
      : [
          {
            id: 0,
            text: "Доставка",
            link: "https://voda-piter.ru/uslovija-dostavki-spb.html",
          },
          { id: 1, text: "Бонусы", link: "https://voda-piter.ru/stock/209" },
          { id: 2, text: "Депозит", link: "https://vodavpskove.ru/news/263" },
          { id: 3, text: "Акции", link: "https://voda-piter.ru/stock.html" },
        ]
  const phoneNumber = "+7 (8112) 444-888"
  const email = "voda_fin@mail.ru"
  const whatsapp = "whatsapp://send?phone=+79212141020"
  const telegram = "https://t.me/VodakomBot"
  useEffect(() => {
    fetchIssues()
  }, [user.city])
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Ionicons name="chevron-back-outline" color={"#2AA6FF"} size={28} />
          </TouchableOpacity>
          <Text style={styles.title}>Поддержка</Text>
        </View>
        <Text style={styles.subtitle}>Нам нравится общаться!</Text>
        <View style={styles.btnsRow}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate("Чат")
            }}
          >
            <FontAwesome name={"comment"} size={18} color={"#20C997"} />
            <Text style={styles.btnTitle}>Чат</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { marginHorizontal: 10 }]}
            activeOpacity={0.7}
            onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
          >
            <FontAwesome name={"phone"} size={15} color={"#20C997"} />
            <Text style={styles.btnTitle}>Звонок</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={() => Linking.openURL(`mailto:${email}`)}
          >
            <FontAwesome name={"envelope"} size={18} color={"#20C997"} />
            <Text style={styles.btnTitle}>Почта</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.btnsRow,
            { paddingHorizontal: 10, marginVertical: 10 },
          ]}
        >
          <TouchableOpacity
            style={styles.socialBtn}
            activeOpacity={0.7}
            onPress={() =>
              Linking.openURL("https://www.instagram.com/vodavpskove/")
            }
          >
            <FontAwesome name={"instagram"} size={18} color={"#20C997"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialBtn}
            activeOpacity={0.7}
            onPress={() => Linking.openURL("https://vk.com/vodakom")}
          >
            <FontAwesome name={"vk"} size={18} color={"#20C997"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialBtn}
            activeOpacity={0.7}
            onPress={() =>
              Linking.openURL("https://www.facebook.com/groups/404855849614585")
            }
          >
            <FontAwesome name={"facebook-f"} size={18} color={"#20C997"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialBtn}
            activeOpacity={0.7}
            onPress={() =>
              Linking.openURL("https://www.tiktok.com/@vodaizpskova")
            }
          >
            <TikTokIcon />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Заявка в чат-боте</Text>
        <View
          style={[
            styles.btnsRow,
            {
              paddingLeft: 15,
              width: "50%",
              paddingHorizontal: 0,
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.socialBtn, { marginHorizontal: 0, marginRight: 10 }]}
            activeOpacity={0.7}
            onPress={() => Linking.openURL(whatsapp)}
          >
            <FontAwesome name={"whatsapp"} size={18} color={"#20C997"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialBtn, { marginHorizontal: 0, marginRight: 5 }]}
            activeOpacity={0.7}
            onPress={() => Linking.openURL(telegram)}
          >
            <FontAwesome name={"telegram-plane"} size={18} color={"#20C997"} />
          </TouchableOpacity>
        </View>
        <View style={styles.questionsWrap}>
          <Text
            style={[
              styles.subtitle,
              { paddingHorizontal: 15, paddingVertical: 0, paddingBottom: 5 },
            ]}
          >
            Часто задаваемые вопросы
          </Text>
          <ScrollView
            style={{ paddingLeft: 10 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {loading
              ? [1, 2, 3, 4].map(i => (
                  <View key={i} style={{ marginRight: 7 }}>
                    <SkeletonPlaceholder>
                      <SkeletonPlaceholder.Item
                        borderWidth={3}
                        borderColor={"#E1E9EE"}
                        backgroundColor={"#fff"}
                        borderRadius={10}
                        width={120}
                        height={80}
                        alignItems={"center"}
                      >
                        <SkeletonPlaceholder.Item
                          width={100}
                          height={20}
                          borderRadius={4}
                          marginTop={10}
                        />
                      </SkeletonPlaceholder.Item>
                    </SkeletonPlaceholder>
                  </View>
                ))
              : issues.map((item, i) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.6}
                    style={[
                      styles.question,
                      i === issues.length - 1 && { marginRight: 20 },
                    ]}
                    onPress={() => navigation.navigate("Вопрос", { item })}
                  >
                    <Text style={styles.questionText}>{item.title}</Text>
                  </TouchableOpacity>
                ))}
          </ScrollView>

          <Text
            style={[
              styles.subtitle,
              { paddingHorizontal: 15, paddingVertical: 10 },
            ]}
          >
            Справка
          </Text>
          {references.map(item => (
            <TouchableOpacity
              style={styles.reference}
              activeOpacity={0.6}
              key={item.id}
              onPress={() => Linking.openURL(item.link)}
            >
              <Text style={styles.questionText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  title: {
    color: "#56565f",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 26,
    paddingLeft: 10,
  },
  btnBack: {
    zIndex: 100,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 1,
    paddingHorizontal: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 15,
  },
  subtitle: {
    color: "#56565f",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  btnsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  btnTitle: {
    color: "#56565f",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 12,
    paddingLeft: 6,
  },
  button: {
    borderRadius: 8,
    borderColor: "#2AA6FF",
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 40,
    elevation: 4,
    backgroundColor: "#fff",
  },
  socialBtn: {
    borderRadius: 8,
    borderColor: "#2AA6FF",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 40,
    marginHorizontal: 5,
    elevation: 4,
    backgroundColor: "#fff",
  },
  questionsWrap: {
    borderRadius: 15,
    backgroundColor: "rgba(42, 166, 255, .67)",
    paddingVertical: 20,
    marginTop: 15,
  },
  question: {
    borderRadius: 10,
    backgroundColor: "#fff",
    width: 120,
    height: 80,
    marginRight: 7,
    padding: 10,
    elevation: 3,
  },
  reference: {
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 15,
    elevation: 3,
  },
  questionText: {
    color: "#56565f",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 12,
  },
})
