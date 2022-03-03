import { Router } from "express";
import { ConnectBankToClientController } from "../controllers/ConnectBankToClientController";

const bankToClientRoute = Router();
const bankToClientController = new ConnectBankToClientController();

bankToClientRoute.put(
  "/api/banker/:bankerId/client/:clientId",
  bankToClientController.connect
);

export { bankToClientRoute };
