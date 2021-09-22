import axios from "axios";

export function AddCart(item_id, token, authen) {
    const cart = window.localStorage.getItem('PCN-Cart');
    if (cart) {
        const arr = cart.split('&');
        const unduplicate = arr.every(e => e !== item_id);
        if (unduplicate === true) {
            arr.push(item_id);
            window.localStorage.setItem('PCN-Cart', `${arr.join('&')}`);
        }
    }
    else window.localStorage.setItem('PCN-Cart', `${item_id}`);
    if (authen === "Allow") {
        const data = {
            item_id: item_id,
        };
        axios.post(`https://demo-ecomerce-backend.herokuapp.com/authorization/cart/additem`, data, {
            headers: {
                Authorization: token
            }
        }).then(function (response) {
            // handle success
            console.log(response);
        })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
            });;
    }
}

export function DeleteCartItem(id, token, authen) {
    const cart = window.localStorage.getItem('PCN-Cart');
    const arr = cart.split('&');
    const index = arr.indexOf(id);
    arr.splice(index, 1)
    window.localStorage.setItem('PCN-Cart', arr.join('&'));
    if (authen === "Allow") {
        const data = {
            item_id: id,
        }
        axios.post(`https://demo-ecomerce-backend.herokuapp.com/authorization/cart/deleteitem`, data, {
            headers: {
                Authorization: token
            }
        }).then(function (response) {
            // handle success
            console.log(response);
        })
            .catch(function (error) {      
                // handle error
                console.log(error);
            })
            .then(function () {
            });;
    }
}

export function DeleteCart(token, authen) {
    window.localStorage.removeItem('PCN-Cart');
    if (authen === "Allow") {
        const data = {}
        axios.post(`https://demo-ecomerce-backend.herokuapp.com/authorization/cart/deleteall`, data, {
            headers: {
                Authorization: token
            }
        }).then(function (response) {
            // handle success
            console.log(response);
        })
            .catch(function (error) {          //DONE
                // handle error
                console.log(error);
            })
            .then(function () {
            });;
    }
}