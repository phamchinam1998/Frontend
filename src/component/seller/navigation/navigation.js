import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import './sellernav.scss';
import BlankAvatar from './blankava.png';
import SignOutPopup from '../popup/signout';
import { useDispatch, useSelector } from 'react-redux';
import { SellerAuthorization } from '../../../redux/action/reRender';
// import Loading from '../../loading/loading';

function SellerNavigation() {
    const dispatch = useDispatch();
    const seller_data = useSelector(state => state.sellerAuthorization);
    const [signOut, setSignOut] = useState(false);

    const SignOut = () => {
        setSignOut(true);
    }

    return seller_data ?
        <>
            {
                signOut ? <SignOutPopup signout={() => dispatch(SellerAuthorization(false))} cancel={() => setSignOut(false)} /> : <></>
            }
            <div id="seller-navbar-container">
                <div className="seller-nav-item" id="seller-avatar">
                    <i className="fa fa-bars" aria-hidden="true"></i>
                    <div id="avatar-info">
                        <img src={BlankAvatar} alt="" />
                        <div>
                            <h5>{seller_data.seller_name}</h5>
                            <i onClick={() => { SignOut() }} className="fa fa-sign-out" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
                <Link to="/" className="seller-nav-item">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    <div>Homepage</div>
                </Link>
                <Link to="/account/info/seller" className="seller-nav-item">
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                    <div>Account</div>
                </Link>
                <Link to="/seller/dashboard/inventory/1" className="seller-nav-item">
                    <i className="fa fa-cubes" aria-hidden="true"></i>
                    <div>Inventory</div>
                </Link>
                <div className="seller-nav-item">
                    <i className="fa fa-file" aria-hidden="true"></i>
                    <div>Invoice</div>
                </div>
                <div className="seller-nav-item">
                    <i className="fa fa-area-chart" aria-hidden="true"></i>
                    <div>Report</div>
                </div>
                <div className="seller-nav-item">
                    <i className="fa fa-users" aria-hidden="true"></i>
                    <div>Customers</div>
                </div>
            </div >
        </>
        :
        <Redirect to="/seller/login" />
}
export default SellerNavigation;