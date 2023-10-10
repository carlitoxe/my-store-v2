const express = require('express');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World, this is my server in Express');
})

app.get('/new-endpoint', (req, res) => {
  res.send('Hello World, this is my new endpoint :D');
})


// app.get('/clients/:id' , (req, res)=>{
//   const { id } = req.params
//   res.json({
//     id,
//     name: 'toxe',
//   })
// } )


routerApi(app)

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('My port: ' + port);
})