import React, { useEffect, useState } from "react";
import { MovieService } from "../../api/MovieService";
import MovieCard from "../../components/MovieCard/MovieCard";
import { useRouteError } from "react-router-dom";

const Home = ( {searchValueProp} ) => {
  const [movies, setMovies] = useState([]);

  async function getMovies() {
    const {
      data: { results },
    } = await MovieService.getMovies();

    setMovies(results);
  }

  async function getMoviesSearch(movieString) {
    const {
      data: { results },
    } = await MovieService.searchMovies(movieString);

    setMovies(results);
  }

  useEffect(() => {
    getMovies();
  }, []);

  
  useEffect(() => {
    if (searchValueProp) {
      getMoviesSearch(searchValueProp);
    }
    if (searchValueProp === "" ) {
      getMovies();
    }
  }, [searchValueProp]);

  return (
    <section className="Home">
      {movies.map((movie) => (
        <div key={movie.id}>
          <MovieCard movieProp={movie} />
        </div>
      ))}
    </section>
  );
};

export default Home;
