const express = require('express');
const app = express();
require('dotenv').config();
const logger = require('./controllers/logger');
const session = require('express-session');
const userRouter = require('./routes/userRoutes');
const connection = require('./connection');
const mongoose = require('mongoose');

// Set EJS as the view engine
app.set('view engine', 'ejs');

//connect to mongodb
connection.connectMongoDB(process.env.Database_URL)
  .then(() => logger.info("Connected to mongoDB database")) // verification statement
  .catch((error) => logger.error("Mongo Error", error));

// Set up session middleware
app.use(session({
  secret: process.env.secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Middleware to parse JSON Request Bodies
app.use(express.json());
// Midddleware to parse URL-encoded Request Bodies
app.use(express.urlencoded({ extended: false }));

// Middleware to create logs
app.use((req, res, next) => {
  logger.info(`Request from ${req.ip} at ${req.method} ${req.originalUrl}`);
  next();
});

//connect to router
app.use('/api/user', userRouter);

// Connect to the server
server = app.listen(process.env.port, () => {
  logger.info(`Server is listening on port ${process.env.port}`);
});

// //gracefull shutdown, term signals
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  app.close(() => {
    logger.info('HTTP server closed');
    mongoose.connection.close(false, () => {
      logger.info("mongoose connection is closed");
      process.exit(0);
    });
  });
});

const shutdown = () => {
  logger.info('SIGINT signal received: closing HTTP server');
  server.close(() => {
    mongoose.disconnect()
      .then(() => {
        logger.info("Mongoose connection is closed");
        logger.warn('HTTP server closed\n');
        process.exit(0);
      })
  });
}

process.on('SIGINT', shutdown);
