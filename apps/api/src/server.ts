import express, { Request, Response, NextFunction } from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import authorRoutes from "./routes/Author";
import todoRoutes from "./routes/Todo";

const app = express();

/** Connect to Mongo */
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Mongo connected successfully.");
    StartServer();
  })
  .catch((error) => Logging.error(error));

/** Start Server */
const StartServer = () => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    /** Log the request */
    Logging.info(
      `Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      /** Log the response */
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  /** Rules of our API */
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  app.use("/api/authors", authorRoutes);
  app.use("/api/todos", todoRoutes);

  /** Healthcheck */
  app.get("/ping", (req: Request, res: Response) =>
    res.status(200).json({ hello: "world" })
  );

  /** Error handling */
  app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error("Not found") as any; // Cast to any to access 'status'
    error.status = 404;
    next(error);
  });

  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    Logging.error(error);

    res.status(error.status || 500).json({
      message: error.message,
    });
  });

  /** Start HTTP server */
  http.createServer(app).listen(config.server.port, () => {
    Logging.info(`Server is running on port ${config.server.port}`);
  });
};
