const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',      // MySQL server host
  user: 'root',           // MySQL username (default is 'root' for XAMPP)
  password: '',           // MySQL password (default is empty for XAMPP)
  database: 'moviewatchlist'   // Name of the database you're using
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// // Create tables if they do not exist
// const createTables = () => {
//     const createUsersTable = `
//         CREATE TABLE IF NOT EXISTS tbl_users (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             username VARCHAR(255) NOT NULL,
//             email VARCHAR(255) NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             role ENUM('admin', 'user') DEFAULT 'user'
//         );
//     `;

//     const createMoviesTable = `
//         CREATE TABLE IF NOT EXISTS tbl_movies (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             title VARCHAR(255) NOT NULL,
//             description TEXT,
//             poster_url VARCHAR(255),
//             bg_poster_url VARCHAR(255)
//         );
//     `;

//     const createWatchlistTable = `
//         CREATE TABLE IF NOT EXISTS tbl_watchlist (
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             user_id INT NOT NULL,
//             movie_id INT NOT NULL,
//             watched BOOLEAN DEFAULT FALSE,
//             FOREIGN KEY (user_id) REFERENCES tbl_users(id) ON DELETE CASCADE,
//             FOREIGN KEY (movie_id) REFERENCES tbl_movies(id) ON DELETE CASCADE
//         );
//     `;

//     // Execute the queries to create tables
//     connection.query(createUsersTable, (err) => {
//         if (err) throw err;
//         console.log('Table tbl_users created or already exists.');
//     });

//     connection.query(createMoviesTable, (err) => {
//         if (err) throw err;
//         console.log('Table tbl_movies created or already exists.');
//     });

//     connection.query(createWatchlistTable, (err) => {
//         if (err) throw err;
//         console.log('Table tbl_watchlist created or already exists.');
//     });
// };

// // Call the function to create tables
// createTables();

module.exports = connection;
