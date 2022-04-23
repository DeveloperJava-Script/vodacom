import React from "react"

import { createStackNavigator } from "@react-navigation/stack"

import Login from "../screens/Login"
import Signup from "../screens/Signup"
import Welcome from "../screens/Welcome"
import ForgetPassword from "../screens/ForgetPassword"
const Stack = createStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  )
}

export default AuthStack
