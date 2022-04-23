import React, { useState } from "react"
import Ionicons from "react-native-vector-icons/Ionicons"

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native"

import {
  MiniItemBlock,
  ItemPrice,
  ItemBtnWrapperLeft,
  ItemBtnWrapperRight,
  ItemPlusMinus,
  ItemAmount,
  ItemPriceSmall,
} from "../styles/Catalog"
import { useGlobalContext } from "./context/DataContext"

export default function MiniProduct({ item, onPress, user, navigation }) {
  const { addToCart, increaseAmount, decreaseAmount, cart } = useGlobalContext()
  const foundItem = cart.find(i => i.id === item.id)
  const newItem = {
    ...item,
    amount: foundItem?.amount || 0,
    price_item: foundItem?.price_item || item.price_item,
  }
  const [width, setWidth] = useState(160)
  Image.getSize(item.image, width => {
    if (width < 160) {
      setWidth(width)
    }
  })
  return (
    <View style={styles.ItemWrapper}>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => onPress()}
      >
        <Image
          source={{ uri: item.image }}
          resizeMode={"stretch"}
          style={[
            { height: 120 },
            width < 160 ? { width: 60 } : { width: 100 },
          ]}
        />
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <Text style={styles.ItemName}>
            {item.name.length > 25
              ? `${item.name.substr(0, 25)}...`
              : item.name}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ItemPrice small={true}>{newItem.price_item}₽</ItemPrice>
            {item.price_old !== null && (
              <>
                {parseInt(item.price_old) > 0 && (
                  <Text style={styles.old}>{item.price_old}₽</Text>
                )}
              </>
            )}
          </View>
        </View>
        <View>
          {newItem.amount === 0 ? (
            <View style={styles.row}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (user?.token) {
                    addToCart(item)
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
                style={styles.addToCart}
                small={true}
              >
                <Ionicons
                  name="cart-outline"
                  size={16}
                  color={"#2AA6FF"}
                  style={{ paddingRight: 5 }}
                />
                <Text
                  style={{
                    color: "#2AA6FF",
                    fontSize: 16,
                    fontFamily: "Montserrat-SemiBold",
                  }}
                >
                  В корзину
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.row, { width: "100%" }]}>
              <ItemBtnWrapperLeft
                activeOpacity={0.6}
                onPress={() => {
                  decreaseAmount(item)
                }}
                small={true}
              >
                <ItemPlusMinus small={true}>-</ItemPlusMinus>
              </ItemBtnWrapperLeft>
              <MiniItemBlock>
                <ItemAmount small={true}>
                  {newItem.amount}
                  {" шт"}
                  {/* {item?.count_item?.toString() === "1" ? "шт" : "уп"} */}
                </ItemAmount>
                <ItemPriceSmall small={true}>
                  {parseFloat(newItem.price_item * newItem.amount).toFixed(2)}₽
                </ItemPriceSmall>
              </MiniItemBlock>
              <ItemBtnWrapperRight
                activeOpacity={0.6}
                onPress={() => {
                  increaseAmount(item)
                }}
                small={true}
              >
                <ItemPlusMinus small={true}>+</ItemPlusMinus>
              </ItemBtnWrapperRight>
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ItemWrapper: {
    width: 150,
    marginRight: 16,
    padding: 5,
    borderWidth: 2,
    borderColor: "#F6F6F6",
    borderRadius: 20,
  },
  ItemName: {
    fontSize: 12,
    color: "#56565F",
    paddingBottom: 5,
    width: 138,
    fontFamily: "Montserrat-SemiBold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  addToCart: {
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 7,
    paddingVertical: 5.5,
    borderColor: "#2AA6FF",
    borderWidth: 1,
    width: "100%",
  },
  old: {
    fontFamily: "Montserrat-SemiBold",
    color: "#AAAAAE",
    textDecorationLine: "line-through",
    fontSize: 12,
  },
})
