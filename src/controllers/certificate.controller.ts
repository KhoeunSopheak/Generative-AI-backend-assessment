import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { Certificate } from "../entity/certificate.entity";
import { UserInfo } from "../entity/user.entity";

export const generateCertificate = async (req: Request, res: Response) => {
  const { userId, courseName } = req.body;

  console.log('===>',courseName);

  const certificateRepo = AppDataSource.getRepository(Certificate);

  if (!courseName || !userId) {
    return res.status(400).json({ message: "Input is required." });
  }

  try {
    const certificate = new Certificate();
    certificate.id;
    certificate.courseName = courseName;
    certificate.user = userId;
    await certificateRepo.save(certificate);

    console.log('======>',certificate);

    if(courseName){
   res.status(200).json({ certificate }); 
    }
  } catch (error) {
    console.error(error);
    res.write(`data: ${JSON.stringify({ error: "Internal server error" })}\n\n`);
    res.end();
  }
};

export const getAllCertificateUerId = async (req: Request, res: Response) => {
    const certificateRepo = AppDataSource.getRepository(Certificate);
    const userRepo = AppDataSource.getRepository(UserInfo);
    try {
        const user = await userRepo.findOne({
            where: { id: req.user?.id },
          });
          if (!user) {
            return res.status(404).json({ message: "User not found." });
          }
      const certificateUser = await certificateRepo.findOneBy(user) 
      if (!certificateUser) {
        return res.status(404).json({ message: "Certificate not found." });
      }
      if(certificateUser){
     res.status(200).json({ certificateUser }); 
      }
    } catch (error) {
      console.error(error);
      res.write(`data: ${JSON.stringify({ error: "Internal server error" })}\n\n`);
      res.end();
    }
  };


export const getCertificateId = async (req: Request, res: Response) => {
    const certificateRepo = AppDataSource.getRepository(Certificate);
    const id = req.params.id;

    console.log(id);
    try {
      const certificateId = await certificateRepo.findOne({where: {id: id}}) 
      if (!certificateId) {
        return res.status(404).json({ message: "Certificate not found." });
      }
      if(certificateId){
     res.status(200).json({ certificateId }); 
      }
    } catch (error) {
      console.error(error);
      res.write(`data: ${JSON.stringify({ error: "Internal server error" })}\n\n`);
      res.end();
    }
  };

  export const deleteCertificateId = async (req: Request, res: Response) => {
    const certificateRepo = AppDataSource.getRepository(Certificate);
    const id = req.params.id;

    console.log(id);
    try {
      const certificateId = await certificateRepo.findOne({where: {id: id}}) 
      if (!certificateId) {
        return res.status(404).json({ message: "Certificate not found." });
      }
      await certificateRepo.remove(certificateId);
      if(certificateId){
     res.status(200).json({ message: "Certificate deleted successfully" }); 
      }
    } catch (error) {
      console.error(error);
      res.write(`data: ${JSON.stringify({ error: "Internal server error" })}\n\n`);
      res.end();
    }
  };
