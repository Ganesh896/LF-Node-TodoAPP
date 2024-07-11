import config from "./config";

import express from "express";
import router from "./routes";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/logger";

const PORT = config.port;

const app = express();

// express middleware
app.use(express.json());

// logger
app.use(requestLogger);

// route
app.use(router);

// error handlers
app.use(notFoundError);
app.use(genericErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
