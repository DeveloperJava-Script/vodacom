const DataReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    const cartNames = state.cart.map(item => item.name)
    if (cartNames.indexOf(action.payload.name) >= 0) {
      return state
    }
    return {
      ...state,
      cart: [...state.cart, action.payload],
    }
  }
  if (action.type === "REMOVE_PRODUCT") {
    return {
      ...state,
      cart: state.cart.filter(cartItem => cartItem.id !== action.payload),
    }
  }
  if (action.type === "PRODUCT_TO_ZERO") {
    return {
      ...state,
      cart: state.cart.map(cartItem => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: 0 }
        }
        return cartItem
      }),
    }
  }
  if (action.type === "INCREASE_AMOUNT") {
    let tempCart = state.cart.map(cartItem => {
      if (cartItem.id === action.payload.item.id) {
        return {
          ...cartItem,
          amount: cartItem.amount + parseInt(action.payload.item.count_item),
          price_item: action.payload.price,
        }
      }
      return cartItem
    })
    return { ...state, cart: tempCart }
  }
  if (action.type === "DECREASE_AMOUNT") {
    let tempCart = state.cart.map(cartItem => {
      if (cartItem.id === action.payload.item.id) {
        return {
          ...cartItem,
          amount: cartItem.amount - parseInt(action.payload.item.count_item),
          price_item: action.payload.price,
        }
      }
      return cartItem
    })
    return { ...state, cart: tempCart }
  }
  if (action.type === "SET_ORDERS") {
    return {
      ...state,
      cart: action.payload,
    }
  }
  if (action.type === "MAKE_CLEAR_CART") {
    return {
      ...state,
      cart: state.cart.map(i => {
        return { ...i, amount: 0 }
      }),
    }
  }
  return state
}

export default DataReducer
