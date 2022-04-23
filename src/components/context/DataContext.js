import React, { useReducer, useContext, useState, useEffect } from "react"
import { useAppContext } from "../../navigation/AuthProvider"
import DataReducer from "./DataReducer"

const DataContext = React.createContext()
const initialState = {
  cart: [],
}
const DataProvider = ({ children }) => {
  const { discounts } = useAppContext()
  const [clearCart, setClearCart] = useState(false)
  const [state, dispatch] = useReducer(DataReducer, initialState)

  const addToCart = item => {
    const itemCount = item?.def_cnt || 1
    const foundCounts = discounts
      .filter(i => i.id === item.id)
      .filter(i => itemCount >= i?.count)
      .sort((a, b) => a.count > b.count)
    const price = foundCounts[foundCounts.length - 1]?.price
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        amount: itemCount * parseFloat(item.count_item),
        price_item: price || item.truePrice,
      },
    })
  }

  const makeCart = item => {
    dispatch({ type: "MAKE_CART", payload: item })
  }

  const increaseAmount = item => {
    const foundCounts = discounts
      .filter(i => i.id === item.id)
      .filter(i => item.amount + 1 >= i?.count)
      .sort((a, b) => a.count > b.count)
    const price = foundCounts[foundCounts.length - 1]?.price
    dispatch({
      type: "INCREASE_AMOUNT",
      payload: { item, price: price || item.truePrice },
    })
  }

  const decreaseAmount = item => {
    const foundCounts = discounts
      .filter(i => i.id === item.id)
      .filter(i => item.amount - 1 >= i?.count)
      .sort((a, b) => a.count > b.count)
    const price = foundCounts[foundCounts.length - 1]?.price
    dispatch({
      type: "DECREASE_AMOUNT",
      payload: { item, price: price || item.truePrice },
    })
  }

  const removeProduct = id => {
    dispatch({ type: "REMOVE_PRODUCT", payload: id })
  }

  const toZero = id => {
    dispatch({ type: "PRODUCT_TO_ZERO", payload: id })
  }
  const setOrders = cart => {
    setClearCart(prev => !prev)
    dispatch({ type: "SET_ORDERS", payload: cart })
  }
  const makeClearCart = () => {
    dispatch({ type: "MAKE_CLEAR_CART" })
  }
  useEffect(() => {
    state.cart.map(i => {
      if (i.amount < 1) {
        removeProduct(i.id)
      }
      return i
    })
  }, [state.cart])
  return (
    <DataContext.Provider
      value={{
        ...state,
        addToCart,
        increaseAmount,
        decreaseAmount,
        removeProduct,
        toZero,
        makeCart,
        setOrders,
        clearCart,
        makeClearCart,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(DataContext)
}

export { DataProvider, useGlobalContext }
