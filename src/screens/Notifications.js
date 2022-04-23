import React from "react"
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  RefreshControl,
} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useAppContext } from "../navigation/AuthProvider"
import { NoUserInfo } from "../components/NoUserInfo"
import { Container, Title } from "../styles/Common"
import BtnBack from "../components/BtnBack"
export default function History({ navigation }) {
  const { user, notifications, loading, getNotification } = useAppContext()
  return (
    <>
      <Container>
        <BtnBack navigation={navigation} />
        <View style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 15 }}>
            <Title>Уведомления</Title>
          </View>
          {user?.token ? (
            <>
              {notifications.length === 0 && (
                <Text
                  style={{
                    color: "#999",
                    fontFamily: "Montserrat-SemiBold",
                    paddingLeft: 15,
                  }}
                >
                  У вас пока нет уведомлений.
                </Text>
              )}
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={getNotification}
                    colors={["#2AA6FF"]}
                  />
                }
                showsVerticalScrollIndicator={false}
              >
                <View style={{ flex: 1 }}>
                  {notifications.map((item, i) => (
                    <View style={{ paddingHorizontal: 15 }} key={i}>
                      <View style={styles.row}>
                        <TouchableOpacity
                          style={{ padding: 10, flex: 1 }}
                          activeOpacity={0.6}
                        >
                          <Text style={styles.text1}>{item.message}</Text>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Ionicons
                              name="time-outline"
                              color={"#AAAAAE"}
                              size={16}
                              style={{ paddingRight: 5, marginTop: 1 }}
                            />
                            <Text style={styles.text2}>{item.date}</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </>
          ) : (
            <NoUserInfo navigation={navigation} />
          )}
        </View>
      </Container>
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 14,
    elevation: 4,
  },
  text1: {
    color: "#56565F",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 16,
  },
  text2: {
    color: "#AAAAAE",
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
  },
})
