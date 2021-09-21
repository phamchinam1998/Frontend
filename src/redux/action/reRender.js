export const Render = () => {
    return {
        type: "RERENDER"
    }
}
export const Authorization = (status) => {
    return {
        type: "AUTHORIZATION",
        status: status,
    }
}
export const SellerAuthorization = (payload) => {
    return {
        type: "SELLER_AUTHORIZATION",
        payload: payload,
    }
}
export const ProductHandle = (info) => {
    return {
        type: "PRODUCT_INFO",
        info: info,
    }
}

export const TotalMoney = (number) => {
    return {
        type: "TOTAL_MONEY",
        number: number,
    }
}