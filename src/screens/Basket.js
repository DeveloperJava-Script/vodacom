import React, { useState, useEffect, useRef } from "react"
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Text,
  Keyboard,
  Dimensions,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native"
import axios from "axios"
import TextInputMask from "react-native-text-input-mask"
import { Calendar, LocaleConfig } from "react-native-calendars"
import Ionicons from "react-native-vector-icons/Ionicons"
import { showMessage } from "react-native-flash-message"
import { useAppContext } from "../navigation/AuthProvider"
import { useGlobalContext } from "../components/context/DataContext"
import { useProductContext } from "../components/context/ProductsContext"
import PopupModal from "../components/PopupModal"
import BtnBack from "../components/BtnBack"
import Product from "../components/Product"
import {
  ItemBtnWrapperLeft,
  ItemBtnWrapperRight,
  ItemPlusMinus,
  ItemAmount,
  ItemPriceSmall,
} from "../styles/Catalog"
import { Container, Title, BottomBtn, BottomBtnText } from "../styles/Common"
import Indicator from "../components/Indicator"

LocaleConfig.locales["ru"] = {
  monthNames: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  monthNamesShort: [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ],
  dayNames: [
    "воскресенье",
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
  ],
  dayNamesShort: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  today: "Сегодня",
}
LocaleConfig.defaultLocale = "ru"

