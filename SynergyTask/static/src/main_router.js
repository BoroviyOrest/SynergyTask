import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import { UsersTab, GroupsTab, Menu } from './components';


export default class MainRouter extends React.Component {
    render(){
        return (
            <main>
                <Menu/>
                <Switch>
                    <Route path="/users" component={UsersTab} />
                    <Route path="/groups" component={GroupsTab} />
                    <Redirect path="*" to="/users"/>
                </Switch>
            </main>
        )
    }
}
