const fs = require('fs')
const express = require('express');
const { get } = require('http');


const noteRoutes = (app, fs) => {
    const dataPath = './data/notes.json';
  
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
  
    app.get('/notes', (req, res) => {
      readFile(data => {
        res.send(data);
      }, true);
    });

    app.get('/notes/:id', (req, res) => {
      var getResponse
      readFile(data => {
        for (let i=0; i<data.length; i++) {
          if(data[i] != null) {
            if(data[i].id == req.params.id) {
              getResponse = data[i]
            }
          }
        }
        res.send(getResponse);
      }, true);
    });

    app.put('/notes/:id', (req, res) => {
      console.log(req.params.id)
      readFile(data => {
        for (let i=0; i<data.length; i++) {
          if(data[i] != null) {
            if(data[i].id == req.params.id) {
              console.log(data[i])
              data[i].id = req.body.id
              data[i].title = req.body.title
              data[i].note = req.body.note
            }
          }
        }
    
        writeFile(JSON.stringify(data, null, 2), () => {
          res.status(200).send(`note id:${req.params.id} updated`);
        });
      }, true);
    });

    app.delete('/notes/:id', (req, res) => {
      readFile(data => {
        for (let i=0; i<data.length; i++) {
          if(data[i] != null) {
            if(data[i].id == req.params.id) {
              delete data[i]
            }
          }
        }
          writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send(`note id:${req.params.id} removed`);
          });
      }, true);
    });

    app.post('/notes', (req, res) => {
        readFile(data => {

          const { uuid } = require('uuidv4');
          const newUserId = uuid()
          
          req.body.id = newUserId
          data.push(req.body)
          console.log(req.body)
          console.log(data)
          
          writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send('new note added');
          });

        }, true);
      });
  };  
  module.exports = noteRoutes;