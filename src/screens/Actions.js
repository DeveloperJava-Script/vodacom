import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Text,
  Alert,
} from "react-native"
import axios from "axios"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { useAppContext } from "../navigation/AuthProvider"
import { Container, Title } from "../styles/Common"
import BtnBack from "../components/BtnBack"

export default function Actions({ navigation }) {
  const { user } = useAppContext()
  const [items, setItems] = useState([])
  const [actions, setactions] = useState([])
  const fetchActions = async () => {}

  useEffect(() => {
    fetchActions()
  }, [])
  return (
    <>
      <Container>
        <BtnBack navigation={navigation} />
        {items.length > 0 && (
          <Title style={{ paddingHorizontal: 15 }}>Акции</Title>
        )}
        <ScrollView
          style={{ paddingHorizontal: 15 }}
          showsVerticalScrollIndicator={false}
        >
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
          >
            {items.length > 0 ? (
              <>
                {items.reverse().map(action => (
                  <ValidImage
                    key={action.id}
                    navigation={navigation}
                    action={action}
                  />
                ))}
              </>
            ) : (
              <SkeletonPlaceholder>
                {items.map((action, i) => (
                  <SkeletonPlaceholder.Item
                    key={i}
                    width={353}
                    height={205}
                    borderRadius={10}
                    marginRight={15}
                  ></SkeletonPlaceholder.Item>
                ))}
              </SkeletonPlaceholder>
            )}
          </ScrollView>

          <Text
            style={[styles.title, items?.length === 0 && { paddingTop: 30 }]}
          >
            Скидка для Вас
          </Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 20 }}
          >
            {actions.length > 0 ? (
              <>
                {actions.reverse().map(action => (
                  <ValidImage
                    key={action.id}
                    navigation={navigation}
                    action={action}
                  />
                ))}
              </>
            ) : (
              <SkeletonPlaceholder>
                {actions.map((action, i) => (
                  <SkeletonPlaceholder.Item
                    key={i}
                    width={353}
                    height={205}
                    borderRadius={10}
                    marginRight={15}
                  ></SkeletonPlaceholder.Item>
                ))}
              </SkeletonPlaceholder>
            )}
          </ScrollView>
        </ScrollView>
      </Container>
    </>
  )
}

const ValidImage = ({ navigation, action }) => {
  const [valid, setValid] = useState(true)
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate("ActionInfo", { action, valid })
      }}
    >
      <Image
        source={
          valid
            ? { uri: action.image }
            : require("../assets/images/action_temp.png")
        }
        resizeMode={"stretch"}
        onError={() => setValid(false)}
        style={{
          width: 353,
          height: 205,
          marginRight: 15,
          borderRadius: 10,
        }}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  title: {
    color: "#56565f",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 32,
    paddingBottom: 10,
  },
})
