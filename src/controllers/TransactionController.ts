import { Request, Response } from "express";
import { Transaction, TransactionTypes } from "../entities/Transaction";
import { Client } from "../entities/Client";

export class TransactionController {
  async create(req: Request, res: Response) {
    const { clientId } = req.params;
    const { type, amount } = req.body;
    const client = await Client.findOne(parseInt(clientId));

    if (!client) {
      return res.json({ msg: "Client not found" });
    }
    const transaction = Transaction.create({
      amount,
      type,
      client,
    });
    await transaction.save();
    if (type === TransactionTypes.DEPOSIT) {
      client.balance = client.balance + amount;
    } else if (type === TransactionTypes.WITHDRAW) {
      client.balance = client.balance - amount;
    }
    await client.save();

    return res.json({
      msg: "Transaction added",
    });
  }
}
