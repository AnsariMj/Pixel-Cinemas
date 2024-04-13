const asyncHandler = require("express-async-handler");
const MovieCard = require("../models/movieCard");
const { cloudinary } = require("../utils/cloudinary");
const { deleteFile } = require("../utils/multer");
const user = require('../models/user')
const nodemailer = require("nodemailer");

//NodeMailer to send Email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
})


// Create movie card
const createMovieCard = asyncHandler(async (req, res) => {
  try {

    // const genres = req.body.data.genre;
    const genresString = req.body.data.genre;
    const genres = genresString.split(',').map(genre => genre.trim().toLowerCase());
    const type = req.body.data.type;

    let userEmail = [];

    if (type === 'now') {
      if (Array.isArray(genres) && genres.length > 0) {


        const matchingUsers = await user.find();
        if (matchingUsers && matchingUsers.length > 0) {
          userEmail = matchingUsers.map(user => user.userEmail);
          if (userEmail.length > 0) {
            const { title, cast, releaseDate, genre, director, link } = req.body.data;
            const movieDetailsHTML = `
            <!DOCTYPE html>
            <html lang="en">

            <head>
            <meta charset="UTF-8">
           <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Movie Release: [Movie Name]</title>
           <style>
            body {
            font-family: Arial, sans-serif;
            background: url('background_image.jpg') no-repeat center center fixed;
            background-size: cover;
            margin: 0;
            padding: 0;
           }

          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.9);
            /* Add a semi-transparent white background to improve readability */
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
         }

           h1 {
            color: #333333;
          }

          img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
         }

           p {
            color: #555555;
         }

        a {
            color: #007bff;
            text-decoration: none;
        }

        .cta-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
    </head>

    <body>

    <div class="container">
        <h1>New Movie Release: ${title}</h1>

      

        <p>
            We're excited to announce the release of our latest blockbuster, ${title}. Get ready for an
            unforgettable cinematic experience!
        </p>

        <p>
            <strong>Movie Details:</strong><br>
            Release Date: ${releaseDate}<br>
            Genre: ${genre}<br>
            Cast: ${cast}<br>
            Director: ${director}
        </p>

        <p>
            Watch the official trailer now and secure your tickets for an amazing movie night!
        </p>

        <a href=${link} class="cta-button">Watch Trailer</a>

        <p>
            For more information and to book tickets, visit our <a href="ticket-client.vercel.app">website</a>.
        </p>

        <p>
            Don't miss out on the excitement – see you at the movies!
        </p>
    </div>

      </body>

    </html>
            `;

            //send mail using Promises
            const emailPromises = userEmail.map(async (email) => {
              const mailOptions = {
                from: "Pixel Cinemas <cinemaspixel534@gmail.com>",
                to: email,
                subject: " New Movie Alert in Your Favorite Genres!",
                html: `A new movie has been added. Check it out!\n\n${movieDetailsHTML}`,
              };
              return transporter.sendMail(mailOptions);
            })
            await Promise.all(emailPromises)
          }
        } else {
          console.log("No users found with matching genres");
        }
      } else {
        console.log("Genres is not an array");
      }

    } else {
      console.log("type is not is equal NOW")
    }
    let cloudianaryResponse;
    const file = req.file;
    if (!file) {
      console.log("File not found");
    }

    cloudianaryResponse = await cloudinary.uploader.upload(file.path, {
      upload_preset: "ticket",
    });

    if (cloudianaryResponse) {
      deleteFile(file.path);
    }

    const movieData = {
      ...req.body,
      photo: cloudianaryResponse?.url,
    };

    const newMovie = await MovieCard.create(movieData);
    res.json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//Update movie card
const updateMovieCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {

    const genresString = req.body.genre;
    const genres = genresString.split(',').map(genre => genre.trim().toLowerCase());
    const type = req.body.type;

    let userEmail = [];

    if (type === 'now') {
      if (Array.isArray(genres) && genres.length > 0) {

        const matchingUsers = await user.find();
        if (matchingUsers && matchingUsers.length > 0) {
          userEmail = matchingUsers.map(user => user.userEmail);
          if (userEmail.length > 0) {
            const { title, cast, releaseDate, genre, director, link } = req.body;
            const movieDetailsHTML = `
            <!DOCTYPE html>
            <html lang="en">

            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Movie Release: [Movie Name]</title>
            <style>
              body {
            font-family: Arial, sans-serif;
            background: url('background_image.jpg') no-repeat center center fixed;
            background-size: cover;
            margin: 0;
            padding: 0;
                  }

              .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: rgba(255, 255, 255, 0.9);
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }

          h1 {
              color: #333333;
          }

          img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
        }

        p {
            color: #555555;
        }

        a {
            color: #007bff;
            text-decoration: none;
        }

        .cta-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
          </style>
       </head>

    <body>

    <div class="container">
        <h1>New Movie Release: ${title}</h1>

        <img src="movie_poster.jpg" alt=${title}>

        <p>
            We're excited to announce the release of our latest blockbuster, ${title}. Get ready for an
            unforgettable cinematic experience!
        </p>

        <p>
            <strong>Key Details:</strong><br>
            Release Date: ${releaseDate}<br>
            Genre: ${genre}<br>
            Cast: ${cast}<br>
            Director: ${director}
        </p>

        <p>
            Watch the official trailer now and secure your tickets for an amazing movie night!
        </p>

        <a href=${link} class="cta-button">Watch Trailer</a>

        <p>
            For more information and to book tickets, visit our <a href="ticket-client.vercel.app">website</a>.
        </p>

        <p>
            Don't miss out on the excitement – see you at the movies!
        </p>
        </div>

     </body>
    </html>
            `;
            const emailPromises = userEmail.map(async (email) => {
              const mailOptions = {
                from: "Pixel Cinemas <cinemaspixel534@gmail.com>",
                to: email,
                subject: " New Movie Alert in Your Favorite Genres!",
                html: `A new movie has been added. Check it out!\n\n${movieDetailsHTML}`,
              };
              return transporter.sendMail(mailOptions);
            })
            await Promise.all(emailPromises)
          }
        } else {
          console.log("No users found with matching genres");
        }
      } else {
        console.log("Genres is not an array");
      }

    } else {
      console.log("type is not is equal NOW")
    }

    const data = {
      ...req.body,
      data: req.body,
    };
    const movie = await MovieCard.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//Delete movie card
const deleteMovieCard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const existingMovieCard = await MovieCard.findByIdAndDelete(id);
    if (!existingMovieCard) {
      return res.status(404).json({ message: "Movie Card Not found" });
    }
    res.json({ message: "Movie Card deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const Movie = asyncHandler(async (req, res) => {
  try {
    const { name } = req.query;
    const movie = await MovieCard.find({
      /* `"data.title": { : new RegExp(name, "i") },` is a MongoDB query that is used to perform a case-insensitive regular expression search on the `title` field of the `data` object within the `MovieCard` collection. */
      "data.title": { $regex: new RegExp(name, "i") },
    });
    res.json({ movie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
//Get all movie card
const getAllMovieCard = asyncHandler(async (req, res) => {
  try {
    const movieCard = await MovieCard.find();
    res.json(movieCard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//Get movie card
const getMovieCard = asyncHandler(async (req, res) => {
  try {
    const movieCard = await MovieCard.findById(req.params.id);
    if (!movieCard) {
      return res.status(404).json({ message: "Movie card not found" });
    }
    res.json(movieCard);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Server error" });
  }
});

//Binary Search Algorithm
const BinarySearch = asyncHandler(async (req, res) => {
  const { name } = req.query;
  try {
    const movies = await MovieCard.find({}).sort({ title: 1 });
    const foundMovie = binarySearch(movies, name);
    if (foundMovie) {
      res.status(200).json({ movie: foundMovie });
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

function binarySearch(movies, searchMovie) {
  let low = 0;
  let high = movies.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midTitle = movies[mid].data.title.toLowerCase();

    if (midTitle === searchMovie.toLowerCase()) {
      return movies[mid];
    } else if (midTitle < searchMovie.toLowerCase()) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return null;
}

// Quick Sort Algorithm
const QuickSort = asyncHandler(async (req, res) => {
  const { genre } = req.query;
  try {
    let movies = await MovieCard.find({});
    quickSort(movies, 0, movies.length - 1, genre);

    res.status(200).json({ movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const quickSort = (movies, low, high, sortBy) => {
  if (low < high) {
    const pivotIndex = partition(movies, low, high, sortBy);
    quickSort(movies, low, pivotIndex - 1, sortBy);
    quickSort(movies, pivotIndex + 1, high, sortBy);
  }
};

const partition = (movies, low, high, sortBy) => {
  const pivot = movies[high][sortBy];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (movies[j][sortBy] < pivot) {
      i++;
      const temp = movies[i];
      movies[i] = movies[j];
      movies[j] = temp;
    }
  }

  const temp = movies[i + 1];
  movies[i + 1] = movies[high];
  movies[high] = temp;

  return i + 1;
};



module.exports = {
  BinarySearch,
  QuickSort,
  createMovieCard,
  updateMovieCard,
  deleteMovieCard,
  getAllMovieCard,
  getMovieCard,
  Movie,
};
