import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import MenuBar from "./MenuBar";
import BitBucket from "./BitBucket";
import Setting from "./Setting";

const App = () => {
    return (

        <BrowserRouter>
            <MenuBar/>
            <Switch>
                <Route exact path="/" name="Home" component={BitBucket}/>
                <Route exact path="/setting" name="setting" component={Setting}/>
            </Switch>
        </BrowserRouter>

    )
};

export default App;
