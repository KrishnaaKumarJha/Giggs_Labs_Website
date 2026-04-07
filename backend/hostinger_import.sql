-- Giggs Labs Data Migration Script
SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
SET time_zone = '+00:00';

-- Data for posts
-- Data for services
-- Data for job_openings
-- Data for contact_messages
INSERT INTO contact_messages (`id`, `name`, `email`, `message`, `created_at`) VALUES (1, 'Krishna Kumar Jha', 'krishnakrsindia@gmail.com', 'testing the contact page', '2026-02-26 08:47:12.950073');
INSERT INTO contact_messages (`id`, `name`, `email`, `message`, `created_at`) VALUES (2, 'Krishna Kumar Jha', 'krishnakrsindia@gmail.com', 'testing', '2026-02-27 08:04:12.908879');

-- Data for job_applications
INSERT INTO job_applications (`id`, `name`, `email`, `message`, `cv`, `created_at`, `address`, `age`, `current_ctc`, `expected_ctc`, `experience`, `job_title`, `linkedin`, `phone`, `portfolio`, `qualification`) VALUES (1, 'KRISHNA KUMAR JHA', 'krishnakrsindia@gmail.com', '', 'cvs/Resume_Krishna.pdf', '2026-02-26 08:53:45.116612', 'I-150 , ALPHA 2 , GREATER NOIDA', 22, '6', '16', '1', 'Full Stack Developer', 'https://linkedin.com/in/krishna-kumarJha', '+91-8287897987', '', 'Greater Noida, Uttar Pradesh');
INSERT INTO job_applications (`id`, `name`, `email`, `message`, `cv`, `created_at`, `address`, `age`, `current_ctc`, `expected_ctc`, `experience`, `job_title`, `linkedin`, `phone`, `portfolio`, `qualification`) VALUES (2, 'Krishna Kumar Jha', 'krishnakrsindia@gmail.com', '', 'cvs/Resume_Krishna_CZPxm4t.pdf', '2026-02-27 08:02:29.960074', 'I-150 , ALPHA 2 , GREATER NOIDA', 21, '4lpa', '10lpa', '1 years', 'React Developer', '', '08287897987', '', 'Graduation');
INSERT INTO job_applications (`id`, `name`, `email`, `message`, `cv`, `created_at`, `address`, `age`, `current_ctc`, `expected_ctc`, `experience`, `job_title`, `linkedin`, `phone`, `portfolio`, `qualification`) VALUES (3, 'KRISHNA KUMAR JHA', 'krishnakrsindia@gmail.com', '', 'cvs/Resume_Krishna_2arBsDW.pdf', '2026-02-27 08:07:51.433183', 'I-150 , ALPHA 2 , GREATER NOIDA', 21, '1', '1', '1', 'React Developer', 'https://linkedin.com/in/krishna-kumarJha', '+91-8287897987', '', 'grad');

