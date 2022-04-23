import React from "react"
import { StyleSheet, View, Modal, TouchableOpacity, Text } from "react-native"
import { ItemAddToCart } from "../styles/Catalog"
export default function PopupModal({
  openModal,
  options,
  closeModal,
  title,
  onAddress,
  showScoresModal,
}) {
  return (
    <Modal animationType={"fade"} transparent={true} visible={openModal}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#2AA6FF",
            flex: 1,
            opacity: 0.08,
          }}
          onPress={() => closeModal()}
        ></TouchableOpacity>
        <View style={{ width: "100%", backgroundColor: "#fff" }}>
          <View style={{ flexDirection: "row", alignContent: "center" }}>
            <Text style={styles.popupText}>{title}</Text>
            {title === "Адрес доставки" && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <ItemAddToCart onPress={onAddress}>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 14,
                      fontFamily: "Montserrat-SemiBold",
                    }}
                  >
                    Ввести адрес
                  </Text>
                </ItemAddToCart>
              </View>
            )}
          </View>
          {options.map(option => {
            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.option, option.selected && styles.selected]}
                activeOpacity={0.6}
                onPress={() => {
                  if (showScoresModal) {
                    showScoresModal(option)
                  }
                  closeModal(option.id)
                }}
              >
                <Text style={styles.text}>{option.text}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  popupText: {
    fontSize: 16,
    color: "#56565F",
    padding: 15,
    fontFamily: "Montserrat-Bold",
  },
  option: {
    paddingLeft: 20,
    paddingVertical: 15,
    borderLeftWidth: 5,
    borderColor: "#fefefe",
  },
  text: {
    color: "#56565F",
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
  },
  selected: {
    borderLeftWidth: 5,
    borderColor: "#2AA6FF",
  },
})
