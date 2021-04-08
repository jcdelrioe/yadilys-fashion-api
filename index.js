const express = require('express');

const app = express();

const { config } = require('./config/index');

const productsApi = require('./routes/products');

const { logErrors, errorHandler } = require('./utils/middleware/errorHandlers');

// body parser middleware
app.use(express.json());

productsApi(app);

//Middleware de error siempre tiene que ir al final de las rutas
app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http:localhost:${config.port}`);
});
