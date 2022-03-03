import { Router } from "express";
import { TransactionController } from "../controllers/TransactionController";

const transactionRoute = Router();
const transactionController = new TransactionController();

transactionRoute.post(
  "/api/client/:clientId/transaction",
  transactionController.create
);

export { transactionRoute };
