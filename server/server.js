import router from '../router/router.js';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", router);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


export default app;






























