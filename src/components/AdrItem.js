import React, { useState } from "react"
import axios from "axios"
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from "react-native"
export default function AdrItem({ add, user, num, changeText, handleClick }) {
  const [adrOptions, setAdrOptions] = useState([])
  const [showAdrOptions, setShowAdrOptions] = useState(false)
  const [autoFill, setautoFill] = useState(true)
  const getPossibleAddress = async txt => {
    await axios
      .get(
        `https://vodavpskove.ru/api/v2/address.get?token=${user.token}&addr=${txt}`
      )
      .then(res => {
        setAdrOptions(
          res.data.suggestions
            .filter(i => i.data.postal_code !== null)
            .map(i => {
              return { value: i.value, post: i.data.postal_code }
            })
        )
      })
  }
  return (
    <View style={{ marginBottom: 20 }}>
      {showAdrOptions && add.name.length > 0 && (
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
                        changeText(item)
                        setautoFill(false)
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
              </View>
            </ScrollView>
          )}
        </View>
      )}
      <View style={styles.input}>
        <View style={styles.row}>
          <TextInput
            autoCorrect={false}
            placeholder="Добавьте еще один адрес"
            placeholderTextColor="#AAAAAE"
            style={styles.textInput}
            value={add.name}
            onFocus={() => {
              setShowAdrOptions(true)
              getPossibleAddress(add.name)
              setTimeout(() => {
                handleClick(500 + num * 40)
              }, 100)
            }}
            onChangeText={txt => {
              setShowAdrOptions(true)
              getPossibleAddress(txt)
              changeText({ value: txt, post: adrOptions[0]?.post || 180006 })
              setautoFill(true)
            }}
            onEndEditing={() => {
              if (autoFill && adrOptions.length > 0 && add.name.length > 0) {
                changeText(adrOptions[0])
                setShowAdrOptions(false)
              }
            }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#2AA6FF",
    paddingBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    color: "#56565F",
    width: "96%",
    fontFamily: "Montserrat-Medium",
    padding: 0,
    paddingRight: 20,
  },
  drop: {
    height: 160,
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
})
