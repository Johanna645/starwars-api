import React, { useState, useEffect } from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

// React Router passes two props to all of its routed components: match props and location props.
// We'll be using the match prop to access the route parameters from the PersonPage component. The match prop has a property called params which will have the personId parameter.

// to fetch data from the API to get the details of each person
const PersonPage = ({ match }) => {
  const {
    params: { personId },
  } = match;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`https://swapi.dev/api/people/${personId}`, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
        console.log(`https://swapi.dev/api/people/${personId}`);
      })
      .catch((error) => console.log(error));
  }, [personId]);

  return (
    <>
      {!isLoading && (
        <>
          <h1>Name: {data.name}</h1>
          <h2>Height: {data.height}</h2>
          <h2>Mass: {data.mass}</h2>
          <h2>Hair Color: {data.hair_color}</h2>
          <h2>Skin Color: {data.skin_color}</h2>
          <h2>Eye Color: {data.eye_color}</h2>
          <h2>Birth Year: {data.birth_year}</h2>
          <h2>Gender: {data.gender}</h2>
          <Link to="/">Back to homepage</Link>
        </>
      )}
    </>
  );
};

// Home page where to make a call to the API to get the person data
// after adding PersonPage-component, change return (old verison: return <h5 key={index}>{person.name}</h5> )so that it now returns links to dynamic routes as index as the route parameter
const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch('https://swapi.dev/api/people/', {})
      .then((res) => res.json())
      .then((response) => {
        setData(response.results);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {!isLoading &&
        data.map((person, index) => {
          return (
            <h5 key={index}>
              <Link to={`/person/${index + 1}`}>{person.name}'s Page</Link>
            </h5>
          );
        })}
    </>
  );
};

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
