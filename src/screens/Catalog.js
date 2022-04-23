import React, { useEffect, useState } from "react"
import Product from "../components/Product"
import Header from "../components/Header"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native"
import { useProductContext } from "../components/context/ProductsContext"
import { useAppContext } from "../navigation/AuthProvider"

export default function Catalog({ navigation }) {
  const { user } = useAppContext()
  const [showCtg, setShowCtg] = useState(false)
  const [activeCtg, setActiveCtg] = useState(0)
  const {
    items,
    categories,
    fetchCtgProducts,
    setItems,
    loading,
    fetchCategories,
  } = useProductContext()

  useEffect(() => {
    if (user.city === "") {
      navigation.navigate("Город")
      return
    }
    if (user.city !== null && !loading) {
      fetchCategories()
      fetchCtgProducts(1, "")
    }
  }, [user])
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} marginRight={10} />
      <View style={styles.tabs}>
        {categories.map(ctg => {
          return (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setShowCtg(true)
                setActiveCtg(ctg.id)
                fetchCtgProducts(ctg.id + 1, "")
              }}
              activeOpacity={0.7}
              key={ctg.id}
            >
              <Text
                style={{ color: "#2AA6FF", fontFamily: "Montserrat-SemiBold" }}
              >
                {ctg.name}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ display: showCtg ? "flex" : "none" }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{ marginHorizontal: 5 }}
          >
            {categories[activeCtg].subcategories.map((subc, id) => {
              return (
                <View
                  key={id}
                  style={{ height: 60, paddingTop: 14, marginTop: -10 }}
                >
                  <TouchableOpacity
                    style={styles.ctgBtn}
                    onPress={() => fetchCtgProducts(subc.id, subc.name)}
                    activeOpacity={0.8}
                    key={id}
                  >
                    <Text
                      style={{
                        color: "#56565F",
                        fontFamily: "Montserrat-SemiBold",
                      }}
                    >
                      {subc.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <>
            {[1, 2, 3, 4, 5].map(item => (
              <View key={item} style={{ marginBottom: 10 }}>
                <SkeletonPlaceholder>
                  <SkeletonPlaceholder.Item
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    borderWidth={3}
                    borderColor={"#E1E9EE"}
                    borderRadius={10}
                    marginHorizontal={10}
                    paddingVertical={10}
                  >
                    <SkeletonPlaceholder.Item
                      width={80}
                      height={100}
                      borderRadius={10}
                    />
                    <SkeletonPlaceholder.Item marginLeft={20}>
                      <SkeletonPlaceholder.Item
                        width={120}
                        height={20}
                        borderRadius={4}
                      />
                      <SkeletonPlaceholder.Item
                        marginTop={6}
                        width={80}
                        height={20}
                        borderRadius={4}
                      />
                      <SkeletonPlaceholder.Item
                        marginTop={12}
                        width={100}
                        height={20}
                        borderRadius={4}
                      />
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder.Item>
                </SkeletonPlaceholder>
              </View>
            ))}
          </>
        ) : (
          <>
            {items.map(item => (
              <View style={{ marginHorizontal: 10 }} key={item.id}>
                <Product
                  key={item.id}
                  item={item}
                  onPress={() => {
                    navigation.navigate("ProductInfo", { item })
                  }}
                  onDelete={false}
                />
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFDFD",
    paddingHorizontal: 10,
    paddingTop: 15,
  },
  centered: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
    marginHorizontal: 10,
  },
  button: {
    borderRadius: 8,
    borderColor: "#2AA6FF",
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 8,
    maxHeight: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  ctgBtn: {
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginHorizontal: 10,
    elevation: 4,
  },
})
