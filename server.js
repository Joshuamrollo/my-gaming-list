const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
require('dotenv').config();
const path = require('path');
import cors from 'cors';

const app = express();

app.use(express.json());

const db = config.get('mongoURI');

app.use(cors());

mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use('/api/games', require('./routes/api/games'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 3001;

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(port, () => console.log(`server started on port ${port}`));