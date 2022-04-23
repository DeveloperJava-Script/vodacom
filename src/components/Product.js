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
import { useGlobalContext } from "../components/context/DataContext"
import { useAppContext } from "../navigation/AuthProvider"
import {
  ItemPrice,
  ItemPriceOld,
  ItemBtnWrapperLeft,
  ItemBtnWrapperRight,
  ItemPlusMinus,
  ItemTitle,
  ItemAmount,
  ItemPriceSmall,
  ItemAddToCart,
} from "../styles/Catalog"
import { useNavigation } from "@react-navigation/core"

export default function Product({ item, onPress, onDelete }) {
  const navigation = useNavigation()
  const { user } = useAppContext()
  const { addToCart, increaseAmount, decreaseAmount, toZero, cart } =
    useGlobalContext()
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
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{
            uri: item.image,
          }}
          style={[
            { flex: 1 },
            width < 160
              ? { width: 80, height: 130, marginRight: 30 }
              : { width: 90, height: 125, marginRight: 10 },
          ]}
          resizeMode={"contain"}
        />
      </TouchableOpacity>

      <View style={width < 160 && { paddingLeft: 10 }}>
        <ItemTitle>{item.name}</ItemTitle>
        <View style={[styles.row, { paddingVertical: 10 }]}>
          <ItemPrice>{newItem.price_item}₽</ItemPrice>
          {item.price_old !== null && (
            <>
              {parseInt(item.price_old) > 0 && (
                <ItemPriceOld>{item.price_old}₽</ItemPriceOld>
              )}
            </>
          )}
        </View>
        {newItem.amount === 0 && !onDelete ? (
          <View style={styles.row}>
            <ItemAddToCart
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
            >
              <Ionicons
                name="cart-outline"
                size={16}
                color={"#fff"}
                style={{ paddingRight: 5 }}
              />
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontFamily: "Montserrat-SemiBold",
                }}
              >
                В корзину
              </Text>
            </ItemAddToCart>
          </View>
        ) : (
          <View style={styles.row}>
            <ItemBtnWrapperLeft
              activeOpacity={0.6}
              onPress={() => {
                decreaseAmount(newItem)
              }}
            >
              <ItemPlusMinus>-</ItemPlusMinus>
            </ItemBtnWrapperLeft>
            <View
              style={{
                backgroundColor: "#2AA6FF",
                borderWidth: 1,
                borderColor: "#2AA6FF",
                width: 86,
              }}
            >
              <ItemAmount>
                {newItem.amount}
                {" шт"}
              </ItemAmount>
              <ItemPriceSmall>
                {parseFloat(newItem.price_item * newItem.amount).toFixed(2)}₽
              </ItemPriceSmall>
            </View>
            <ItemBtnWrapperRight
              activeOpacity={0.6}
              onPress={() => {
                increaseAmount(newItem)
              }}
            >
              <ItemPlusMinus>+</ItemPlusMinus>
            </ItemBtnWrapperRight>
          </View>
        )}
      </View>
      {onDelete && (
        <TouchableOpacity
          style={{ position: "absolute", top: 5, right: 6 }}
          onPress={() => toZero(item.id)}
        >
          <Ionicons name={"close-outline"} color={"#AAAAAE"} size={30} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: 4,
    elevation: 4,
  },
})
