import React, {useEffect} from "react";
import MainMenu from "./MainMenu/MainMenu";
import SubMenu from "./SubMenu/SubMenu";
import ScrollBar from "../components/ScrollBar";
import Header from "./Header/Header";
import Footer from "./Footer/footer";
import {connect} from "react-redux";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import FullWidthLoading from "../components";
import {loadConfig} from "../store/actions";
import Dashboard from "../pages/Dashboard/dashboard";

const App = (props) => {
    useEffect(() => {
        props.onLoad();
    }, [])

    return (
        <Router>
            <div className={`container ${props.isDark ? 'dark' : ''}`}>
                {props.isLoading ? <FullWidthLoading/> : null}
                <div className="row">
                    <MainMenu/>
                    <SubMenu/>
                    <div className="column content" style={{marginRight: "27%", height: "100vh"}}>
                        <ScrollBar>
                            <Header/>
                            <Switch>
                                <Route exact path="/">
                                    <Dashboard/>
                                </Route>
                                <Route path="*">
                                    "404"
                                </Route>
                            </Switch>
                            <Footer/>
                        </ScrollBar>
                    </div>
                </div>
            </div>
        </Router>
    );
};


const mapStateToProps = state => {
    return {
        isLoading: state.global.isLoading,
        isDark: state.global.isDark
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onLoad: () => dispatch(loadConfig())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);