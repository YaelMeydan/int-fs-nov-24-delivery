import express from "express";
import { json } from "body-parser";
import cors from "cors";
import { router } from "./routers/items";

export const app = express();

app.use(cors());

app.use((req, _, next) => {
    console.log(new Date(), req.method, req.url);
    next();
});
 
app.use(json());

app.use("/items", router);

app.use(express.static("public"));
