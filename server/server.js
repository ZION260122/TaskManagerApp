const express = require('express');
const app = express();
require('../database/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const taskRouter = require('./routes/taskRoutes');
const morgan = require('morgan');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/task', taskRouter);

const port = 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
