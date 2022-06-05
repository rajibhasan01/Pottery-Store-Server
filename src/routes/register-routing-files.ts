import express from "express";
import productRoute from "./product/route.product";
import loginRoute from "./login/route.login";
import homeRouter from "./route.home";

const registeredRouters = express.Router();

registeredRouters.use("/", homeRouter);
registeredRouters.use("/products/", productRoute);
registeredRouters.use("/login/", loginRoute);


export = registeredRouters ;


