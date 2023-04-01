import app from "./app";
import connectWithDb from './mongo';
import routeConfiguration from './routes';
import { handleRequest, handleError } from "./middlewares/index";


const port = 3000;

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Ok',
    message: `FoodFeedback server started on port ${ port }`
  });
});

app.use(handleRequest);
routeConfiguration(app);
app.use(handleError);

app.listen(port, () => {
  connectWithDb();
  console.log(`FoodFeedback server started on port ${ port }`);
});
