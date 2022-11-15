// const express = require('express')
// 	const app = express()
// 	const port = process.env.port || 5000;
//     const path = require('path');
//     const morgan = require('morgan')

//     app.use(morgan('combined'))
// 	const route = require('./routes')
//     route(app);

// 	app.listen(port, () => {
//   	  console.log(`Example app listening at http://localhost:${port}`)
// 	})
const express = require("express");
const cors = require("cors");

const products = require("./products");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`));
