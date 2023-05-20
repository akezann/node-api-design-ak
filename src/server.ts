import  express from 'express'

const app = express();

app.get('/', (req, res) => {
  console.log("hello world!");
  res.status(200);

});

export default app
