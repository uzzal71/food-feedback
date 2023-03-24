import dotenv from 'dotenv';

import app from "./app.js";
dotenv.config();

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log(`${ process.env.APP_NAME } server started on port ${ port }`);
});