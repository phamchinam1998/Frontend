import React from "react";

export default function SignOutPopup(props) {

    const SignOut = () => {
        window.localStorage.removeItem("Ecom-seller");
        props.cancel();
        props.signout();
    }

    return (
        <>
            <div id="popup-container">
                <div id="popup">
                    <h3>Đăng xuất</h3>
                    <h5>Bạn có chắc muốn đăng xuất ?</h5>
                    <div>
                        <button onClick={() => props.cancel()} >Cancel</button>
                        <button onClick={() => SignOut()} id="popup-confirm" >Đăng xuất</button>
                    </div>
                </div>
            </div>
        </>
    )
}