import { Router } from "express";
import { ClientController } from "../controllers/ClientController";

const clientRoute = Router();
const clientController = new ClientController();

clientRoute.post("/api/client", clientController.create);
clientRoute.get("/api/clients", clientController.getAll);
clientRoute.delete("/api/client/:clientId", clientController.delete);

export { clientRoute };
