import React, { useState } from 'react';

const Genre = ({ selectedGenre, onGenreSelect, onShowAllMovies }) => {
    const [allMoviesActive, setAllMoviesActive] = useState(false);
    const genres = ["Action", "Drama", "Comedy", "Romance",
        "Adventure", "Sci-Fi", "Thriller", "Fantasy",
        "Horror", "Mystery", "Animation", "Family",
        "Documentary", "Musical", "Western", "History"];

    const handleAllMoviesClick = () => {
        setAllMoviesActive(!allMoviesActive);
        onShowAllMovies();
    };

    return (

        <div className='flex justify-evenly flex-wrap space-x-10 '>
            <button
                className={`min-w-20 mb-2 font-serif mr-5 px-4 py-2 ${allMoviesActive ? 'bg-blue-500' : 'bg-orange-500'} text-white rounded-full font-bold cursor-pointer`}
                onClick={handleAllMoviesClick}
            >
                All Movies
            </button>
            {genres.map((genre, index) => (
                <button
                    key={index}
                    className={`mr-4 min-w-20 px-4 font-serif py-2 mb-2 bg-${selectedGenre === genre ? 'blue' : 'orange'}-500 text-white rounded-full font-bold cursor-pointer`}
                    onClick={() => {
                        setAllMoviesActive(false);
                        onGenreSelect(genre);
                    }}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
};

export default Genre;
