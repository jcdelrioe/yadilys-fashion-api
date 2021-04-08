const express = require('express');

const app = express();

const { config } = require('./config/index');

const productsApi = require('./routes/products');

const {
  logErrors,
  errorHandler,
  wrapErrors,
} = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

// body parser middleware
app.use(express.json());

//Routes
productsApi(app);

//Catch Error 404
app.use(notFoundHandler);

//Erros Middleware siempre tiene que ir al final de las rutas
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http:localhost:${config.port}`);
});
