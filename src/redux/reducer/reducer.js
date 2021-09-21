export const reRenderReducer = (state = 0, action) => {
    switch (action.type) {
        case "RERENDER":
            return state + 1;
        default:
            return state;
    }
}
export const authorization = (status = "notAllow", action) => {
    switch (action.type) {
        case "AUTHORIZATION":
            return status = action.status;
        default:
            return status;
    }
}
export const sellerAuthorization = (state = false, action) => {
    switch (action.type) {
        case "SELLER_AUTHORIZATION":
            return state = action.payload;
        default:
            return state;
    }
}

export const productHandle = (status = "", action) => {
    switch (action.type) {
        case "PRODUCT_INFO":
            return status = action.info;
        default:
            return status;
    }
}

export const totalMoney = (total = "", action) => {
    switch (action.type) {
        case "TOTAL_MONEY":
            return total = action.number;
        default:
            return total;
    }
}