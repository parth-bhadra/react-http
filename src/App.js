import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const transformedData = [];

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      // the fetch api does not throw errors in case of status codes, so no use of try catch block
      // hence we manually throw errors bases of properties of our reponse object
      // axios has that functionality << use this for your production apps      
      if (!response.ok) {
        throw new Error('Something went wrong')
      }
      const data = await response.json();



      for (let item of data.results) {
        transformedData.push({
          id: item.episode_id,
          title: item.title,
          releaseDate: item.release_date,
          openingText: item.opening_crawl
        })
      }
      setMovies(transformedData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [])
  // useCallback also requires dependencies to be added
  // there are none in this case as fetch api is browser api, not a dependency
  // other than that you have the state updating functions, which react guarantees won't change

   useEffect(() => {
     fetchMoviesHandler();
   }, [fetchMoviesHandler]);
  // without any dependecies, component will load the first time the page loads
  // but as fetchMoviesHandler modifies states in the app component
  // clicking the button >> fetchMoviesHandler >> 

  let content;

  if (isLoading)
    content = <p>Loading...</p>
  else if (error)
    content = <p>{error}</p>
  else if (movies.length === 0)
    content = <p>Found no movies</p>
  else
    content = <MoviesList movies={movies} />



  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
