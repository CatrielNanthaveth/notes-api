CREATE DATABASE notes_db

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(50)
);

CREATE TABLE notes(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    description text,
	category VARCHAR(50),
	status VARCHAR(15) CHECK (status IN ('active', 'archived')),
    user_id INTEGER REFERENCES users(id)
);