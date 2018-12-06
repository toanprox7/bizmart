import React, { Component } from 'react';
import ViewClient from './ViewClient';
import { BrowserRouter, Route,Switch,Link,NavLink } from 'react-router-dom';
import NoMatch from './NoMatch';
class ViewMain extends Component {
    render() {
        return (
            <Switch>
                <Route path="/home" component={ViewClient} />
                <Route exact path="/admin" component={NoMatch} />
            </Switch>
        );
    }
}

export default ViewMain;