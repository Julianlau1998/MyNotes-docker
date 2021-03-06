const fs = require('fs')
const express = require('express')


const userRoutes = (app, fs) => {
    const dataPath = './data/users.json';
  
    const readFile = (
      callback,
      returnJson = false,
      filePath = dataPath,
      encoding = 'utf8'
    ) => {
      fs.readFile(filePath, encoding, (err, data) => {
        if (err) {
          throw err;
        }
  
        callback(returnJson ? JSON.parse(data) : data);
      });
    };
  
    const writeFile = (
      fileData,
      callback,
      filePath = dataPath,
      encoding = 'utf8'
    ) => {
      fs.writeFile(filePath, fileData, encoding, err => {
        if (err) { 
          throw err;
        }
  
        callback();
      });
    };
  
    app.get('/users', (req, res) => {
      readFile(data => {
        res.send(data);
      }, true);
    });

    app.get('/users/:id', (req, res) => {
      readFile(data => {
        res.send(data[req.params.id]);
      }, true);
    });

    app.delete('/users/:id', (req, res) => {
      readFile(data => {
        const id = req.params['id'];
          delete data[id];

          writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send(`note id:${id} removed`);
          });
      }, true);
    });

    app.post('/users', (req, res) => {
        readFile(data => {
          data.push(req.body)

          writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send('new user added');
          });

        }, true);
      });
  };  
  module.exports = userRoutes;