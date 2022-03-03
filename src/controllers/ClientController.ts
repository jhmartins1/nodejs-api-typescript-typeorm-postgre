import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import { Client } from "../entities/Client";

export class ClientController {
  async create(req: Request, res: Response) {
    const { firstName, lastName, email, cardNumber, balance } = req.body;
    const client = Client.create({
      first_name: firstName,
      last_name: lastName,
      email,
      card_number: cardNumber,
      balance,
    });
    await client.save();
    return res.json(client);
  }
  async delete(req: Request, res: Response) {
    const { clientId } = req.params;
    const clientExists = await Client.findOne(parseInt(clientId));
    if (!clientExists) {
      return res.status(404).json({ msg: "Client not found" });
    }
    await Client.delete(parseInt(clientId));
    return res.json({ msg: "Client Deleted!" });
  }
  async getAll(req: Request, res: Response) {
    const client = await createQueryBuilder("client")
      .select("client.first_name")
      .addSelect("client.email")
      .addSelect("client.balance")
      .from(Client, "client")
      .leftJoinAndSelect("client.transactions", "transactions")
      .getMany();
    return res.json(client);
  }
}
