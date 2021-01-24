const userRoutes = require('./users');
const noteRoutes = require('./notes');
const express = require('express')

const appRouter = (app, fs) => {

  app.get('/', (req, res) => {
    res.send('welcome to the development api-server');
  });

  userRoutes(app, fs);
  noteRoutes(app, fs);
};

module.exports = appRouter;