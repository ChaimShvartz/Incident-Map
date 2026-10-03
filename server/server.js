import { createServer } from "http";
import express from "express";
import cors from "cors";
import { router as usersRouter } from "./routes/user.routes.js";
import { router as incidentsRouter } from "./routes/incidents.routes.js";
import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { auth } from "./middlewares/auth.js";

const { PORT } = process.env;
const app = express();
const server = createServer(app);

app.use(cors(), express.json(), logger);
app.use("/auth", usersRouter);
app.use("/incidents", auth, incidentsRouter);
app.use(notFound, errorHandler);

server.listen(PORT, (error) => {
    if (error) console.error(error.message);
    console.log(`http://localhost:${PORT}`);
});
