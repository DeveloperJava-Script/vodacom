import React, { useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import messaging from "@react-native-firebase/messaging"
import PushNotification from "react-native-push-notification"
import { Alert } from "react-native"
import axios from "axios"

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ uid: null, token: null, city: null })
  const [userData, setUserData] = useState({
    fio: "",
    mail: "",
    phone: "",
    address: [],
    scores: "",
  })
  const [loading, setLoading] = useState(false)
  const [discounts, setDiscounts] = useState([])
  const [notifications, setNotifications] = useState([])
  const setCity = city => {
    setUser({ ...user, city })
    AsyncStorage.setItem("city", city.toString())
  }
  const logout = async () => {
    try {
      await AsyncStorage.clear()
      setUser({ uid: null, token: null, city: null })
    } catch (e) {
      console.log(e)
    }
  }
  function login(email, password) {}
  const register = async () => {}
  const getUser = async (token, uid) => {}

  const restorePassword = async login => {}
  const getDiscounts = async () => {}
  const getNotification = async (token, uid) => {}
  const setData = async () => {}
  function validateEmail(email) {}
  useEffect(() => {
    setData()
  }, [])
  useEffect(() => {
    getDiscounts()
  }, [user])
  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        user,
        setUser,
        userData,
        setUserData,
        loading,
        restorePassword,
        setCity,
        discounts,
        notifications,
        getNotification,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAppContext = () => {
  return useContext(AuthContext)
}
