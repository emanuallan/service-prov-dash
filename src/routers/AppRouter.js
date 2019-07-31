import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from '../App';
import Login from '../components/Login';
import TreeView from '../components/TreeView';
import AppHistory from './AppHistory'
import Tree from '../components/Tree';

const AppRouter = () => (
    <Router history={AppHistory}>
        <div>
            <Switch>
                <Route exact path="/login" component={Login} />
                <Route path="/dash" component={App} />
                <Route exact path="/" component={TreeView} />
                <Route exact path="/tree" component={Tree} />
            </Switch>
        </div>
    </Router>
);

export default AppRouter;



