  DROP TABLE IF EXISTS news;
  CREATE TABLE IF NOT EXISTS news(
  id SERIAL PRIMARY KEY,
  source VARCHAR(255),
  author VARCHAR(255),
  title VARCHAR(255),
  description text,
  url VARCHAR(255),
  image VARCHAR(255),
  publishedat VARCHAR(255),
  comment VARCHAR(255)
);