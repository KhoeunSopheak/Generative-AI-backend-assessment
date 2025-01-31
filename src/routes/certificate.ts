import { Router } from "express";
import protectRoute from "../middleware/auth";
import { generateCertificate, getCertificateId, deleteCertificateId, getAllCertificateUerId } from "../controllers/certificate.controller";

const router = Router();

router.post("/create", protectRoute(), generateCertificate);
router.get("/:id", protectRoute(), getCertificateId);
router.delete("/:userId", protectRoute(), getAllCertificateUerId);
router.delete("/:id", protectRoute(), deleteCertificateId);

export default router;