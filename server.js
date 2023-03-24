import dotenv from 'dotenv';

import app from "./app";
import routeConfiguration from './routes';

const port = process.env.APP_PORT || 3000;
dotenv.config();

routeConfiguration(app);

app.listen(port, () => {
  console.log(`${ process.env.APP_NAME } server started on port ${ port }`);
});