import config from "./config";

import express from "express";
import router from "./routes";

const PORT = config.port;

const app = express();

// express middleware
app.use(express.json());

// route
app.use(router);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
