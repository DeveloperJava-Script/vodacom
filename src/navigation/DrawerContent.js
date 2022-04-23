import React from "react"
import { DrawerItem } from "@react-navigation/drawer"
import { View, StyleSheet } from "react-native"
import { useAppContext } from "./AuthProvider"
import { useGlobalContext } from "../components/context/DataContext"
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import CatalogIcon from "../assets/icons/CatalogIcon"
//import ProfileIcon from "../assets/icons/ProfileIcon"
import ChatIcon from "../assets/icons/ChatIcon"
import DeliveryIcon from "../assets/icons/DeliveryIcon"
import ActionsDrawerIcon from "../assets/icons/ActionsDrawerIcon"

export const DrawerContent = props => {
  const { logout } = useAppContext()
  const { makeClearCart } = useGlobalContext()
  return (
    <View style={{ flex: 1 }}>
      <DrawerItem
        icon={() => (
          <View style={{ position: "absolute", left: 8, top: 16 }}>
            <CatalogIcon />
          </View>
        )}
        label="Каталог"
        onPress={() => {
          props.navigation.navigate("Главный Каталог")
        }}
        labelStyle={{ fontFamily: "Montserrat-Medium", fontSize: 16 }}
      />

      <DrawerItem
        icon={() => (
          <FontAwesome5
            name="clock"
            size={18}
            color={"#2AA6FF"}
            style={{ marginRight: -19 }}
          />
        )}
        label="История заказов"
        onPress={() => {
          props.navigation.navigate("Главный Каталог", { screen: "История" })
        }}
        labelStyle={{ fontFamily: "Montserrat-Medium", fontSize: 16 }}
        activeTintColor={"red"}
      />
      <DrawerItem
        icon={() => (
          <View style={{ position: "absolute", left: 9, top: 15 }}>
            <FontAwesome5 name="bell" size={18} color="#2AA6FF" />
          </View>
        )}
        label="Уведомления"
        onPress={() => {
          props.navigation.navigate("Уведомления")
        }}
        labelStyle={{ fontFamily: "Montserrat-Medium", fontSize: 16 }}
      />
      <DrawerItem
        icon={() => (
          <View style={{ position: "absolute", left: 8, top: 16 }}>
            <ActionsDrawerIcon />
          </View>
        )}
        label="Акции"
        onPress={() => {
          props.navigation.navigate("Акции")
        }}
        labelStyle={{ fontFamily: "Montserrat-Medium", fontSize: 16 }}
      />
      <DrawerItem
        icon={() => (
          <View style={{ position: "absolute", left: 8, top: 16 }}>
            <ChatIcon />
          </View>
        )}
        label="Чат-бот"
        onPress={() => {
          props.navigation.navigate("Поддержка", { screen: "Чат" })
        }}
        labelStyle={{ fontFamily: "Montserrat-Medium", fontSize: 16 }}
      />
      <DrawerItem
        icon={() => (
          <View style={{ position: "absolute", left: 8, top: 16 }}>
            <DeliveryIcon />
          </View>
        )}
        label="Условия доставки"
        onPress={() => {
          props.navigation.navigate("Условия доставки")
        }}
        labelStyle={{ fontFamily: "Montserrat-Medium", fontSize: 16 }}
      />
      <DrawerItem
        icon={() => (
          <Ionicons
            name={"arrow-back-outline"}
            size={18}
            color={"#2AA6FF"}
            style={{ marginRight: -19 }}
          />
        )}
        label={props?.user.token ? "Выйти" : "Войти"}
        onPress={() => {
          if (props?.user.token) {
            logout()
            makeClearCart()
            props.navigation.navigate("Город")
          } else {
            props.navigation.navigate("Авторизация")
          }
        }}
        labelStyle={{ fontFamily: "Montserrat-Medium", fontSize: 16 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
