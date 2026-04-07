-- Giggs Labs - Clean Database Schema for Hostinger MySQL

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Table structure for table `posts`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `slug` varchar(220) NOT NULL,
  `category` varchar(50) DEFAULT 'Article',
  `excerpt` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `embed_url` varchar(500) DEFAULT NULL,
  `order` int(11) DEFAULT 0,
  `is_published` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT current_timestamp(),
  `updated_at` timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `services`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `services` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `icon` varchar(10) DEFAULT '🔧',
  `title` varchar(200) NOT NULL,
  `tagline` varchar(300) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `color` varchar(100) DEFAULT 'from-cyan-400 to-blue-500',
  `border_hover` varchar(100) DEFAULT 'hover:border-cyan-500/50',
  `glow_hover` varchar(150) DEFAULT 'hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]',
  `accent` varchar(50) DEFAULT 'text-cyan-400',
  `highlights` json DEFAULT NULL,
  `href` varchar(200) DEFAULT NULL,
  `order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT current_timestamp(),
  `updated_at` timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `job_openings`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `job_openings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `location` varchar(200) NOT NULL,
  `type` varchar(50) DEFAULT 'Full-time',
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT current_timestamp(),
  `updated_at` timestamp DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `contact_messages`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `contact_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `job_applications`
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `job_applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `email` varchar(120) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `qualification` varchar(200) DEFAULT NULL,
  `experience` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `current_ctc` varchar(50) DEFAULT NULL,
  `expected_ctc` varchar(50) DEFAULT NULL,
  `linkedin` varchar(300) DEFAULT NULL,
  `portfolio` varchar(300) DEFAULT NULL,
  `job_title` varchar(200) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `cv` varchar(300) DEFAULT NULL,
  `created_at` timestamp DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Table structure for table `users` (For Admin Management)
-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(150) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `is_staff` tinyint(1) DEFAULT 1,
  `is_superuser` tinyint(1) DEFAULT 0,
  `created_at` timestamp DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
