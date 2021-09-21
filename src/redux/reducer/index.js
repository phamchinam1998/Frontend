import { combineReducers } from "redux";
import { reRenderReducer } from "./reducer.js";
import { authorization } from "./reducer.js";
import { sellerAuthorization } from "./reducer.js";
import { productHandle } from "./reducer.js";
import { totalMoney } from "./reducer.js";

export const allReducers = combineReducers({
    reRenderReducer, authorization, sellerAuthorization, productHandle, totalMoney
});