import React, { useEffect, useState, useContext } from "react"
import { Alert } from "react-native"
import { useAppContext } from "../../navigation/AuthProvider"
import { useGlobalContext } from "./DataContext"
import axios from "axios"

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const { user } = useAppContext()
  const { clearCart } = useGlobalContext()
  const [deposit, setDeposit] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showNotifications, setShowNotifications] = useState(true)
  const [recomendations, setRecomendations] = useState([])
  const [issues, setIssues] = useState([])
  const [userOrders, setUserOrders] = useState([])
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([
    {
      id: 0,
      name: "Вода",
      subcategories: [],
    },
    {
      id: 1,
      name: "Оборудование",
      subcategories: [],
    },
    {
      id: 2,
      name: "Ещё",
      subcategories: [],
    },
  ])

  const getShuffledArr = arr => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * (i + 1))
      ;[newArr[i], newArr[rand]] = [newArr[rand], newArr[i]]
    }
    return newArr
  }

  const fetchRecomedations = async () => {}

  const fetchCategories = async () => {}

  const fetchOrders = async () => {}

  const fetchIssues = async () => {}

  const getUserDeposit = async () => {}

  async function fetchCtgProducts(id, name) {}

  useEffect(() => {
    setItems(
      items.map(item => {
        return { ...item, amount: 0 }
      })
    )
  }, [clearCart])

  return (
    <ProductsContext.Provider
      value={{
        items,
        categories,
        fetchCategories,
        fetchCtgProducts,
        fetchOrders,
        fetchRecomedations,
        setItems,
        setCategories,
        userOrders,
        loading,
        recomendations,
        showNotifications,
        setShowNotifications,
        fetchIssues,
        issues,
        getUserDeposit,
        deposit,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductContext = () => {
  return useContext(ProductsContext)
}
