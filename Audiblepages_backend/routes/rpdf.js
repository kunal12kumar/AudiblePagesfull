import express from 'express';
import multer from 'multer';
import { save, extract, saveaudiofileindatabase } from "../controllers/cpdf.js";

const router1 = express.Router();

// Configure Multer storage with a date-specific filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define your uploads directory
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    cb(null, `${file.originalname}`);
}

});


// creating diff path for the audio files

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define your uploads directory
  },
  filename: (req, file, cb) => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    cb(null, `${formattedDate}-${file.originalname}`);
}

});



// Set up the upload middleware
const upload = multer({ storage: storage }).single('file'); // Ensure the field name matches the frontend

// Routes using the upload middleware
router1.post('/save', upload, save);
router1.post('/extract',upload, extract);
router1.post('/saveaudio', multer({ storage: storage1 }).single('file_name'), saveaudiofileindatabase);

export default router1;
