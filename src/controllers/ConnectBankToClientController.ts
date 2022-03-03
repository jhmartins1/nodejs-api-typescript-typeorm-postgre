import { Request, Response } from "express";
import { Banker } from "../entities/Banker";
import { Client } from "../entities/Client";

export class ConnectBankToClientController {
  async connect(req: Request, res: Response) {
    const { bankerId, clientId } = req.params;
    const client = await Client.findOne(parseInt(clientId));
    const banker = await Banker.findOne(parseInt(bankerId));

    if (!banker || !client) {
      return res.json({
        msg: "Banker or Client not found",
      });
    }
    banker.clients = [client];

    await banker.save();
    return res.json({
      msg: "Banker connected to Client",
    });
  }
}
