import express from "express";
import bodyParser from "body-parser";

const app = express();

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serving static files
app.use(express.static('public'));

export default app;