import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HomePage } from './HomePage';
import { PersonPage } from './PersonPage';

const App = () => {
  return (
    <>
      <Router>
        <Route exact path="/" component={HomePage} />
        {/* A new route for the component person/:personId. This is a bit different compared to our regular routes. Here we pass a parameter personId through the route. That way a single component at that route can be dynamic based on that parameter.*/}
        <Route path="/person/:personId" component={PersonPage} />
      </Router>
    </>
  );
};

export default App;
