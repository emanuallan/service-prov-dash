import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from "react-redux";
import store from "./store";
import AppRouter from './routers/AppRouter';

const Index = () => (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(<Index />, document.getElementById('root'));
