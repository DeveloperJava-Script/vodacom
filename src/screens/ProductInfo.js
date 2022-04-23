import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Text,
  Alert,
} from "react-native"
import axios from "axios"
import { ItemPriceOld } from "../styles/Catalog"
import Ionicons from "react-native-vector-icons/Ionicons"
import MiniProduct from "../components/MiniProduct"
import BtnBack from "../components/BtnBack"
import { useGlobalContext } from "../components/context/DataContext"
import { useAppContext } from "../navigation/AuthProvider"
import { useProductContext } from "../components/context/ProductsContext"
import AccordionListItem from "../components/AccordionListItem"

export default function ProductInfo({ navigation, route }) {
  const { user } = useAppContext()
  const { addToCart } = useGlobalContext()
  const { fetchRecomedations, recomendations } = useProductContext()
  const item = route.params.item
  const [added, setAdded] = useState(false)
  const [desc, setDesc] = useState([])
  const [width, setWidth] = useState(160)
  Image.getSize(item.image, width => {
    if (width < 160) {
      setWidth(width)
    }
  })

  const fetchDescription = async id => {
    if (user.city === null || user.city === "") {
      Alert.alert("Внимание!", "Не указан город.")
      return
    }
    try {
      const res = await axios.get(
        `https://vodavpskove.ru/api/v2/ware.get?token=${
          user ? user.token : 1
        }&id=${id}&town=${user?.city || 0}`
      )
      const description = res.data.description
      const description1 = description
        .replace(/&deg;/gi, "°")
        .replace(/&ndash;/gi, "–")
        .replace(/&quot;/gi, "")
        .replace(/&ge;/gi, "")
        .replace(/&le;/gi, "≤")
        .replace(/&nbsp;/gi, " ")
      let smth = []
      description1.split("|").map(i => {
        const ex = i.split(":")
        if (ex[0] && ex[1]) {
          smth.push({ key: ex[0].trim(), value: ex[1].trim() })
        }
      })
      setDesc(smth.length > 4 ? smth : description1)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchDescription(item.id)
    fetchRecomedations()
  }, [])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fefefe" }}>
      <BtnBack navigation={navigation} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: item.image }}
              style={[
                { flex: 1, height: 200 },
                width < 160 ? { width: 80 } : { width: 160 },
              ]}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>{item.name}</Text>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.price}>{item.price_item}₽</Text>
              {item.price_old !== null && (
                <>
                  {parseInt(item.price_old) > 0 && (
                    <ItemPriceOld>{item.price_old}₽</ItemPriceOld>
                  )}
                </>
              )}
            </View>
          </View>
          {item.title !== "" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Ionicons
                name="alert-circle-outline"
                color={"#2AA6FF"}
                size={22}
              />
              <View>
                <Text style={styles.text}>{item.title}</Text>
                {item?.price_hint?.length > 0 && (
                  <Text style={styles.text}>{item.price_hint}</Text>
                )}
                {item?.tooltip?.length > 0 && (
                  <Text style={styles.text}>{item.tooltip}</Text>
                )}
              </View>
            </View>
          )}
        </View>
        <View style={styles.descriptionWrapper}>
          <AccordionListItem title={"Описание товара"}>
            {Array.isArray(desc) ? (
              <View>
                {desc.map((item, i) => (
                  <Text style={{ paddingBottom: 5 }} key={i}>
                    <Text
                      style={{
                        color: "#AAAAAE",
                        fontFamily: "Montserrat-Medium",
                      }}
                    >
                      {item.key}
                      {": "}
                    </Text>
                    <Text
                      style={{
                        color: "#56565F",
                        fontFamily: "Montserrat-SemiBold",
                      }}
                    >
                      {item.value}
                    </Text>
                  </Text>
                ))}
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    color: "#56565F",
                    fontFamily: "Montserrat-SemiBold",
                  }}
                >
                  {desc}
                </Text>
              </View>
            )}
          </AccordionListItem>
        </View>
        <View
          style={{
            paddingHorizontal: 15,
            paddingBottom: 70,
            backgroundColor: "#fefefe",
          }}
        >
          <Text style={[styles.subtitlte, { paddingVertical: 10 }]}>
            С этим товаром также покупают
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {recomendations.map(item => (
              <MiniProduct
                item={item}
                key={item.id}
                onPress={() => {
                  navigation.goBack()
                  navigation.navigate("ProductInfo", { item })
                }}
                user={user}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.bottomBtn}
        activeOpacity={0.95}
        onPress={() => {
          if (user?.token) {
            if (!added) {
              addToCart(item)
              setAdded(true)
              return
            }
            navigation.navigate("Корзина")
          } else {
            Alert.alert(
              "Внимание!",
              "Чтобы добавить товары в корзину, войдите в аккаунт, либо пройдите регистрацию.",
              [
                {
                  text: "Отмена",
                  onPress: () => {},
                  style: "Cancel",
                },
                {
                  text: "Войти в аккаунт",
                  onPress: () => navigation.navigate("Авторизация"),
                },
              ]
            )
          }
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="cart-outline" size={16} color={"#fff"} />
          <Text style={styles.bottomBtnText}>
            {added ? "Перейти в корзину" : "В корзину"}
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fefefe",
    paddingTop: 15,
    flex: 1,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 22,
    width: "70%",
    marginBottom: 10,
    color: "#56565F",
    fontFamily: "Montserrat-SemiBold",
  },
  subtitlte: {
    fontSize: 16,
    color: "#56565F",
    fontFamily: "Montserrat-SemiBold",
  },
  text: {
    color: "#56565F",
    paddingHorizontal: 5,
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
  },
  descriptionWrapper: {
    backgroundColor: "#fefefe",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#aadbff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  description: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomBtn: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "#2AA6FF",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
  },
  bottomBtnText: {
    color: "#fff",
    fontSize: 16,
    paddingLeft: 5,
    fontFamily: "Montserrat-SemiBold",
  },
  price: {
    backgroundColor: "#20C997",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    fontFamily: "Montserrat-SemiBold",
    color: "#fff",
    fontSize: 14,
  },
})
