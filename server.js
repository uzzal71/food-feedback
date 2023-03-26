import dotenv from 'dotenv';

import app from "./app";
import connectWithDb from './mongo';
import routeConfiguration from './routes';

const port = process.env.APP_PORT || 3000;
dotenv.config();

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Ok',
    message: `${ process.env.APP_NAME } server started on port ${ port }`
  });
});

routeConfiguration(app);

app.listen(port, () => {
  connectWithDb();
  console.log(`${ process.env.APP_NAME } server started on port ${ port }`);
});