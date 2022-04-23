import React, { useState } from "react"
import Ionicons from "react-native-vector-icons/Ionicons"
import { StyleSheet, View, TouchableOpacity, Text } from "react-native"
import { useGlobalContext } from "./context/DataContext"

export default function HistoryItem({ item, navigation }) {
  const { setOrders } = useGlobalContext()
  const [show, setShow] = useState(false)
  return (
    <View style={{ paddingHorizontal: 15 }} key={item.pay_id}>
      <View style={styles.row}>
        <TouchableOpacity
          style={{ padding: 10, flex: 1 }}
          activeOpacity={0.6}
          onPress={() => {
            if (item.items.length > 1) {
              setShow(prev => !prev)
            }
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="time-outline"
              color={"#AAAAAE"}
              size={14}
              style={{ paddingRight: 5 }}
            />
            <Text
              style={{
                color: "#AAAAAE",
                fontFamily: "Montserrat-Medium",
              }}
            >
              {item.addressDate}
            </Text>
          </View>
          <Text
            style={{
              color: "#AAAAAE",
              fontFamily: "Montserrat-Medium",
            }}
          >
            {item.addressName}
          </Text>
          {show ? (
            <>
              {item.items.map((itemInfo, i) => {
                return (
                  <Text
                    style={{
                      color: "#56565F",
                      fontFamily: "Montserrat-SemiBold",
                    }}
                    key={i}
                  >
                    {itemInfo.name}, {`${itemInfo.amount} шт`}
                  </Text>
                )
              })}
            </>
          ) : (
            <>
              <Text
                style={{
                  color: "#56565F",
                  fontFamily: "Montserrat-SemiBold",
                }}
                key={item.id}
              >
                {item.items[0].name}, {`${item.items[0].amount} шт`}
              </Text>
              {item.items.length > 1 && (
                <Text
                  style={{
                    color: "#AAAAAE",
                    fontFamily: "Montserrat-Medium",
                  }}
                >
                  Показать все...
                </Text>
              )}
            </>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnRepeat}
          activeOpacity={0.6}
          onPress={() => {
            setOrders(item.items)
            navigation.navigate("Корзина")
          }}
        >
          <Text style={styles.text}>Повторить</Text>
          <Text style={styles.text}>{item.price} ₽</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 14,
    elevation: 4,
  },
  btnRepeat: {
    backgroundColor: "#2AA6FF",
    alignSelf: "stretch",
    justifyContent: "center",
    elevation: 4,
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontFamily: "Montserrat-SemiBold",
    paddingHorizontal: 5,
  },
})
