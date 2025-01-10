const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const connection= require('./database');
const app = express();
const port = 5000;

// Serve static files (for accessing images)
app.use('/images', express.static(path.join(__dirname, '../frontend/public/images/movieimages')));

// Multer configuration for storing uploaded files in movieimages folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../frontend/public/images/movieimages'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Timestamped filenames
    },
});
const upload = multer({ storage });

// Enable CORS for all routes and origins
app.use(cors());
app.use(express.json()); 



app.get('/', (req, res) => {
  res.send('Hello World from Node.js');
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  const query = `
    SELECT id, username, role FROM tbl_users 
    WHERE (username = ? OR email = ?) AND password = ?
  `;

  connection.query(query, [username, username, password], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    if (results.length > 0) {
      const user = results[0];
      res.json({
        success: true,
        message: "Login successful",
        user: {
          userId: user.id,
          username: user.username,
          role: user.role,
        },
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });
});

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  // Check if the username or email already exists
  const checkQuery = `
    SELECT * FROM tbl_users WHERE username = ? OR email = ?
  `;

  connection.query(checkQuery, [username, email], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    if (results.length > 0) {
      // Username or email already exists
      return res.status(409).json({ success: false, message: "Username or email already exists" });
    }

    // Insert new user into the database
    const insertQuery = `
      INSERT INTO tbl_users (username, email, password, role) VALUES (?, ?, ?, 'user')
    `;

    connection.query(insertQuery, [username, email, password], (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
      }

      // Success
      res.json({ success: true, message: "User registered successfully" });
    });
  });
});


// Movies route
app.get('/api/movies', (req, res) => {
  const query = 'SELECT * FROM tbl_movies'; // Assuming your table name is tbl_movies
  connection.query(query, (err, results) => {
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ success: false, message: "Internal server error" });
      }

      res.json({ success: true, movies: results }); // Sending movies in response
  });
});

// Movies route
// Movie Detail Route: Get a specific movie's details by movieId
app.get('/api/movies/:movieId', (req, res) => {
  const { movieId } = req.params;

  const query = `
      SELECT * FROM tbl_movies WHERE id = ?
  `;

  connection.query(query, [movieId], (err, results) => {
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ success: false, message: "Internal server error" });
      }

      if (results.length > 0) {
          const movie = results[0]; // Assuming a single movie result
          res.json({
              success: true,
              movie: {
                  movieId: movie.id,
                  title: movie.title,
                  description: movie.description,
                  poster_url: movie.poster_url,
                  bg_poster_url: movie.bg_poster_url,  // Assuming this field exists for the background poster
                  youtube_url: movie.youtube_url,      // Assuming a YouTube URL field for the trailer
              },
          });
      } else {
          res.status(404).json({ success: false, message: "Movie not found" });
      }
  });
});


