//The action creators are functions that create and 
// return action objects, which describe the type of state change to be performed:
import * as actionTypes from "./actionTypes.js";

//receives the object
export const addToCart = (item) => {
  return {
    type: actionTypes.ADD_TO_CART,
    item: item,
  };
};

//receives the object id 
export const removeFromCart = (id) => {
  return {
    type: actionTypes.REMOVE_ITEM,
    id: id,
  };
};

export const emptyCart = () => {
  return {
    type: actionTypes.EMPTY_CART,
  };
};