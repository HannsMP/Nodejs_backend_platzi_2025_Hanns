const express = require('express');
const cors = require('cors')
const routerApi = require('./routes/index');

const {
  logErrors,
  errorHandler,
  boomErrorHandler
} = require('./middlewares/error.handler');


const app = express();
const port = 3000;

app.use(express.json());

const whiteList = new Set([
  'http://localhost:8080',
  'http://127.0.0.1:5500'
])

app.use(cors({
  origin: (origin, callback) => {
    if (whiteList.has(origin))
      return callback(null, true)
    
    callback(new Error('No permitido'))
  }
}));

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, e => {
  if (e) return console.log(e);
  console.log(`mi port http://localhost:${port}`);
})