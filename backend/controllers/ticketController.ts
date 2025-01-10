import { Request, Response } from "express";
import { Ticket } from "../models/Ticket";
import { Draw } from "../models/Draw";

export const verifyTicket = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId)
      .populate("user", "name email")
      .populate("area", "city state")
      .populate("draw", "drawDate numbers");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    let isWinner = false;
    let matchedNumbers: number[] = [];

    if (ticket.draw) {
      matchedNumbers = ticket.numbers.filter(number => ticket.draw.numbers.includes(number));
      isWinner = matchedNumbers.length > 0;
    }

    res.json({
      ticket,
      isWinner,
      matchedNumbers,
    });
  } catch (error) {
    res.status(400).json({ message: "Error verifying ticket" });
  }
};

export const validateWinningTicket = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId).populate("draw", "numbers");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    if (!ticket.draw) {
      return res.status(400).json({ message: "Draw not yet completed for this ticket" });
    }

    const matchedNumbers = ticket.numbers.filter(number => ticket.draw.numbers.includes(number));
    const isWinner = matchedNumbers.length > 0;

    res.json({
      isWinner,
      matchedNumbers,
    });
  } catch (error) {
    res.status(400).json({ message: "Error validating winning ticket" });
  }
};

