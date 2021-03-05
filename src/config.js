module.exports = {
    PORT: process.env.PORT || 8080,
    NODE_ENV: process.env.NODE_ENV || "development",
    DATABASE_URL:
        process.env.DATABASE_URL || "postgresql://dunder_mifflin@localhost/noteful",
};


// https://stormy-falls-62742.herokuapp.com/
// Created postgresql-vertical-93085 as DATABASE_URL