import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import ChatPage from './Pages/ChatPage';
import HomePage from './Pages/HomePage';
import CadastrarPage from './Pages/CadastrarPage';
import isAuthenticated from './helpers/auth';

const PrivateChat = ({ component: Component, ...rest }) =>(
    <Route { ... rest} render={ props => 
        isAuthenticated() ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{pathname: '/', state: { from: props.location }}}/>
        )
    }/>
)

function Router(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomePage}></Route>
                <PrivateChat path="/chat" component={ChatPage}></PrivateChat>
                <Route path="/cadastrar" component={CadastrarPage}></Route>
            </Switch>
        </BrowserRouter>
    );
}

export default Router;