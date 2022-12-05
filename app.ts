import Express from "express";
import bodyParser from "body-parser";
const nunjucks = require('nunjucks');

import { initDB } from "./database/surreal";
import db from "./database/surreal";

initDB();

const app = Express();

app.set('view engine', 'html');
app.set('views', './views');

nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.get('/', async (req, res) => {
  const todos = await db.select("todo");
  res.render('index', {todos: todos});
});

app.post('/done', (req, res) => {
  console.log(req.body);

  res.redirect("/")
});

app.listen(3000, () => {
  console.log('Todo app listening on port 3000');
});