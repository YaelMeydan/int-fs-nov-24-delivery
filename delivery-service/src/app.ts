import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { router as itemsRouter } from "./routers/items";
import { router as ordersRouter } from "./routers/orders";
import { router as registerRouter } from "./routers/register";
import { router as loginRouter } from "./routers/login";

export const app = express();

app.use(cors());

app.use((req, _, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});
 
app.use(json());

app.use("/items", itemsRouter);
app.use("/orders", ordersRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.use(express.static("public"));
