import React from "react"
import { DataProvider } from "../components/context/DataContext"
import { ProductsProvider } from "../components/context/ProductsContext"
import { NavigationContainer } from "@react-navigation/native"
import AppNavigation from "./AppNavigation"

const Providers = () => {
  return (
    <DataProvider>
      <ProductsProvider>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </ProductsProvider>
    </DataProvider>
  )
}

export default Providers
