import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// File upload folder
const UPLOADS_FOLDER = "./uploads/";

// define the storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
  
      cb(null, fileName + fileExt);
    },
  });
  
  // preapre the final multer upload object
  global.upload = multer({
    storage: storage,
    limits: {
      fileSize: 1000000, // 1MB
    },
    fileFilter: (req, file, cb) => {
      if (file.fieldname === "avatar") {
        if (
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpg" ||
          file.mimetype === "image/jpeg"
        ) {
          cb(null, true);
        } else {
          cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
        }
      } else if (file.fieldname === "doc") {
        if (file.mimetype === "application/pdf") {
          cb(null, true);
        } else {
          cb(new Error("Only .pdf format allowed!"));
        }
      } else {
        cb(new Error("There was an unknown error!"));
      }
    },
  });

export default app;