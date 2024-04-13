import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Cards from '../../components/card/Card';
import Carousel1 from '../../components/carousel/Carousel1';
import { server } from "../../server";
import Genre from '../category/Genre';
import './HomePage.css';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${server}movie/get-all-movie`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });
        setData(response.data);
        window.scrollTo(0, 0);

      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovie();
  }, []);

  const showAllMovies = () => {
    setSelectedGenre(null);
  };
  const filterByGenre = (genre) => {
    console.log('Selected Genre:', genre);
    setSelectedGenre(genre);
  };

  const filteredMovies = data.filter(
    (d) =>
      (d.data.type === 'now' || d.data.type === 'upcoming') &&
      (selectedGenre === null || d.data.genre
        .split(',')
        .map(g => g
          .trim())
        .includes(selectedGenre
          .trim()))
  );

  const NoMoviesMessage = ({ type }) => (
    <div className="flex items-center justify-center h-20 bg-red-800 px-5 rounded-md mt-4">
      <p className="text-gray-50">
        {type} movies not found for the selected genre. Try another genre!
      </p>
    </div>
  );


  return (
    <>
      <Carousel1 />
      <h2 className='show text-zinc-400 text-4xl font-serif  '>Select Category</h2>
      <Genre selectedGenre={selectedGenre} onGenreSelect={filterByGenre} onShowAllMovies={showAllMovies} />
      <h2 className='show text-zinc-400 text-4xl font-serif '>Now Showing</h2>
      <div className='home'>
        {filteredMovies
          .filter((d) => d.data.type === 'now')
          .map((d, i) => (
            <span key={i}>
              <Cards
                title={d.data.title}
                cast={d.data.cast}
                genre={d.data.genre}
                director={d.data.director}
                image={d.photo[0]}
                industry={d.data.industry}
                button='Buy Ticket'
                url={d._id}
              />
            </span>
          ))}
        {selectedGenre !== null && filteredMovies.filter((d) => d.data.type === 'now').length === 0 && (
          <NoMoviesMessage type="Now Showing" />
        )}
      </div>

      <h2 className='show text-zinc-400 text-4xl  font-serif'>Upcoming</h2>
      <div className='home'>
        {filteredMovies
          .filter((d) => d.data.type === 'upcoming')
          .map((d, i) => (
            <span key={i}>
              <Cards
                title={d.data.title}
                cast={d.data.cast}
                genre={d.data.genre}
                director={d.data.director}
                image={d.photo[0]}
                industry={d.data.industry}
                button='Show Details'
                url={d._id}
                release={
                  d.data.type === 'upcoming'
                    ? new Date(d.data.releaseDate).toLocaleDateString('en-US', {
                      weekday: 'short',
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })
                    : null
                }
              />
            </span>
          ))}
        {selectedGenre !== null && filteredMovies.filter((d) => d.data.type === 'upcoming').length === 0 && (
          <NoMoviesMessage type="Upcoming" />
        )}
      </div>
    </>
  );

};

export default HomePage;