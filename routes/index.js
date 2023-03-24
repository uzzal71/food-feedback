import routes from "./routes";

const routeConfiguration = (app) => {
    app.use('/api/v1', routes);
};

export default routeConfiguration;