const express = require('express');
const dotenv = require('dotenv');

const bodyParser = require('body-parser');

//вытаскиваем cors аналог proxy
const cors = require('cors');

//вытаскиваем passport - модуль доступа
const passport = require('passport');

//вытаскиваем маршрутизатор по пользователям
const users = require('./routes/users');

//вытаскиваем маршрутизатор по поcтам
const posts = require('./routes/posts');

//среда установки
dotenv.config();

//вытаскиваем  mongoose модуль подключения к базе данных mongodb
const mongoose = require('mongoose');
//подключаем базу данных Mongo DB
mongoose.connect(process.env.MONGODB_URI != undefined ? process.env.MONGODB_URI : "mongodb://localhost:27017" , {
  dbName: process.env.DB_NAME != undefined ? process.env.DB_NAME : "twit",
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
.then(() => {
  console.log('Mongodb connected....');
})
.catch(err => console.log(err.message));

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db...');
});

mongoose.connection.on('error', err => {
  console.log(err.message);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

//подключаем cors он позволяет осуществлять доступ из frontend к backend и обратно
app.use(cors())

//passport инициализируем
app.use(passport.initialize())
require('./config/passport')(passport)

//подключаем маршрутизатор по пользователям
app.use('/api/users',users);

//подключаем роутер по постам
app.use('/api/posts',posts);

//запускаем сервер по порту 3001
const PORT = process.env.PORT || 3020;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));