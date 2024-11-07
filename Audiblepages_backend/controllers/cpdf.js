import { saveuserpdf } from "../models/mpdf.js";
import { saveaudiofile } from "../models/maudio.js";
import {spawn} from 'child_process';
import fs from 'fs';



// function to upload the pdf and save in to the database
export const save=async (req,res)=>{

    try{
        console.log(req.body);
        console.log(req.file);
        const Title=req.body.Title;
        const File=req.file.filename;

        console.log(Title);
        console.log(File)

        const entry = await saveuserpdf.create({
            Title:Title,
            File:File
        })
        return res.status(200).json({ message: "File saved successfully",entry, success: "true" });




    }catch(err){
        return res.status(400).json({message: "File not saved ",err ,success:"false"});

    }
}

export const extract = (req, res) => {
    const pdfPath = req.file.path;
    const pythonProcess = spawn("python", ["models/extract.py", pdfPath]);
    // here model/extract.py is the path where you store the python file to do extraction

    let extractedText = "";

    pythonProcess.stdout.on("data", (data) => {
        extractedText += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Python error: ${data}`);
    });

    pythonProcess.on("close", (code) => {
        fs.unlinkSync(pdfPath); // Ensure deletion occurs after processing
        if (code === 0) {
            res.json({ text: extractedText });
        } else {
            res.status(500).json({ error: "Error processing PDF file" });
        }
    });
};




export const saveaudiofileindatabase=async(req,res)=>{

    try{
        const Filename=req.file.filename
        const path=req.file.path;
        console.log(Filename);
        console.log(req.file);
        console.log(path);
        const entry = await saveaudiofile.create({
            Audio: Filename
        })
        return res.status(200).json({ message: "File saved successfully",entry, success: "true" ,path:path });


    }catch(err){
        return res.status(400).json({message: "File saved unsuccessfully",err, success:"true"});

    }
}