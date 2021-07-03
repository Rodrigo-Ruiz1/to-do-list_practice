CREATE TABLE users (
    id serial PRIMARY KEY,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(200),
    password varchar(2000)
);

CREATE TABLE list (
    id serial PRIMARY KEY,
    status boolean NOT NULL,
    list_content varchar(2000),
    user_list integer REFERENCES users(id)
);
