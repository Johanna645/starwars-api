import React, { useState, useEffect } from 'react';
import Link from 'react';
// import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
// import { PersonPage } from './PersonPage';

export function HomePage() {
  // Home page where to make a call to the API to get the person data
  // after adding PersonPage-component, change return (old verison: return <h5 key={index}>{person.name}</h5> )so that it now returns links to dynamic routes as index as the route parameter

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
}