const windowWidth = Dimensions.get("window").width
export default function Basket({ navigation }) {
  const adrRef = useRef(null)
  const scrollRef = useRef(null)

  const [cartLoading, setCartloading] = useState(false)
  const [orderLoading, setOrderLoading] = useState(false)
  const containerIds = [
    "1",
    "2",
    "3",
    "295",
    "232",
    "287",
    "318",
    "319",
    "334",
    "399",
  ]
  const [cartTotal, setCartTotal] = useState({
    pay: "",
    full: "",
    discount: "",
  })
  const { user, userData, setItems } = useAppContext()
  const { cart, clearCart, makeClearCart } = useGlobalContext()
  const { deposit, getUserDeposit, loading } = useProductContext()
  const [activeDate, setActiveDate] = useState()
  const [scores, setScores] = useState("")
  const [depositScores, setDepositScores] = useState("")
  const [data, setData] = useState({
    phone: userData.phone.trim(),
    email: userData.mail.trim(),
    comment: "",
  })
  const [container, setContainer] = useState({
    amount: 0,
    name: "Бутыль ПЭТ",
    price: 350,
    id: "118",
    maxAmount: 0,
  })
  const [showBtn, setShowBtn] = useState(true)
  const [error, setError] = useState(false)
  const [scoresModal, setScoresModal] = useState(false)
  const [depositModal, setDepositModal] = useState(false)
  const [openDiscountModal, setOpenDiscountModal] = useState(false)
  const [openPayModal, setOpenPayModal] = useState(false)
  const [addressModal, setAddressModal] = useState(false)
  const [dateModal, setDateModal] = useState(false)
  const [timeModal, setTimeModal] = useState(false)

  const [discountOptions, setDiscountOptions] = useState([])
  const [payOptions, setPayOptions] = useState([
    { id: 1, text: "Наличный расчет при получении", selected: false },
    { id: 2, text: "Оплатить бонусами", selected: false },
    { id: 3, text: "Онлайн", selected: false },
    { id: 4, text: "Безналичный (юр. лицам)", selected: false },
    { id: 7, text: "Депозит", selected: false },
  ])

  const [timeOptions, setTimeOptions] = useState([
    { id: 0, text: "нет", selected: false },
  ])
  const [addressOptions, setAddressOptions] = useState([])
  const [addressValue, setAddressValue] = useState({
    value: "Не выбрано",
    post: "",
  })
  const [allowEditAddress, setallowEditAddress] = useState(false)
  const [adrOptions, setAdrOptions] = useState([])
  const [showAdrOptions, setShowAdrOptions] = useState(false)

  function getTotal() {
    let total = cart.reduce((acc, item) => {
      if (item.name !== "Бутыль ПЭТ") {
        return acc + parseInt(item.truePrice) * parseInt(item.amount)
      } else {
        return acc + 0
      }
    }, 0)
    return total
  }
  function changeActiveOption(id, options, setOptions) {
    const newOptions = options.map(option => {
      if (option.id === id) {
        return { ...option, selected: true }
      }
      return { ...option, selected: false }
    })
    setOptions(newOptions)
  }
  function getActive(options) {
    const active = options.find(o => o.selected)
    if (active) {
      return active.text
    } else {
      return "Не выбрано"
    }
  }
  function checkScores(scores) {
    const reg = new RegExp("^[0-9]+$")
    if (
      !reg.test(scores) ||
      parseInt(scores) > parseInt(userData.scores) ||
      parseInt(scores) > cartTotal.full
    ) {
      setError(true)
    } else {
      setError(false)
    }
  }
  function checkDepositScores(scores) {
    const reg = new RegExp("^[0-9]+$")
    if (
      !reg.test(scores) ||
      parseInt(scores) > deposit ||
      parseInt(scores) > cartTotal.full
    ) {
      setError(true)
    } else {
      setError(false)
    }
  }
  const payOpt = payOptions.find(i => i.selected)
  const discountOpt = discountOptions.find(i => i.selected)
  const cartData = cart.map(item => {
    return { id: item.id, cnt: item.amount / parseInt(item.count_item) }
  })
  const updateTime = async () => {}
  const updateCart = async () => {}
  const sendCart = async () => {}
  const getPossibleAddress = async txt => {}
  const fetchContainerPrice = async () => {}
  const fetchDiscounts = async () => {}
  const fetchPayments = async () => {}
  function validateEmail(email) {}
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setShowBtn(false)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setShowBtn(true)
      }
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  //обновление цены
  useEffect(() => {
    if (user?.token) {
      updateCart()
    }
  }, [
    cart,
    discountOptions,
    payOptions,
    scores,
    container,
    timeOptions,
    activeDate,
  ])

  //обновление интервала
  useEffect(() => {
    if (user?.token) {
      updateTime()
    }
  }, [cart, activeDate, addressOptions, addressValue])

  useEffect(() => {
    if (timeOptions.length === 1 && cart.length > 0 && user.token) {
      showMessage({
        message:
          "Выберите другой адрес доставки или измените дату для обновления интервала.",
        type: "warning",
      })
    }
  }, [timeOptions])

  //обновление тары
  useEffect(() => {
    const contItem = cart.find(item => item.name === "Бутыль ПЭТ")
    if (contItem) {
      setContainer({
        ...container,
        amount: contItem.amount,
      })
    }
  }, [clearCart])

  //обновление адреса от профиля
  useEffect(() => {
    if (userData.address[0]?.name) {
      setAddressOptions(
        userData.address.map((address, i) => {
          return {
            id: i,
            text: address.name,
            selected: i === 0 ? true : false,
            post: address.post,
          }
        })
      )
    }
  }, [userData.address])

  //загружаю скидки, депозит, тару и способы оплаты
  useEffect(() => {
    const dates = new Date()
    let day = dates.getDate()
    if (day < 10) {
      day = "0" + day
    }
    const month =
      dates.getMonth() + 1 > 9
        ? dates.getMonth() + 1
        : 0 + (dates.getMonth() + 1).toString()
    const date = `${dates.getFullYear()}-${month}-${day}`
    setActiveDate(date)
    if (user?.token) {
      fetchDiscounts()
      fetchPayments()
      fetchContainerPrice()
      if (deposit === null) {
        getUserDeposit()
      }
    }
  }, [])

  //слежу за тарой
  useEffect(() => {
    let containers = 0
    cart.map(item => {
      if (containerIds.includes(item.id)) {
        containers += item.amount
      }
    })
    setContainer({ ...container, amount: containers, maxAmount: containers })
  }, [cart])

  //ставлю адрес
  useEffect(() => {
    const activePost = addressOptions.find(i => i.selected)?.post
    setAddressValue(
      activePost
        ? {
            value: getActive(addressOptions),
            post: activePost || "",
          }
        : { value: "", post: "" }
    )
  }, [addressOptions])

  return (
    <>
      <Container zIndex={0}>
        <BtnBack navigation={navigation} backToCatalog={true} />
        <View style={{ paddingHorizontal: 15 }}>
          <Title>Корзина</Title>
        </View>
        {cart.filter(itm => itm.name !== "Бутыль ПЭТ").length > 0 ? (
          <ScrollView
            keyboardShouldPersistTaps={"handled"}
            ref={scrollRef}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.descriptionWrapper}>
              <View style={styles.description}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons
                    name="alert-circle-outline"
                    color={"#2AA6FF"}
                    size={22}
                  />
                  <Text
                    style={[styles.subtitlte, { paddingLeft: 5, fontSize: 14 }]}
                  >
                    Всего бутылей{"\n"}на обмен
                  </Text>
                </View>
                <View style={{ paddingRight: 40 }}>
                  <View style={styles.row}>
                    <ItemBtnWrapperLeft
                      activeOpacity={0.6}
                      onPress={() => {
                        if (container.amount > 0) {
                          setContainer({
                            ...container,
                            amount: container.amount - 1,
                          })
                        }
                      }}
                    >
                      <ItemPlusMinus>-</ItemPlusMinus>
                    </ItemBtnWrapperLeft>
                    <View
                      style={{
                        backgroundColor: "#2AA6FF",
                        width: 68,
                        paddingVertical: 1,
                      }}
                    >
                      <ItemAmount>{container.amount} шт</ItemAmount>
                      <ItemPriceSmall>
                        {container.price *
                          (container.maxAmount - container.amount)}
                        ₽
                      </ItemPriceSmall>
                    </View>
                    <ItemBtnWrapperRight
                      activeOpacity={0.6}
                      onPress={() => {
                        if (container.amount < container.maxAmount) {
                          setContainer({
                            ...container,
                            amount: container.amount + 1,
                          })
                        }
                      }}
                    >
                      <ItemPlusMinus>+</ItemPlusMinus>
                    </ItemBtnWrapperRight>
                  </View>
                  <TouchableOpacity
                    style={{ position: "absolute", top: 0, right: 6 }}
                    onPress={() => {
                      setContainer({ ...container, amount: 0 })
                    }}
                  >
                    <Ionicons
                      name={"close-outline"}
                      color={"#2AA6FF"}
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={{ paddingHorizontal: 15 }}>
              {cart
                .filter(i => i.name !== "Бутыль ПЭТ")
                .map(cartItem => {
                  return (
                    <Product
                      item={cartItem}
                      onDelete={true}
                      key={cartItem.id}
                    />
                  )
                })}
            </View>

            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#AAAAAE",
                marginHorizontal: 15,
                marginVertical: 6,
                paddingVertical: 5,
                paddingHorizontal: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                activeOpacity={0.8}
                onPress={() => setAddressModal(true)}
              >
                <TouchableOpacity
                  onPress={() => setAddressModal(true)}
                  style={{ width: "90%" }}
                >
                  <Text style={styles.inputTitle}>Адрес доставки</Text>
                  <TextInput
                    style={styles.subtitlte}
                    value={addressValue.value}
                    onChangeText={value => {
                      getPossibleAddress(value)
                      setShowAdrOptions(true)
                      setAddressValue({ ...addressValue, value })
                    }}
                    autoCorrect={false}
                    editable={allowEditAddress}
                    ref={adrRef}
                  />
                </TouchableOpacity>
                <Ionicons
                  name="chevron-down-outline"
                  color={"#AAAAAE"}
                  size={18}
                />
              </TouchableOpacity>
              {allowEditAddress && showAdrOptions && (
                <View style={styles.drop}>
                  {adrOptions.length === 0 ? (
                    <View style={{ alignItems: "center", paddingVertical: 6 }}>
                      <Text style={styles.dropText}>Введите адрес.</Text>
                    </View>
                  ) : (
                    <ScrollView
                      keyboardShouldPersistTaps={"handled"}
                      nestedScrollEnabled
                    >
                      <View style={{ flex: 1, justifyContent: "flex-end" }}>
                        {adrOptions.map((item, i) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                setShowAdrOptions(false)
                                setAddressValue({
                                  value: item.value,
                                  post: item.post,
                                })
                                updateTime()
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
                      </View>
                    </ScrollView>
                  )}
                </View>
              )}
            </View>

            <View style={styles.description}>
              <TouchableOpacity
                style={[
                  styles.input,
                  { flex: 1, marginLeft: 15, marginHorizontal: 0 },
                ]}
                activeOpacity={0.8}
                onPress={() => setDateModal(true)}
              >
                <View style={{ width: "90%" }}>
                  <Text style={styles.inputTitle}>Дата доставки</Text>
                  <Text style={styles.subtitlte}>{activeDate}</Text>
                </View>
                <Ionicons
                  name="chevron-down-outline"
                  color={"#AAAAAE"}
                  size={18}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.input, { flex: 1 }]}
                activeOpacity={0.8}
                onPress={() => setTimeModal(true)}
              >
                <View>
                  <Text style={styles.inputTitle}>Интервал доставки</Text>
                  <Text style={styles.subtitlte}>{getActive(timeOptions)}</Text>
                </View>
                <View
                  style={{
                    position: "absolute",
                    right: 10,
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons
                    name="chevron-down-outline"
                    color={"#AAAAAE"}
                    size={18}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.input}
              activeOpacity={0.8}
              onPress={() => setOpenDiscountModal(true)}
            >
              <View>
                <Text style={styles.inputTitle}>Выберите скидку</Text>
                <Text style={styles.subtitlte}>
                  {getActive(discountOptions)}
                </Text>
              </View>
              <View
                style={{
                  position: "absolute",
                  right: 10,
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="chevron-down-outline"
                  color={"#AAAAAE"}
                  size={18}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.input}
              activeOpacity={0.8}
              onPress={() => setOpenPayModal(true)}
            >
              <View>
                <Text style={styles.inputTitle}>Способ оплаты</Text>
                <Text style={styles.subtitlte}>{getActive(payOptions)}</Text>
              </View>
              <Ionicons
                name="chevron-down-outline"
                color={"#AAAAAE"}
                size={18}
              />
            </TouchableOpacity>

            <View style={styles.input}>
              <View style={{ width: "100%" }}>
                <Text style={styles.inputTitle}>Телефон</Text>
                <TextInputMask
                  autoCorrect={false}
                  placeholder={"+7"}
                  placeholderTextColor={"#808080"}
                  mask={"+7 ([000]) [000]-[00]-[00]"}
                  style={styles.subtitlte}
                  value={data.phone}
                  onChangeText={txt => setData({ ...data, phone: txt })}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <View style={styles.input}>
              <View style={{ width: "100%" }}>
                <Text style={styles.inputTitle}>Эл. почта</Text>
                <TextInput
                  style={styles.subtitlte}
                  autoCorrect={false}
                  value={data.email}
                  onChangeText={txt => setData({ ...data, email: txt })}
                />
              </View>
            </View>

            <View style={styles.input}>
              <View style={{ width: "100%" }}>
                <Text style={styles.inputTitle}>Комментарий к заказу</Text>
                <TextInput
                  style={styles.subtitlte}
                  autoCorrect={false}
                  value={data.comment}
                  onChangeText={txt => setData({ ...data, comment: txt })}
                />
              </View>
            </View>
            {cartLoading ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 15,
                }}
              >
                <ActivityIndicator color={"#2AA6FF"} size={40} />
              </View>
            ) : (
              <View style={{ paddingHorizontal: 15, paddingBottom: 80 }}>
                <View style={styles.description}>
                  <Text style={styles.subtitlte}>Сумма заказа</Text>
                  <Text style={styles.subtitlte}>{getTotal()}₽</Text>
                </View>
                <View style={[styles.description, { paddingVertical: 5 }]}>
                  <Text style={styles.subtitlte}>Залог за тару</Text>
                  <Text style={styles.subtitlte}>
                    {container.price * (container.maxAmount - container.amount)}
                    ₽
                  </Text>
                </View>
                <View style={[styles.description, { paddingBottom: 5 }]}>
                  <Text style={styles.subtitlte}>Скидка</Text>
                  <Text style={styles.subtitlte}>
                    {cartTotal.discount || 0}₽
                  </Text>
                </View>
                {payOpt?.text === "Оплатить бонусами" && (
                  <View style={[styles.description, { paddingBottom: 5 }]}>
                    <Text style={styles.subtitlte}>Оплачено бонусами</Text>
                    <Text style={styles.subtitlte}>{scores || 0}₽</Text>
                  </View>
                )}
                {payOpt?.text === "Депозит" && (
                  <View style={[styles.description, { paddingBottom: 5 }]}>
                    <Text style={styles.subtitlte}>Оплачено депозитом</Text>
                    <Text style={styles.subtitlte}>{depositScores || 0}₽</Text>
                  </View>
                )}
                <View style={styles.description}>
                  <Text style={styles.sum}>Итог</Text>
                  <Text style={styles.sum}>{cartTotal.pay}₽</Text>
                </View>
              </View>
            )}
          </ScrollView>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", paddingHorizontal: 15 }}
          >
            <Text
              style={{
                fontFamily: "Montserrat-SemiBold",
                fontSize: 16,
                textAlign: "center",
                color: "#56565F",
              }}
            >
              Добавьте что-нибудь в корзину, чтобы продолжить
            </Text>

            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.btn}
              onPress={() => {
                navigation.navigate("Каталог")
              }}
            >
              <BottomBtnText>Вернуться в каталог</BottomBtnText>
            </TouchableOpacity>
          </View>
        )}
      </Container>
      {cart.filter(itm => itm.name !== "Бутыль ПЭТ").length > 0 && showBtn && (
        <TouchableOpacity
          style={[styles.bottomBtn, { position: "absolute", bottom: 0 }]}
          activeOpacity={0.95}
          onPress={() => sendCart()}
          disabled={orderLoading}
        >
          <BottomBtnText>Оформить заказ {cartTotal.pay}₽</BottomBtnText>
        </TouchableOpacity>
      )}

      <PopupModal
        openModal={openDiscountModal}
        options={discountOptions}
        closeModal={id => {
          setOpenDiscountModal(false)
          changeActiveOption(id, discountOptions, setDiscountOptions)
        }}
        title={"Выберите скидку"}
      />

      <PopupModal
        openModal={addressModal}
        options={addressOptions}
        closeModal={id => {
          setAddressModal(false)
          setallowEditAddress(false)
          changeActiveOption(id, addressOptions, setAddressOptions)
        }}
        title={"Адрес доставки"}
        onAddress={() => {
          setAddressModal(false)
          setallowEditAddress(true)
          setTimeout(() => {
            setShowAdrOptions(true)
            adrRef.current?.focus()
            if (scrollRef !== null) {
              scrollRef.current.scrollTo({ x: 0, y: 420, animated: true })
            }
            getPossibleAddress(addressValue.value)
          }, 500)
        }}
      />

      <PopupModal
        openModal={timeModal}
        options={timeOptions}
        closeModal={id => {
          setTimeModal(false)
          changeActiveOption(id, timeOptions, setTimeOptions)
        }}
        title={"Интервал доставки"}
      />

      <PopupModal
        openModal={openPayModal}
        options={payOptions}
        closeModal={id => {
          setOpenPayModal(false)
          changeActiveOption(id, payOptions, setPayOptions)
        }}
        title={"Способ оплаты"}
        showScoresModal={opt => {
          if (opt.text === "Оплатить бонусами") {
            setScoresModal(true)
            return
          } else if (opt.text === "Депозит") {
            setDepositModal(true)
            if (deposit >= cartTotal.pay) {
              setDepositScores(cartTotal.pay.toString())
            }
            return
          }
        }}
      />

      <Modal animationType={"fade"} transparent={true} visible={scoresModal}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: "#2AA6FF",
              flex: 1,
              opacity: 0.08,
            }}
            onPress={() => {
              if (error) {
                setScores("")
                setPayOptions(payOptions.map(i => ({ ...i, selected: false })))
              }
              setScoresModal(false)
            }}
          ></TouchableOpacity>
          <View style={{ width: "100%", backgroundColor: "#fff", padding: 30 }}>
            <View
              style={[
                styles.scoresInput,
                error ? { borderColor: "red" } : { borderColor: "#AAAAAE" },
              ]}
            >
              <View style={{ width: "100%" }}>
                <Text style={styles.inputTitle}>
                  Введите количество бонусов
                </Text>
                <TextInput
                  keyboardType="number-pad"
                  style={{
                    fontSize: 16,
                    color: "#56565F",
                    fontFamily: "Montserrat-Medium",
                    padding: 0,
                  }}
                  value={scores}
                  onChangeText={userScores => {
                    setScores(userScores)
                    checkScores(userScores)
                  }}
                />
              </View>
            </View>
            <Text
              style={{ fontFamily: "Montserrat-SemiBold", color: "#56565F" }}
            >
              Доступно бонусов {parseFloat(userData.scores).toFixed()} ₽
            </Text>
          </View>
          <BottomBtn
            activeOpacity={0.95}
            onPress={() => {
              if (!error) {
                setScoresModal(false)
              }
            }}
          >
            <BottomBtnText>Оплатить {scores || 0} ₽</BottomBtnText>
          </BottomBtn>
        </View>
      </Modal>
      <Modal animationType={"fade"} transparent={true} visible={depositModal}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: "#2AA6FF",
              flex: 1,
              opacity: 0.08,
            }}
            onPress={() => {
              setDepositModal(false)
              setPayOptions(payOptions.map(i => ({ ...i, selected: false })))
            }}
          ></TouchableOpacity>
          <View style={{ width: "100%", backgroundColor: "#fff", padding: 30 }}>
            <View
              style={[
                styles.scoresInput,
                error ? { borderColor: "red" } : { borderColor: "#AAAAAE" },
              ]}
            >
              <View style={{ width: "100%" }}>
                <Text style={styles.inputTitle}>Введите количество рублей</Text>
                <TextInput
                  keyboardType="number-pad"
                  style={{
                    fontSize: 16,
                    color: "#56565F",
                    fontFamily: "Montserrat-Medium",
                    padding: 0,
                  }}
                  value={depositScores}
                  onChangeText={txt => {
                    setDepositScores(txt)
                    checkDepositScores(txt)
                  }}
                />
              </View>
            </View>
            <Text
              style={{ fontFamily: "Montserrat-SemiBold", color: "#56565F" }}
            >
              Доступно: {deposit || 0} ₽
            </Text>
          </View>
          <BottomBtn
            activeOpacity={0.95}
            onPress={() => {
              if (!error) {
                setDepositModal(false)
              }
            }}
          >
            <BottomBtnText>Оплатить {depositScores || 0} ₽</BottomBtnText>
          </BottomBtn>
        </View>
      </Modal>
      <Modal animationType={"fade"} transparent={true} visible={dateModal}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: "#2AA6FF",
              flex: 1,
              opacity: 0.08,
            }}
            onPress={() => setDateModal(false)}
          ></TouchableOpacity>
          <View
            style={{
              height: 380,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Calendar
              minDate={new Date()}
              style={{ width: windowWidth * 0.9 }}
              firstDay={1}
              onDayPress={day => {
                setActiveDate(day.dateString)
                setDateModal(false)
              }}
            />
          </View>
          <BottomBtn activeOpacity={0.8} onPress={() => setDateModal(false)}>
            <BottomBtnText>Применить</BottomBtnText>
          </BottomBtn>
        </View>
      </Modal>
      {(loading || orderLoading) && <Indicator />}
    </>
  )
}
const styles = StyleSheet.create({
  subtitlte: {
    fontSize: 16,
    color: "#56565F",
    fontFamily: "Montserrat-Medium",
    padding: 0,
  },
  descriptionWrapper: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderColor: "#aadbff",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  description: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addBtn: {
    backgroundColor: "#2AA6FF",
    width: 125,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  input: {
    marginHorizontal: 15,
    marginVertical: 6,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#AAAAAE",
  },
  scoresInput: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  popupText: {
    fontSize: 16,
    color: "#56565F",
    fontWeight: "bold",
    padding: 15,
  },
  sum: {
    fontSize: 24,
    color: "#56565F",
    fontFamily: "Montserrat-SemiBold",
  },
  bottomBtn: {
    backgroundColor: "#2AA6FF",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
  },
  btn: {
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#2AA6FF",
    marginTop: 15,
    marginBottom: "20%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputTitle: {
    color: "#56565F",
    fontSize: 12,
    marginBottom: -4,
    fontFamily: "Montserrat-Medium",
  },
  drop: {
    height: 120,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 8,
    overflow: "hidden",
  },
  dropRow: {
    paddingVertical: 10,
    paddingLeft: 5,
  },
  dropText: {
    fontFamily: "Montserrat-Regular",
    color: "#163D4A",
    fontSize: 14,
  },
})
