import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './navigation/navigation';
import Homepage from './homepage/home';
import ProductsList from './products/list/productList';
import ProductsDetail from './products/detail/productDetail';
import About from './about/about'
import Jumbotron from './jumbotron/jumbotron';
import SellerLogin from './seller/login/login';
import SellerNavigation from './seller/navigation/navigation';
import ProductsManage from './seller/products_manage/products_manage';
import AccountNavigation from './account/dashboard/navigation';
import UserInfo from './account/dashboard/userinfo';
import Register from './account/dashboard/register';
import ForgotPW from './account/dashboard/forgotPW';
import ChangePW from './account/dashboard/changePW';
import Payments from './payments/payment';
import AccountVerify from './account/dashboard/verify';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/seller/login' component={SellerLogin} />
                    <Route path="/seller/dashboard">
                        <SellerNavigation />
                        <Switch>
                            <Route path="/seller/dashboard/inventory/:page" component={ProductsManage} />
                        </Switch>
                    </Route>
                    <Route path='/account' >
                        <AccountNavigation />
                        <Switch>
                            <Route path="/account/info/:type" component={UserInfo} />
                            <Route path="/account/register" component={Register} />
                            <Route path="/account/forgotpassword" component={ForgotPW} />
                            <Route path="/account/changepassword" component={ChangePW} />
                            <Route path="/account/verify/:account_id" component={AccountVerify} />
                        </Switch>
                    </Route>
                    <Route path="/">
                        <Navigation path="/" />
                        <Switch>
                            <Route exact path='/' component={Homepage} />
                            <Route path='/products/detail/:id' component={ProductsDetail} />
                            <Route exact path='/products/:page' component={ProductsList} />
                            <Route exact path='/products/:page/:tags' component={ProductsList} />
                            <Route path='/about' component={About} />
                            <Route path='/jumbotron' component={Jumbotron} />
                            <Route path="/payment" component={Payments} />
                        </Switch>
                    </Route>
                </Switch>
            </Router>
        )
    }
}
export default App;