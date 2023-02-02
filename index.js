import router from './router/router.js';
import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", router);

const PORT = 8000;

app.listen(PORT, () => {
  console.info(`Server running at ${PORT}`);
})

