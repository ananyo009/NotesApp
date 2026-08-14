const express = require('express');
const AuthRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');

const notesRouter = require('./routes/notes.routes');

const errorHandler = require('./middleware/errorhandler');

const morgan = require('morgan');

const cors = require('cors');

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://notes-app-j8te.vercel.app',
  'https://notes-app-seven-lyart.vercel.app',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
].filter(Boolean);

app.use(express.json());

app.use(morgan('dev'));

app.use(errorHandler);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  }),
);

app.use(cookieParser());

app.use('/notesApp/auth', AuthRouter);

app.use('/notesApp/notes', notesRouter);

// app.get('/',(req,res)=> {
//   res.redirect("/notesApp/auth/login");
// })

module.exports = app;