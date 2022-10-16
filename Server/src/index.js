const express = require('express')
	const app = express()
	const port = process.env.port || 5000;
    const path = require('path'); 
    const morgan = require('morgan')


    app.use(morgan('combined'))
	const route = require('./routes')
    route(app);

	app.listen(port, () => {
  	  console.log(`Example app listening at http://localhost:${port}`)
	})