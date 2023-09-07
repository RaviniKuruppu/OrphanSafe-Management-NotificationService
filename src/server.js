import express from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import { runMigrations } from "./migrations/index.js";
import { RPCObserver } from "./lib/rabbitmq/index.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import { PORT, AUTH_SERVICE_RPC } from "./config/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// runMigrations()

// RPCObserver
RPCObserver(AUTH_SERVICE_RPC);

// routes
app.use("/api/users", userRoutes);
app.get("/api", (req, res) => res.status(200).json("service is listening"));

//error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`service is listening on port ${PORT}`));
