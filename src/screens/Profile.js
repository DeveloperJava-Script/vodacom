import React, { useState, useEffect, useRef } from "react"
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  RefreshControl,
} from "react-native"
import { showMessage } from "react-native-flash-message"
import TextInputMask from "react-native-text-input-mask"
import FontAwesome from "react-native-vector-icons/FontAwesome5"
import axios from "axios"

import { useAppContext } from "../navigation/AuthProvider"
import { NoUserInfo } from "../components/NoUserInfo"
import { useProductContext } from "../components/context/ProductsContext"
import {
  ModalClose,
  InputTitle,
  BottomBtn,
  BottomBtnText,
} from "../styles/Common"
import Header from "../components/Header"
import AdrItem from "../components/AdrItem"
import Indicator from "../components/Indicator"

import PhoneIcon from "../assets/icons/PhoneIcon"
import RubleIcon from "../assets/icons/RubleIcon"
import MarkerIcon from "../assets/icons/MarkerIcon"
import EditIcon from "../assets/icons/EditIcon"
import AlertIcon from "../assets/icons/AlertIcon"
import PassIcon from "../assets/icons/PassIcon"
import MailIcon from "../assets/icons/MailIcon"
import ProfileIcon from "../assets/icons/ProfileIcon"
import VisibleIcon from "../assets/icons/VisibleIcon"

