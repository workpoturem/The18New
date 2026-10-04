import React, { useEffect } from 'react';
import {
  Router as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import Header from '@components/Header';
import Home from '@pages/Home';
import Order from '@pages/Order';
import License from '@pages/License';
import Category from '@pages/Category';
import Work from '@pages/Work';
import Footer from '@components/Footer';

const App = () => {
  const browserHistory = createBrowserHistory();

 const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(10, 0);
    }, [pathname]);

    return null;
  }

  const Redirects = () => {
    const { pathname } = useLocation();

    if (pathname === '/tallpeople' || pathname === '/tallpeople/') {
      window.location.href = '/';
    }

    return null;
  }

  return (
    <div className="page">
      <HelmetProvider>
        <Router history={browserHistory}>
          <Redirects />
          <Header />
          <Switch>
            <Route path="/order" component={Order}/>
            <Route path="/license" component={License} />
            <Route path="/:collection/:slug" component={Work} />
            <Route path="/:collection" component={Category} />
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
          <Footer />
          <ScrollToTop />
        </Router>
      </HelmetProvider>
    </div>
  );
};

export default App;
