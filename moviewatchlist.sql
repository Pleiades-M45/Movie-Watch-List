-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 10, 2025 at 03:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `moviewatchlist`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_movies`
--

CREATE TABLE IF NOT EXISTS `tbl_movies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `poster_url` varchar(512) DEFAULT NULL,
  `bg_poster_url` varchar(512) DEFAULT NULL,
  `youtube_url` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_movies`
--

INSERT INTO `tbl_movies` (`id`, `title`, `description`, `poster_url`, `bg_poster_url`, `youtube_url`) VALUES
(1, 'Arcane', 'Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.', '/images/movieimages/arcaneposter.jpg', '/images/movieimages/arcaneposterbg.jpg', 'https://youtu.be/fXmAurh012s?si=ndpTI8U-jATuEEu6'),
(2, 'Venom: The Last Dance', 'Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down on Venom and Eddie\'s last dance.', '/images/movieimages/venom_poster.jpg', '/images/movieimages/venom_bg.jpg', 'https://www.youtube.com/watch?embeds_referring_euri=https%3A%2F%2Fgeekait.netlify.app%2F&source_ve_path=Mjg2NjQsMTY0NTA2&v=FKBN1qAzW3s&feature=youtu.be'),
(3, 'Solo Leveling -ReAwakening-', 'Over a decade after \'gates\' connecting worlds appeared, awakening \'hunters\' with superpowers, weakest hunter Sung Jinwoo encounters a double dungeon and accepts a mysterious quest, becoming the only one able to level up, changing his fate. A catch-up recap of the first season coupled with an exclusive sneak peek of the first two episodes of the highly anticipated second season in one momentous theatrical fan experience.', '/images/movieimages/sololeveling_poster.jpg\r\n', '/images/movieimages/sololeveling_bg.jpg', 'https://youtu.be/3xJxnQ_Nx94?si=pdzHsCWPuYzllShu'),
(4, 'Elevation', 'A single father and two women venture from the safety of their homes to face monstrous creatures to save the life of a young boy.', '/images/movieimages/elevation_poster.jpg', '/images/movieimages/elevation_bg.jpg', 'https://youtu.be/kt0V2rpEouE?si=rBwMQLoiVSSzUBhb'),
(5, 'Inception', 'Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\", the implantation of another person\'s idea into a target\'s subconscious.', '/images/movieimages/inception_poster.jpg', '/images/movieimages/inception_bg.jpg', 'https://youtu.be/8hP9D6kZseM?si=J5r7dBBgac9aSHa0'),
(6, 'Maquia: When the Promised Flower Blooms', 'Maquia is a member of a special race called the Iorph who can live for hundreds of years. However, Maquia has always felt lonely despite being surrounded by her people, as she was orphaned from a young age. She daydreams about the outside world, but dares not travel from her home due to the warnings of the clan\'s chief. One day the kingdom of Mezarte invades her homeland. They already have what is left of the giant dragons, the Renato, under their control, and now their king wishes to add the immortality to his bloodline. They ravage the Iorph homeland and kill most of its inhabitants. Caught in the midst of the attack, Maquia is carried off by one of the Renato. It soon dies, and she is left deserted in a forest, now truly alone save for the cries of a single baby off in the distance. Maquia finds the baby in a destroyed village and decides to raise him as her own, naming him Ariel. Although she knows nothing of the human world, how to raise a child that ages much faster than her.', '/images/movieimages/maquia_poster.jpg', '/images/movieimages/maquia_bg.jpg', 'https://youtu.be/AEWvRqZQ0RU?si=91MNL5x80lhAfTF5'),
(7, 'I Want to Eat Your Pancreas', 'After his classmate and crush is diagnosed with a pancreatic disease, an average high schooler sets out to make the most of her final days.', '/images/movieimages/pancreas_poster.jpg', '/images/movieimages/pancreas_bg.jpg', 'https://youtu.be/MmoBvmJA9XI?si=tDOQd1zyAgez9ClU'),
(8, 'Evangelion: 3.0+1.0 Thrice Upon a Time', 'In the aftermath of the Fourth Impact, stranded without their Evangelions, Shinji, Asuka and Rei find refuge in one of the rare pockets of humanity that still exist on the ruined planet Earth. There, each lives a life far different from their days as an Evangelion pilot. However, the danger to the world is far from over. A new impact is looming on the horizon—one that will prove to be the true end of Evangelion.', '/images/movieimages/evangelion_poster.jpg', '/images/movieimages/evangelion_bg.jpg', 'https://youtu.be/GZfuWMDEJpw?si=VAaqawwTx5W_3hb_'),
(37, 'A Quiet Place', 'A family is forced to live in silence while hiding from creatures that hunt by sound.', '/images/movieimages/1734482496128-quietplace_poster.jpg', '/images/movieimages/1734482496151-quiteplace_bg.jpg', 'https://youtu.be/WR7cc5t7tv8?si=Cfv7UEniECz28yTQ'),
(38, 'Project Silence', 'Due to sudden deteriorating weather conditions, visibility on the Airport Bridge is severely impaired, leaving people stranded and at risk of the bridge collapsing due to a series of chain collisions and explosions. Amidst the chaos, the canine subjects \"Echo\" from the military experiment \"Project Silence,\" who were being transported in secret, break free, and all human survivors become targets of relentless attacks.', '/images/movieimages/1734482616205-projectsilence_poster.jpg', '/images/movieimages/1734482616209-projectsilence_bg.jpg', 'https://youtu.be/b57d2kj1gUA?si=zlLIF8TafbWyIllL'),
(39, 'Twisters', 'As storm season intensifies, the paths of former storm chaser Kate Carter and reckless social-media superstar Tyler Owens collide when terrifying phenomena never seen before are unleashed. The pair and their competing teams find themselves squarely in the paths of multiple storm systems converging over central Oklahoma in the fight of their lives.', '/images/movieimages/1734482732482-twisters_poster.jgp.jpg', '/images/movieimages/1734482732492-twisters_bg.jpg', 'https://youtu.be/wdok0rZdmx4?si=z5fIxXJY1k6Qwa2N');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE IF NOT EXISTS `tbl_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`id`, `username`, `email`, `password`, `role`) VALUES
(1, 'Arlecchino', 'arle@gmail.com', 'abc123', 'admin'),
(3, 'Columbina', 'columbina@gmail.com', 'abc123', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_watchlist`
--

CREATE TABLE IF NOT EXISTS `tbl_watchlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `movie_id` (`movie_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tbl_watchlist`
--

INSERT INTO `tbl_watchlist` (`id`, `user_id`, `movie_id`) VALUES
(7, 3, 1),
(10, 1, 3),
(11, 1, 6),
(21, 1, 1),
(23, 1, 4);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_watchlist`
--
ALTER TABLE `tbl_watchlist`
  ADD CONSTRAINT `tbl_watchlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `tbl_users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tbl_watchlist_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `tbl_movies` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
