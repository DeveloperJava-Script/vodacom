import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createStackNavigator } from "@react-navigation/stack"
import { useAppContext } from "./AuthProvider"
import { DrawerContent } from "./DrawerContent"
import AuthStack from "./AuthStack"
import CartCountIcon from "../components/CartCountIcon"
import HistoryIcon from "../assets/icons/HistoryIcon"
import MenuIcon from "../assets/icons/tabs/MenuIcon"
import ChatBigIcon from "../assets/icons/tabs/ChatBigIcon"
import ProfileIcon from "../assets/icons/ProfileIcon"

import Catalog from "../screens/Catalog"
import Actions from "../screens/Actions"
import ActionInfo from "../screens/ActionInfo"
import Basket from "../screens/Basket"
import History from "../screens/History"
import Chat from "../screens/Chat"
import Profile from "../screens/Profile"
import Conditions from "../screens/Conditions"
import ProductInfo from "../screens/ProductInfo"
import Notifications from "../screens/Notifications"
import Support from "../screens/Support"
import IssueInfo from "../screens/IssueInfo"
import CityChoose from "../screens/CityChoose"

const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()
export default function AppNavigation() {
  const { user } = useAppContext()
  const MenuDrawer = () => {
    return (
      <Drawer.Navigator
        drawerContent={props => <DrawerContent user={user} {...props} />}
      >
        <Drawer.Screen name="Главный Каталог" component={TabsNavigation} />
        <Drawer.Screen name="Акции" component={ActionStack} />
        <Drawer.Screen name="Уведомления" component={Notifications} />
        <Drawer.Screen name="Условия доставки" component={Conditions} />
      </Drawer.Navigator>
    )
  }
  const TabsNavigation = () => {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#2AA6FF",
          inactiveTintColor: "#56565F",
          style: {
            borderTopColor: "#A4D6FA",
            borderTopWidth: 1,
            height: 60,
          },
          labelStyle: {
            fontFamily: "Montserrat-Medium",
            marginBottom: 5,
          },
          adaptive: false,
        }}
        initialRouteName={"Каталог"}
      >
        <Tab.Screen
          name="Каталог"
          component={Catalog}
          options={() => ({
            tabBarIcon: ({ color }) => <MenuIcon color={color} />,
          })}
        />
        <Tab.Screen
          name="История"
          component={History}
          options={() => ({
            tabBarIcon: ({ color }) => <HistoryIcon color={color} />,
          })}
        />
        <Tab.Screen
          name="Корзина"
          component={Basket}
          options={() => ({
            tabBarIcon: ({ color }) => <CartCountIcon color={color} />,
            tabBarVisible: false,
            tabBarLabel: "",
          })}
        />
        <Tab.Screen
          name="Профиль"
          component={Profile}
          options={() => ({
            tabBarIcon: ({ color }) => <ProfileIcon color={color} big={true} />,
          })}
        />
        <Tab.Screen
          name="Поддержка"
          component={SupportStack}
          options={() => ({
            tabBarIcon: ({ color }) => <ChatBigIcon color={color} />,
          })}
        />
      </Tab.Navigator>
    )
  }
  const SupportStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Главная"
          component={Support}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Чат"
          component={Chat}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Вопрос"
          component={IssueInfo}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    )
  }
  const ActionStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Action"
          component={Actions}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ActionInfo"
          component={ActionInfo}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    )
  }

  return (
    <Stack.Navigator initialRouteName={"Меню"}>
      <Stack.Screen
        name="Меню"
        component={MenuDrawer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProductInfo"
        component={ProductInfo}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Город"
        component={CityChoose}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Авторизация"
        component={AuthStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
