import axios from "axios";

export const actionTypes = {
  FETCH_CATEGORIES: "FETCH_CATEGORIES",
  FETCH_BANNERS: "FETCH_BANNERS",
  FETCH_PRODUCTS: "FETCH_PRODUCTS",
  FETCH_CART: "FETCH_CART",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
  ADD_RANDOM_PRODUCTS: "ADD_RANDOM_PRODUCTS",
  REMOVE_CARTITEM_BUNCH: "REMOVE_CARTITEM_BUNCH",
  SIGNUP_SUCCESS: "SIGNUP_SUCCESS",
  SIGNIN_SUCCESS: "SIGNIN_SUCCESS",
  SIGNUP_ERROR: "SIGNUP_ERROR",
  LOGOUT: "LOGOUT",
};
// const BASE_URL = "http://127.0.0.1:5000";
// export const BASE_URL_ASSETS = "http://127.0.0.1:5000";
export const BASE_URL = "http://localhost:3000";
// export const BASE_URL_ASSETS = "http://localhost:5000";
export const fetchBannerAction = () => async (dispatch) => {
  const banners = await axios.get(BASE_URL + "/banners");
  console.log("banners", banners);
  dispatch({
    type: actionTypes.FETCH_BANNERS,
    payload: banners.data,
  });
};
export const signUpAction = (user) => async (dispatch) => {
  console.log("signUpAction");

  try {
    const signup = await axios.post(BASE_URL + "/signup", {
      ...user,
    });
    console.log("signup", signup);

    dispatch({
      type: actionTypes.SIGNUP_SUCCESS,
      payload: { user: signup.data.user, success_message: signup.data.message },
    });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: actionTypes.SIGNUP_ERROR,
      payload: { user: null, err_message: error.response.data.error },
    });
  }
};
export const signinAction = (user) => async (dispatch) => {
  try {
    const signin = await axios.post(BASE_URL + "/signin", {
      ...user,
    });
    console.log("signin", signin);
    dispatch({
      type: actionTypes.SIGNIN_SUCCESS,
      payload: {
        userDetails: signin.data.userDetails,
        token: signin.data.token,
        msg: signin.data.msg,
      },
    });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: actionTypes.SIGNIN_ERROR,
      payload: { user: null, err_message: error.response.data.error },
    });
  }
};
export const logoutAction = () => async (dispatch) => {
  dispatch({
    type: actionTypes.LOGOUT,
  });
};
export const fetchCategoriesAction = () => async (dispatch) => {
  const categories = await axios.get(BASE_URL + "/categories");
  dispatch({
    type: actionTypes.FETCH_CATEGORIES,
    payload: categories.data,
  });
};
export const fetchProductsAction = () => async (dispatch) => {
  const products = await axios.get(BASE_URL + "/products");
  dispatch({
    type: actionTypes.FETCH_PRODUCTS,
    payload: products.data,
  });
};
export const fetchCartAction = () => async (dispatch) => {
  // const cart = await axios.post( "http://localhost:5000/addToCart");
  // console.log("FETCHED");
  dispatch({
    type: actionTypes.FETCH_CART,
    // payload: cart.data,
  });
};
export const addToCartAction = (cartItems, productToAdd) => {
  // console.log("ADDTOCART", productToAdd);

  const itemExists = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // console.log("itemExists", itemExists);
  let cartItemUpdated;
  if (itemExists) {
    cartItemUpdated = cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  } else {
    cartItemUpdated = [...cartItems, { ...productToAdd, quantity: 1 }];
    // console.log("cartItemUpdated", cartItemUpdated);
  }
  return {
    type: actionTypes.ADD_TO_CART,
    payload: cartItemUpdated,
  };
};

export const removeCartItemAction = (cartItems, productToRemove) => {
  const itemExists = cartItems.find(
    (cartItem) => cartItem.id === productToRemove.id
  );
  // console.log("itemExists", itemExists);
  let cartItemUpdated;
  if (itemExists && itemExists.quantity > 1) {
    cartItemUpdated = cartItems.map((cartItem) =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  } else {
    cartItemUpdated = cartItems.filter(
      (cartItem) => cartItem.id !== productToRemove.id
    );
  }
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: cartItemUpdated,
  };
};
export const addRandomProductsAction = (
  cartItems,
  productToUpdate,
  quantity
) => {
  let cartItemsUpdated;
  // const updateProduct = {
  //   ...productToUpdate,
  //   quantity
  // }
  cartItemsUpdated = cartItems.map((cartItem) =>
    cartItem.id === productToUpdate.id ? { ...cartItem, quantity } : cartItem
  );
  return {
    type: actionTypes.ADD_RANDOM_PRODUCTS,
    payload: cartItemsUpdated,
  };
};
export const removeCartItemBunchAction = (cartItems, id) => {
  let cartItemsUpdated = cartItems.filter((cartItem) => cartItem.id !== id);
  return {
    type: actionTypes.REMOVE_CARTITEM_BUNCH,
    payload: cartItemsUpdated,
  };
};
export const clearCartAction = () => {
  let cartItemsUpdated = [];
  return {
    type: actionTypes.CLEAR_CART,
    payload: cartItemsUpdated,
  };
};