export default function Profile({ navigation }) {
  const scrollRef = useRef()
  const handleClick = number => {
    if (scrollRef !== null) {
      scrollRef.current.scrollTo({ x: 0, y: number, animated: true })
    }
  }
  const [autoFill, setautoFill] = useState(true)
  const [hide, setHide] = useState(true)
  const [Loading, setLoading] = useState(false)
  const { user, userData, setUserData } = useAppContext()
  const { deposit, getUserDeposit, loading } = useProductContext()
  const [depositModal, setDepositModal] = useState(false)
  const [depositScores, setDepositScores] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [shownMessage, setShownMessage] = useState(false)
  const [adrOptions, setAdrOptions] = useState([])
  const [showAdrOptions, setShowAdrOptions] = useState(false)
  const [profileData, setProfileData] = useState({
    fio: "",
    mail: "",
    phone: "",
    address: [],
    scores: "",
    password: "",
    confirmPas: "",
  })
  const editProfile = async () => {}
  const setAdr = async () => {}
  function addAdress() {
    if (profileData.address.length < 5) {
      setProfileData({
        ...profileData,
        address: [...profileData.address, { name: "", post: "" }],
      })
    }
  }
  function deleteAddress(ind) {
    setProfileData({
      ...profileData,
      address: profileData.address.filter((adr, i) => i !== ind),
    })
  }
  const getPossibleAddress = async txt => {}
  const createDeposit = async () => {}

  useEffect(() => {
    if (userData) {
      setProfileData({
        fio: userData.fio,
        mail: userData.mail,
        phone: userData.phone.trim(),
        address: userData.address,
        scores: parseFloat(userData.scores).toFixed(),
        password: "",
        confirmPas: "",
      })
      getUserDeposit()
    }
  }, [])

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header navigation={navigation} marginRight={10} />
        {user?.token ? (
          <KeyboardAvoidingView
            keyboardVerticalOffset={-120}
            style={{ flex: 1 }}
            behavior={"padding"}
          >
            <ScrollView
              style={{ paddingHorizontal: 5, marginTop: 20 }}
              showsVerticalScrollIndicator={false}
              ref={scrollRef}
              keyboardShouldPersistTaps={"handled"}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={getUserDeposit}
                  colors={["#2AA6FF"]}
                />
              }
            >
              <Text style={styles.subtitle}>Основные</Text>
              <View style={{ flexDirection: "row", marginBottom: 15 }}>
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={() => setDepositModal(true)}
                >
                  <Text style={styles.btnText2}>
                    Пополнить депозит (на счёт)
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.input}>
                <View style={styles.row}>
                  <View style={{ paddingRight: 5 }}>
                    <ProfileIcon color={"#56565F"} />
                  </View>
                  <TextInput
                    autoCorrect={false}
                    placeholder="Как вас зовут?"
                    placeholderTextColor="#AAAAAE"
                    value={profileData ? profileData.fio : ""}
                    onChangeText={txt =>
                      setProfileData({ ...profileData, fio: txt })
                    }
                    style={styles.textInput}
                  />
                </View>
                <View style={{ marginLeft: -10 }}>
                  <EditIcon />
                </View>
              </View>
              <View style={styles.input}>
                <View style={styles.row}>
                  <View style={{ paddingRight: 5 }}>
                    <MailIcon />
                  </View>
                  <TextInput
                    autoCorrect={false}
                    placeholder="Ваша почта"
                    placeholderTextColor="#AAAAAE"
                    value={profileData ? profileData.mail : ""}
                    onChangeText={txt =>
                      setProfileData({ ...profileData, mail: txt })
                    }
                    style={styles.textInput}
                  />
                </View>
                <View style={{ marginLeft: -10 }}>
                  <EditIcon />
                </View>
              </View>
              <View style={styles.input}>
                <View style={styles.row}>
                  <View style={{ paddingRight: 5 }}>
                    <PhoneIcon />
                  </View>
                  <TextInputMask
                    autoCorrect={false}
                    placeholder="Телефон"
                    placeholderTextColor="#AAAAAE"
                    mask={"+7 ([000]) [000]-[00]-[00]"}
                    style={styles.textInput}
                    value={profileData ? profileData.phone : ""}
                    onChangeText={txt =>
                      setProfileData({ ...profileData, phone: txt })
                    }
                    keyboardType="number-pad"
                  />
                </View>
                <View style={{ marginLeft: -10 }}>
                  <EditIcon />
                </View>
              </View>
              <View style={[styles.input, { paddingBottom: 5 }]}>
                <View style={styles.row}>
                  <View style={{ paddingRight: 5 }}>
                    <RubleIcon color={"#56565F"} />
                  </View>
                  <Text style={styles.textInput}>
                    У вас {profileData?.scores || 0} бонусных рублей
                  </Text>
                </View>
                <TouchableOpacity
                  style={{ marginLeft: -10 }}
                  onPress={() => setShowModal(true)}
                >
                  <AlertIcon color={"#2AA6FF"} />
                </TouchableOpacity>
              </View>
              <View style={[styles.input, { paddingBottom: 5 }]}>
                <View style={styles.row}>
                  <View style={{ paddingRight: 5 }}>
                    <RubleIcon color={"#56565F"} />
                  </View>
                  <Text style={styles.textInput}>
                    Ваш депозит: {deposit || 0} руб.
                  </Text>
                </View>
                <TouchableOpacity style={{ marginLeft: -10 }}>
                  <FontAwesome size={16} name={"plus"} color={"#2AA6FF"} />
                </TouchableOpacity>
              </View>
              <View style={styles.input}>
                <View style={styles.row}>
                  <View style={{ paddingRight: 5 }}>
                    <PassIcon color={"#56565F"} />
                  </View>
                  <TextInput
                    autoCorrect={false}
                    placeholder="Новый пароль"
                    placeholderTextColor="#AAAAAE"
                    value={profileData.password}
                    onChangeText={txt =>
                      setProfileData({ ...profileData, password: txt })
                    }
                    style={styles.textInput}
                    secureTextEntry={hide}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setHide(hide => !hide)}
                  style={{ marginLeft: -10 }}
                >
                  <VisibleIcon color={"#56565F"} />
                </TouchableOpacity>
              </View>
              <View style={styles.input}>
                <View style={styles.row}>
                  <View style={{ paddingRight: 5 }}>
                    <PassIcon color={"#56565F"} />
                  </View>
                  <TextInput
                    autoCorrect={false}
                    value={profileData.confirmPas}
                    placeholder="Подтвердите пароль"
                    placeholderTextColor="#AAAAAE"
                    onChangeText={txt =>
                      setProfileData({ ...profileData, confirmPas: txt })
                    }
                    style={styles.textInput}
                    secureTextEntry={hide}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setHide(hide => !hide)}
                  style={{ marginLeft: -10 }}
                >
                  <VisibleIcon color={"#56565F"} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                style={styles.btn}
                onPress={editProfile}
              >
                <Text style={styles.btnText}>Сохранить</Text>
              </TouchableOpacity>
              <Text style={[styles.subtitle, { paddingTop: 25 }]}>
                Адреса доставки
              </Text>

              <View style={{ marginBottom: 20 }}>
                {showAdrOptions && profileData.address[0]?.name.length > 0 && (
                  <View style={styles.drop}>
                    {adrOptions.length === 0 ? (
                      <View
                        style={{ alignItems: "center", paddingVertical: 6 }}
                      >
                        <Text style={styles.dropText}>Введите адрес.</Text>
                      </View>
                    ) : (
                      <ScrollView
                        keyboardShouldPersistTaps={"handled"}
                        nestedScrollEnabled
                      >
                        {adrOptions.map((item, i) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                setautoFill(false)
                                setProfileData({
                                  ...profileData,
                                  address: profileData.address.map((adr, i) => {
                                    if (i === 0) {
                                      return {
                                        ...adr,
                                        name: item.value,
                                        post: item.post,
                                      }
                                    }
                                    return { ...adr }
                                  }),
                                })
                                setShowAdrOptions(false)
                              }}
                              style={[
                                styles.dropRow,
                                adrOptions.length - 1 === i && {
                                  borderBottomWidth: 0,
                                },
                              ]}
                              key={i}
                            >
                              <Text style={styles.dropText}>{item.value}</Text>
                            </TouchableOpacity>
                          )
                        })}
                      </ScrollView>
                    )}
                  </View>
                )}
                <View style={[styles.input, { marginBottom: 0 }]}>
                  <View style={styles.row}>
                    <View style={{ paddingRight: 5 }}>
                      <MarkerIcon />
                    </View>
                    <TextInput
                      autoCorrect={false}
                      placeholder="Ваш адрес"
                      placeholderTextColor="#AAAAAE"
                      value={profileData.address[0]?.name || ""}
                      onFocus={() => {
                        setTimeout(() => {
                          handleClick(500)
                        }, 100)
                        setShowAdrOptions(true)
                      }}
                      onChangeText={txt => {
                        getPossibleAddress(txt)
                        setProfileData({
                          ...profileData,
                          address: profileData.address.map((adr, i) => {
                            if (i === 0) {
                              return {
                                ...adr,
                                name: txt,
                                post: adrOptions[0]?.post || 180006,
                              }
                            }
                            return { ...adr }
                          }),
                        })
                        setShowAdrOptions(true)
                        setautoFill(true)
                      }}
                      onEndEditing={() => {
                        if (
                          autoFill &&
                          adrOptions.length > 0 &&
                          profileData.address[0]?.name.length > 0
                        ) {
                          setShowAdrOptions(false)
                          setProfileData({
                            ...profileData,
                            address: profileData.address.map((adr, i) => {
                              if (i === 0) {
                                return {
                                  ...adr,
                                  name: adrOptions[0]?.value,
                                  post: adrOptions[0]?.post,
                                }
                              }
                              return { ...adr }
                            }),
                          })
                        }
                      }}
                      style={styles.textInput}
                    />
                  </View>
                </View>
              </View>

              {profileData.address.slice(1).map((add, num) => {
                return (
                  <AdrItem
                    key={num}
                    add={add}
                    num={num}
                    user={user}
                    handleClick={handleClick}
                    deleteAddress={ind => deleteAddress(ind)}
                    changeText={item =>
                      setProfileData({
                        ...profileData,
                        address: profileData.address.map((adr, index) => {
                          if (index === num + 1) {
                            return {
                              ...adr,
                              name: item.value,
                              post: item.post,
                            }
                          }
                          return { ...adr }
                        }),
                      })
                    }
                  />
                )
              })}

              <View style={{ marginBottom: 15, flexDirection: "row" }}>
                <TouchableOpacity style={styles.addBtn} onPress={addAdress}>
                  <Text style={styles.btnText2}>Добавить адрес</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.btn, { marginBottom: 220 }]}
                onPress={() => {
                  Keyboard.dismiss()
                  setTimeout(() => {
                    setAdr()
                  }, 20)
                }}
              >
                <Text style={styles.btnText}>Сохранить</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        ) : (
          <NoUserInfo navigation={navigation} />
        )}
      </SafeAreaView>

      <Modal animationType={"fade"} transparent={true} visible={showModal}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: "#2AA6FF",
              flex: 1,
              opacity: 0.08,
            }}
            onPress={() => setShowModal(false)}
          ></TouchableOpacity>
          <View
            style={{ width: "100%", backgroundColor: "#fff", paddingTop: 10 }}
          >
            <Text style={styles.popupTitle}>Бонусный счет</Text>
            <Text style={styles.option}>
              1 бонусный рубль = 1 российскому рублю. В данном случае обычная
              скидка не действует. Ставка начисления бонусов - 10% от суммы
              покупок по всем товарам.
            </Text>
          </View>
        </View>
      </Modal>
      <Modal animationType={"fade"} transparent={true} visible={depositModal}>
        <View style={{ flex: 1 }}>
          <ModalClose onPress={() => setDepositModal(false)} />
          <View style={{ width: "100%", backgroundColor: "#fff", padding: 30 }}>
            <View style={styles.scoresInput}>
              <View style={{ width: "100%" }}>
                <InputTitle>Введите сумму пополнения</InputTitle>
                <TextInput
                  keyboardType="number-pad"
                  style={styles.modalText}
                  value={depositScores}
                  onChangeText={txt => {
                    setDepositScores(txt)
                  }}
                />
              </View>
            </View>
          </View>
          <BottomBtn activeOpacity={0.95} onPress={createDeposit}>
            <BottomBtnText>
              Перейти к оплате {depositScores || 0} ₽
            </BottomBtnText>
          </BottomBtn>
        </View>
      </Modal>

      {Loading && <Indicator />}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#2AA6FF",
    marginBottom: 20,
    paddingBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    color: "#56565F",
    width: "90%",
    fontFamily: "Montserrat-Medium",
    padding: 0,
  },
  addBtn: {
    borderRadius: 10,
    alignItems: "center",
    borderColor: "#2AA6FF",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  btn: {
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#2AA6FF",
    marginBottom: 15,
  },
  btnText: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Montserrat-SemiBold",
  },
  btnText2: {
    color: "#2AA6FF",
    fontSize: 14,
    fontFamily: "Montserrat-SemiBold",
  },
  option: {
    borderLeftWidth: 5,
    fontSize: 16,
    borderColor: "#2AA6FF",
    color: "#56565F",
    paddingLeft: 24,
    paddingVertical: 15,
    fontFamily: "Montserrat-Medium",
  },
  popupTitle: {
    color: "#56565F",
    fontSize: 16,
    paddingLeft: 16,
    paddingBottom: 10,
    fontFamily: "Montserrat-SemiBold",
  },
  subtitle: {
    fontFamily: "Montserrat-SemiBold",
    color: "#163D4A",
    fontSize: 20,
    paddingBottom: 15,
  },
  drop: {
    height: 140,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 8,
    overflow: "hidden",
  },
  dropRow: {
    paddingVertical: 10,
    paddingLeft: 15,
  },
  dropText: {
    fontFamily: "Montserrat-Regular",
    color: "#163D4A",
    fontSize: 14,
  },
  close: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  scoresInput: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#AAAAAE",
  },
  modalText: {
    fontSize: 16,
    color: "#56565F",
    fontFamily: "Montserrat-Medium",
    padding: 0,
  },
})
