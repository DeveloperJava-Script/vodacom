import React, { useState, useRef } from "react"
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Easing,
} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
const AccordionListItem = ({ title, children }) => {
  const [open, setOpen] = useState(false)
  const animatedController = useRef(new Animated.Value(0)).current
  const [bodySectionHeight, setBodySectionHeight] = useState(0)

  const bodyHeight = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: [0, bodySectionHeight],
  })

  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ["0rad", `${Math.PI}rad`],
  })

  const toggleListItem = () => {
    if (open) {
      Animated.timing(animatedController, {
        duration: 500,
        toValue: 0,
        useNativeDriver: false,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start()
    } else {
      Animated.timing(animatedController, {
        duration: 500,
        toValue: 1,
        useNativeDriver: false,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      }).start()
    }
    setOpen(!open)
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => toggleListItem()}>
        <View style={[styles.description, open && { paddingBottom: 7 }]}>
          <Text
            style={{
              fontSize: 16,
              color: "#56565F",
              fontFamily: "Montserrat-SemiBold",
            }}
          >
            {title}
          </Text>
          <Animated.View style={{ transform: [{ rotateZ: arrowAngle }] }}>
            <Ionicons
              name={"chevron-down-outline"}
              color={"#56565F"}
              size={24}
            />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.bodyBackground, { height: bodyHeight }]}>
        <View
          style={styles.bodyContainer}
          onLayout={event =>
            setBodySectionHeight(event.nativeEvent.layout.height)
          }
        >
          {children}
        </View>
      </Animated.View>
    </>
  )
}
export default AccordionListItem

const styles = StyleSheet.create({
  bodyBackground: {
    overflow: "hidden",
  },
  description: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bodyContainer: {
    position: "absolute",
    bottom: 0,
  },
})
