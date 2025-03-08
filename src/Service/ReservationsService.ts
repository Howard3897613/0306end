import { Service } from "../abstract/Service";
import { Request, Response } from "express";
import { DB } from "../app"; // 假設你有一個全局的 DB 連接物件

export class ReservationsService extends Service {
    async create(req: Request, res: Response): Promise<void> {
        const { name, date } = req.body;
        const sql = "INSERT INTO Reservations (name, date) VALUES (?, ?)";
        await DB.connection?.query(sql, [name, date]);
        res.status(201).send("Reservation created");
    }

    async read(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const sql = "SELECT * FROM Reservations WHERE id = ?";
        const [rows] = await DB.connection?.query(sql, [id]);
        res.status(200).json(rows);
    }

    async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { name, date } = req.body;
        const sql = "UPDATE Reservations SET name = ?, date = ? WHERE id = ?";
        await DB.connection?.query(sql, [name, date, id]);
        res.status(200).send("Reservation updated");
    }

    async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const sql = "DELETE FROM Reservations WHERE id = ?";
        await DB.connection?.query(sql, [id]);
        res.status(200).send("Reservation deleted");
    }
}