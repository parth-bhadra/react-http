import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [isLoading, setIsLoading]= useState(false);

  const [movies, setMovies] = useState([]);
  const transformedData = [];

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    const response = await fetch('https://swapi.dev/api/films/');
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
    setIsLoading(false);
  }
  let showContent;

  if(isLoading)
    showContent = <p>Loading...</p>
  else
    showContent = <MoviesList movies={movies} />



  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {showContent}
      </section>
    </React.Fragment>
  );
}

export default App;
