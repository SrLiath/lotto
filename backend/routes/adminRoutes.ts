import express from "express";
import { createArea, getAllAreas, createOperator, getAllOperators, createDraw, getAllDraws, purchaseTicket, getAreaDraws, getTicketDetails, generateTicketPDF } from "../controllers/adminController";
import { protect, admin } from "../middleware/authMiddleware";
import { validateWinningTicket, verifyTicket } from "../controllers/ticketController";

export const adminRouter = express.Router();

adminRouter.use(protect, admin);

adminRouter.post("/areas", createArea);
adminRouter.get("/areas", getAllAreas);
adminRouter.post("/operators", createOperator);
adminRouter.get("/operators", getAllOperators);
adminRouter.post("/draws", createDraw);
adminRouter.get("/draws", getAllDraws);
adminRouter.get("/areas/:areaId/draws", getAreaDraws);
adminRouter.post("/tickets", purchaseTicket);
adminRouter.get("/tickets/:ticketId", getTicketDetails);
adminRouter.get("/tickets/:ticketId/pdf", generateTicketPDF);
adminRouter.get("/tickets/:ticketId/verify", verifyTicket);
adminRouter.post("/tickets/:ticketId/validate", validateWinningTicket);

