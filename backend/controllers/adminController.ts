import { Request, Response } from "express";
import { Area } from "../models/Area";
import { User } from "../models/User";
import { Draw } from "../models/Draw";
import { Ticket } from "../models/Ticket";
import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const createArea = async (req: Request, res: Response) => {
  try {
    const { city, state } = req.body;
    const area = await Area.create({ city, state });
    res.status(201).json(area);
  } catch (error) {
    res.status(400).json({ message: "Error creating area" });
  }
};

export const getAllAreas = async (req: Request, res: Response) => {
  try {
    const areas = await Area.find({});
    res.json(areas);
  } catch (error) {
    res.status(400).json({ message: "Error fetching areas" });
  }
};

export const createOperator = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, areaId } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: "operator",
      area: areaId,
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      area: user.area,
    });
  } catch (error) {
    res.status(400).json({ message: "Error creating operator" });
  }
};

export const getAllOperators = async (req: Request, res: Response) => {
  try {
    const operators = await User.find({ role: "operator" }).populate("area");
    res.json(operators);
  } catch (error) {
    res.status(400).json({ message: "Error fetching operators" });
  }
};

export const createDraw = async (req: Request, res: Response) => {
  try {
    const { areaId, drawDate, numbers } = req.body;
    const draw = await Draw.create({ area: areaId, drawDate, numbers });
    res.status(201).json(draw);
  } catch (error) {
    res.status(400).json({ message: "Error creating draw" });
  }
};

export const getAllDraws = async (req: Request, res: Response) => {
  try {
    const draws = await Draw.find({}).populate("area");
    res.json(draws);
  } catch (error) {
    res.status(400).json({ message: "Error fetching draws" });
  }
};

export const getAreaDraws = async (req: Request, res: Response) => {
  try {
    const { areaId } = req.params;
    const draws = await Draw.find({ area: areaId }).populate("area");
    res.json(draws);
  } catch (error) {
    res.status(400).json({ message: "Error fetching area draws" });
  }
};

export const purchaseTicket = async (req: Request, res: Response) => {
  try {
    const { userId, areaId, numbers, purchaseLocation } = req.body;
    const ticket = await Ticket.create({ 
      user: userId || null, 
      area: areaId, 
      numbers,
      purchaseLocation
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ message: "Error purchasing ticket" });
  }
};

export const getTicketDetails = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId)
      .populate("user", "name email")
      .populate("area", "city state")
      .populate("draw", "drawDate numbers");
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ message: "Error fetching ticket details" });
  }
};

export const generateTicketPDF = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId)
      .populate("user", "name email")
      .populate("area", "city state");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const doc = new PDFDocument({ size: [227, 600] }); // 80mm width (227 points)
    const filename = `ticket-${ticketId}.pdf`;
    const filePath = path.join(__dirname, "..", "temp", filename);

    doc.pipe(fs.createWriteStream(filePath));

    // Add content to the PDF
    doc.fontSize(12).text("Bilhete de Loteria", { align: "center" });
    doc.moveDown();
    doc.fontSize(8);
    doc.text(`ID: ${ticket._id}`);
    doc.text(`Usuário: ${ticket.user ? ` ${ticket.user?.name || "Colaborador"}` : "Colaborador"}`);
    doc.text(`Área: ${ticket.area?.city || 'Cidade'}, ${ticket.area?.state || 'estado'}`);
    doc.text(`Números: ${ticket.numbers.join(", ")}`);
    doc.text(`Data: ${ticket.purchased.toLocaleString()}`);
    doc.text(`Local: ${ticket.purchaseLocation}`);
    doc.moveDown();
    doc.text("Código de Associação:");
    doc.text(ticket.associationCode, { width: 200, align: "center" });
    doc.moveDown();

    // Add QR Code
    const qrCodeSize = 100;
    doc.image(ticket.qrCode, {
      fit: [qrCodeSize, qrCodeSize],
      align: "center",
    });

    doc.end();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    fs.createReadStream(filePath).pipe(res);

    // Delete the file after sending
    fs.unlinkSync(filePath);

  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Error generating PDF" });
  }
};

