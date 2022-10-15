-- migrate:up
CREATE TABLE time_windows(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    start_time TIMESTAMP NOT NULL
);

-- migrate:down

