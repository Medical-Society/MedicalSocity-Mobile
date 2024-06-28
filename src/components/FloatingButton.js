import { Entypo } from "@expo/vector-icons"
import React, { useState } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated"

export function FloatingButton({ onPress, style, ...rest }) {
  const [isOpen, setIsOpen] = useState(false)
  const animation = useSharedValue(0)

  const rotationAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withSpring(isOpen ? "45deg" : "0deg")
        }
      ]
    }
  })

  const pinAnimatedStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      animation.value,
      [0, 1],
      [0, -20],
    )

    return {
      transform: [
        {
          scale: withSpring(animation.value)
        },
        {
          translateY: withSpring(translateYAnimation)
        }
      ]
    }
  })

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      animation.value,
      [0, 1],
      [0, -30],
    )

    return {
      transform: [
        {
          scale: withSpring(animation.value)
        },
        {
          translateY: withSpring(translateYAnimation)
        }
      ]
    }
  })

  const heartAnimatedStyle = useAnimatedStyle(() => {
    const translateYAnimation = interpolate(
      animation.value,
      [0, 1],
      [0, -40],
    )

    return {
      transform: [
        {
          scale: withSpring(animation.value)
        },
        {
          translateY: withSpring(translateYAnimation)
        }
      ]
    }
  })

  const opacityAnimatedStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      animation.value,
      [0, 0.5, 1],
      [0, 0, 1],
    )

    return {
      opacity: withSpring(opacityAnimation)
    }
  })

  function toggleMenu() {
    onPress()
    setIsOpen(current => {
      animation.value = current ? 0 : 1
      return !current
    })
  }

  return (
    <View style={[styles.container, style]} {...rest}>
      <TouchableOpacity activeOpacity={0.8} style={styles.circleContainer}>
        <Animated.View
          style={[
            styles.button,
            styles.secondary,
            heartAnimatedStyle,
            opacityAnimatedStyle
          ]}
        >
          <Entypo name="heart" size={24} color="#f02a4b" />
        </Animated.View>
      </TouchableOpacity>

      <View style={styles.rowContainer}>
        <TouchableOpacity activeOpacity={0.8} style={styles.circleContainer}>
          <Animated.View
            style={[
              styles.button,
              styles.secondary,
              thumbAnimatedStyle,
              opacityAnimatedStyle
            ]}
          >
            <Entypo name="thumbs-up" size={24} color="#f02a4b" />
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} style={styles.circleContainer}>
          <Animated.View
            style={[
              styles.button,
              styles.secondary,
              thumbAnimatedStyle,
              opacityAnimatedStyle
            ]}
          >
            <Entypo name="location-pin" size={24} color="#f02a4b" />
          </Animated.View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity activeOpacity={0.8} onPress={toggleMenu}>
        <Animated.View
          style={[styles.button, styles.menu, rotationAnimatedStyle]}
        >
          <Entypo name="plus" size={32} color="#ffffff" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
    justifyContent: "center"
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: "#f02a4b",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10, width: 10 },
    elevation: 10
  },
  menu: {
    backgroundColor: "#f02a4b"
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ffffff"
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    width: "100%",
    padding: 50
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
