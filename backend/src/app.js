const express = require('express');
 const AuthRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');

const notesRouter = require('./routes/notes.routes');

const errorHandler = require('./middleware/errorhandler');

const morgan =require("morgan")

const cors = require('cors');

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.use(errorHandler)

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  }),
);

app.use(cookieParser())

app.use('/notesApp/auth', AuthRouter)

app.use('/notesApp/notes', notesRouter)

app.get('/',(req,res)=> {
  res.redirect("/notesApp/auth/login");
})

module.exports = app;