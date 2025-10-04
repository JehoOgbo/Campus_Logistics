-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS campus_dev_db;
CREATE USER IF NOT EXISTS 'campus_dev'@'localhost' IDENTIFIED BY 'Campus_dev_pwd1*';
GRANT ALL PRIVILEGES ON `campus_dev_db`.* TO 'campus_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'campus_dev'@'localhost';
FLUSH PRIVILEGES;
