import dotenv from 'dotenv';

import app from "./app";
import connectWithDb from './mongo';
import routeConfiguration from './routes';
import { handleRequest, handleError } from "./middlewares/index";

const port = process.env.APP_PORT || 3000;
dotenv.config();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Ok',
    message: `${ process.env.APP_NAME } server started on port ${ port }`
  });
});

app.use(handleRequest);
routeConfiguration(app);
app.use(handleError);

app.listen(port, () => {
  connectWithDb();
  console.log(`${ process.env.APP_NAME } server started on port ${ port }`);
});