// Watchlist route: Get user's watchlist
app.get('/api/watchlist/:userId', (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT m.id, m.title, m.poster_url, m.description
    FROM tbl_watchlist w
    JOIN tbl_movies m ON w.movie_id = m.id
    WHERE w.user_id = ?
  `;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    res.json({ success: true, movies: results });
  });
});

// Check if a movie is in the user's watchlist
app.get('/api/watchlist/:userId/:movieId', (req, res) => {
  const { userId, movieId } = req.params;

  const query = `
    SELECT * FROM tbl_watchlist WHERE user_id = ? AND movie_id = ?
  `;

  connection.query(query, [userId, movieId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }

    res.json({ success: true, isInWatchlist: results.length > 0 });
  });
});

// Delete a movie from the user's watchlist
app.delete('/api/watchlist', (req, res) => {
  const { userId, movieId } = req.body;

  if (!userId || !movieId) {
      return res.status(400).json({ success: false, message: "Missing userId or movieId" });
  }

  // Delete the movie from the watchlist
  const deleteQuery = `
      DELETE FROM tbl_watchlist WHERE user_id = ? AND movie_id = ?
  `;

  connection.query(deleteQuery, [userId, movieId], (err) => {
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ success: false, message: "Internal server error" });
      }

      res.json({ success: true, message: "Movie removed from watchlist" });
  });
});

// Add a movie to the user's watchlist
app.post('/api/watchlist', (req, res) => {
  const { userId, movieId } = req.body; // Remove watched from here

  if (!userId || !movieId) {
      return res.status(400).json({ success: false, message: "Missing userId or movieId" });
  }

  // Insert the movie into the watchlist
  const insertQuery = `
      INSERT INTO tbl_watchlist (user_id, movie_id) VALUES (?, ?)
  `;

  connection.query(insertQuery, [userId, movieId], (err) => {
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ success: false, message: "Internal server error" });
      }

      res.json({ success: true, message: "Movie added to watchlist" });
  });
});


// Add Movie Route with File Upload
app.post('/api/admin/addmovie', upload.fields([
  { name: 'poster', maxCount: 1 },
  { name: 'bgPoster', maxCount: 1 },
]), (req, res) => {
  const { title, description, youtube_url } = req.body;

  const posterFile = req.files['poster'] ? req.files['poster'][0].filename : null;
  const bgPosterFile = req.files['bgPoster'] ? req.files['bgPoster'][0].filename : null;

  const posterUrl = posterFile ? `/images/movieimages/${posterFile}` : '/images/movieimages/default_poster.jpg'; // Set default if no file uploaded
  const bgPosterUrl = bgPosterFile ? `/images/movieimages/${bgPosterFile}` : '/images/movieimages/default_bg.jpeg'; // Set default if no file uploaded

  const query = `
      INSERT INTO tbl_movies (title, description, youtube_url, poster_url, bg_poster_url)
      VALUES (?, ?, ?, ?, ?)
  `;

  connection.query(query, [title, description, youtube_url, posterUrl, bgPosterUrl], (err) => {
      if (err) return res.status(500).json({ success: false, message: "Internal server error" });
      res.json({ success: true, message: "Movie added successfully" });
  });
});



app.put('/api/admin/editmovie/:id', upload.fields([
  { name: 'poster', maxCount: 1 },
  { name: 'bgPoster', maxCount: 1 },
]), (req, res) => {
  const { id } = req.params;
  const { title, description, youtube_url } = req.body;

  const updates = [];
  const params = [];

  if (title) { updates.push('title = ?'); params.push(title); }
  if (description) { updates.push('description = ?'); params.push(description); }
  if (youtube_url) { updates.push('youtube_url = ?'); params.push(youtube_url); }

  // Retrieve existing movie data for checking
  const selectQuery = `SELECT * FROM tbl_movies WHERE id = ?`;
  connection.query(selectQuery, [id], (err, results) => {
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ success: false, message: "Internal server error" });
      }

      if (results.length === 0) {
          return res.status(404).json({ success: false, message: "Movie not found" });
      }

      const movie = results[0]; // Get the existing movie data

      // Set default image URLs if no new files are uploaded
      const posterFile = req.files['poster'] ? req.files['poster'][0].filename : null;
      const bgPosterFile = req.files['bgPoster'] ? req.files['bgPoster'][0].filename : null;

      const posterUrl = posterFile ? `/images/movieimages/${posterFile}` : movie.poster_url; // Use existing URL if no new file
      const bgPosterUrl = bgPosterFile ? `/images/movieimages/${bgPosterFile}` : movie.bg_poster_url; // Use existing URL if no new file

      // Add the image URL updates if there are new files
      if (posterFile) { updates.push('poster_url = ?'); params.push(posterUrl); }
      if (bgPosterFile) { updates.push('bg_poster_url = ?'); params.push(bgPosterUrl); }

      if (updates.length === 0) {
          return res.status(400).json({ success: false, message: "No updates made" });
      }

      const query = `UPDATE tbl_movies SET ${updates.join(', ')} WHERE id = ?`;
      params.push(id);

      connection.query(query, params, (err) => {
          if (err) return res.status(500).json({ success: false, message: "Internal server error" });
          res.json({ success: true, message: "Movie updated successfully" });
      });
  });
});


app.delete('/api/admin/deletemovie/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM tbl_movies WHERE id = ?`;

  connection.query(query, [id], (err) => {
      if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ success: false, message: "Internal server error" });
      }

      res.json({ success: true, message: "Movie deleted successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
