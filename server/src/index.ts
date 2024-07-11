
import config from "./config";
import express from "express";
import router from "./routes";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/logger";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";

 // server port
const PORT = config.port;

const app = express();

// limiter to limit requests
const limiter = rateLimiter({
    windowMs: 60 * 1000,
    limit: 10,
    message: "Too many requests",
});

// aiddleware to set various HTTP headers for security
app.use(helmet());

app.use(limiter);

// array of allowed origins for CORS
const allowedOrigins = ["https://www.google.com"];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, origin); // allow requests from allowed origins
            } else {
                callback(new Error("Not allowed")); // alock requests from other origins
            }
        },
    })
);

// middleware to parse incoming JSON requests
app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(notFoundError);

app.use(genericErrorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`); 
});
