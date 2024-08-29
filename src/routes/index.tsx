import React from 'react';
import { HashRouter, Route, Routes as Router } from 'react-router-dom';
import { RouteAuth } from './route-auth';

import App from '../App';
import { MidiaPage } from '../component/pages/MidiaPage';
import { Login } from '../component/pages/Login';

const Routes: React.FC = () => {

  const [expandSearch, setExpandSearch] = React.useState(false);

  return (
    <HashRouter>
      <Router>
        <Route>
          <Route path="/" element={<Login />} />
        </Route>
        <Route element={<RouteAuth children={<App />} />}>
          <Route path="/home" element={<MidiaPage
            expandSearch={expandSearch}
            setExpandSearch={setExpandSearch} />} />
        </Route>
      </Router>
    </HashRouter>
  );
};

export default Routes;