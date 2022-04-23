import React, { useEffect } from "react"
import { View, ScrollView, ActivityIndicator, Text } from "react-native"
import { useAppContext } from "../navigation/AuthProvider"
import { useProductContext } from "../components/context/ProductsContext"
import { Container, Title } from "../styles/Common"
import { NoUserInfo } from "../components/NoUserInfo"
import BtnBack from "../components/BtnBack"
import HistoryItem from "../components/HistoryItem"
export default function History({ navigation }) {
  const { loading, userOrders, fetchOrders } = useProductContext()
  const { user } = useAppContext()
  useEffect(() => {
    if (user?.token) {
      fetchOrders()
    }
  }, [user])
  return (
    <>
      <Container>
        <BtnBack navigation={navigation} />
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 15 }}>
            <Title>История</Title>
          </View>
          {user?.token ? (
            <>
              {!loading && userOrders.length === 0 && (
                <Text
                  style={{
                    color: "#999",
                    fontFamily: "Montserrat-SemiBold",
                    paddingLeft: 15,
                  }}
                >
                  У вас пока нет заказов!
                </Text>
              )}
              {loading ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator color={"#2AA6FF"} size={40} />
                </View>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={{ flex: 1 }}>
                    {userOrders.map((item, id) => {
                      return (
                        <HistoryItem
                          key={id}
                          item={item}
                          navigation={navigation}
                        />
                      )
                    })}
                  </View>
                </ScrollView>
              )}
            </>
          ) : (
            <NoUserInfo navigation={navigation} />
          )}
        </View>
      </Container>
    </>
  )
}
