import { Router } from "express";
import { BankerController } from "../controllers/BankerController";

const bankerRoute = Router();
const bankerController = new BankerController();

bankerRoute.post("/api/banker", bankerController.create);

export { bankerRoute };
