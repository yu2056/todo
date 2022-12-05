import express from "express";
import bodyParser from "body-parser";
const nunjucks = require('nunjucks');

import { initDB } from "./database/surreal";
import db from "./database/surreal";

initDB();

const app = express();

app.set('view engine', 'html');
app.set('views', './views');

app.use(express.static('./public'))

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.get('/', async (req, res) => {
  const done = (await db.query("SELECT * FROM todo WHERE isDone = true"))[0].result;
  const todo = (await db.query("SELECT * FROM todo WHERE isDone = false"))[0].result;
  res.render('index', {done: done, todos: todo});
});

app.post('/done', (req, res) => {
  console.log(req.body);

  res.redirect("/")
});

app.listen(3000, () => {
  console.log('Todo app listening on port 3000');
});