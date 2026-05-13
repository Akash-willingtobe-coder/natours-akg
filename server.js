const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  // console.log('Uncaught exception! Shutting down...');
  // console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB)
  .then(() => {
    // console.log(con.connection);
    // console.log('DB connection successfull!');
  })
  .catch(err => {
    console.error('DB connection error:', err);
  });

// const testTour = new Tour({
//   name: 'The Forest Hiker',
//   rating: 4.7,
//   price: 497
// });

// testTour
//   .save()
//   .then(doc => {
//     console.log(doc);
//   })
//   .catch(() => {
//     console.log('Error');
//   });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandleRejection', err => {
  console.log('Unhandled rejection! Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
