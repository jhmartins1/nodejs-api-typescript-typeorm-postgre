import "dotenv/config";
import { createConnection } from "typeorm";
import express from "express";
import { Banker } from "./entities/Banker";
import { Client } from "./entities/Client";
import { Transaction } from "./entities/Transaction";
import { clientRoute } from "./routes/clientRoute";
import { bankerRoute } from "./routes/bankerRoute";
import { transactionRoute } from "./routes/transactionRoute";
import { bankToClientRoute } from "./routes/connectBankToClient";

const app = express();
const main = async () => {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Client, Banker, Transaction],
      synchronize: true,
    });
    console.log("Conected to Postgres");

    app.use(express.json());
    app.use(clientRoute, bankerRoute, transactionRoute, bankToClientRoute);
    app.listen(7777, () => console.log("Now running on port 7777"));
  } catch (error) {
    console.error(error);
    throw new Error("Unable to connect to db");
  }
};
main();
