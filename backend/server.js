const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db');
const userRouter = require('./routes/user');
const productRouter = require('./routes/Product');

const PORT = process.env.PORT;

const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


app.use('/api/user', userRouter);
app.use('/api/products', productRouter);

app.get('/', (req, res)=> {
    res.send("Welcome to the server");
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

