import React from 'react';
import { Router, Route } from 'react-router-dom';

import { history } from '../_helpers';
import { Dashboard } from '../components/Dashboard';

// require('../index.css');

export const App = props => (
    <div className="container-fluid">
        <Router history={history}>
            <div>
                <Route path="/" component={Dashboard} />
            </div>
        </Router>
    </div>
);
