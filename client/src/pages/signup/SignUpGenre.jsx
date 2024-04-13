import React from 'react';

const SignUpGenre = ({ onGenreChange }) => {


    const genres = ["Action", "Sci-Fi", "Thriller", "Adventure",
        "Fantasy", "Comedy", "Family", "Drama", "History", "Romance",
        "Horror", "Mystery", "Animation", "Musical", "Western",
        "Documentary",];

    const handleCheckBoxChange = (genre) => {
        onGenreChange(genre)
    }

    return (
        <div className='flex flex-wrap justify-start gap-2 '>
            {genres.map((genre) => (
                <label key={genre} className='inline-flex items-center mr-3 mb-2 rounded-full bg-teal-800 px-2 py-0' >
                    <input
                        type="checkbox"
                        name="genre"
                        value={genre}
                        onChange={() => handleCheckBoxChange(genre)}
                        className="form-checkbox h-4 w-4"
                        required
                    />
                    <span className="ml-2 text-gray-200">{genre}</span>

                </label>
            ))}
        </div>
    )
}

export default SignUpGenre