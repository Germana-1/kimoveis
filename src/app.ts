import "reflect-metadata";
import "express-async-errors";
import express from "express";
import usersRouter from "./routers/users.routes";
import loginRoutes from "./routers/login.routes";
import handleError from "./errors/handleError";
import categoriesRoutes from "./routers/categories.routes";
import propertiesRoutes from "./routers/properties.routes";
import schedulesRoutes from "./routers/schedules.routes";

const app = express();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/login", loginRoutes);
app.use("/categories", categoriesRoutes);
app.use("/properties", propertiesRoutes);
app.use("/schedules", schedulesRoutes);

app.use(handleError);

export default app;
