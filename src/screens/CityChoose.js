import React, { useEffect, useState } from "react"
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native"
import axios from "axios"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { useAppContext } from "../navigation/AuthProvider"
export default function CityChoose({ navigation }) {
  const { setCity } = useAppContext()
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(false)
  const getCities = async () => {}
  useEffect(() => {
    getCities()
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.imageBlock}>
        <Image source={require("../assets/images/logotype.png")} />
        <Text style={styles.title}>Водаком</Text>
        <Text style={styles.subtitle}>Доставка воды</Text>
      </View>
      <Text style={[styles.btnText, { paddingBottom: 15, fontSize: 16 }]}>
        Выберите Ваш город
      </Text>
      {loading ? (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width={"100%"}
            height={30}
            borderRadius={10}
            marginBottom={10}
          />
          <SkeletonPlaceholder.Item
            width={"100%"}
            height={30}
            borderRadius={10}
            marginBottom={10}
          />
        </SkeletonPlaceholder>
      ) : (
        <View>
          {cities.map(city => (
            <TouchableOpacity
              key={city.id}
              activeOpacity={0.6}
              style={[styles.btn, { marginBottom: 10 }]}
              onPress={() => {
                setCity(city.id)
                navigation.navigate("Меню")
              }}
            >
              <Text style={styles.btnText}>{city.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    paddingHorizontal: 15,
  },
  imageBlock: {
    paddingTop: "20%",
    alignItems: "center",
    paddingBottom: "25%",
  },
  title: {
    color: "#2AA6FF",
    fontSize: 24,
    textTransform: "uppercase",
    fontFamily: "Montserrat-Black",
    letterSpacing: 1.6,
  },
  subtitle: {
    color: "#2AA6FF",
    fontSize: 15,
    textTransform: "uppercase",
    fontFamily: "Montserrat-Medium",
    marginTop: -4,
  },
  btn: {
    borderRadius: 10,
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "#fff",
    elevation: 2,
    borderColor: "#E5E5E5",
    borderTopWidth: 1,
    marginBottom: 10,
  },
  btnText: {
    fontSize: 14,
    fontFamily: "Montserrat-SemiBold",
    color: "#56565F",
    textAlign: "center",
  },
})
