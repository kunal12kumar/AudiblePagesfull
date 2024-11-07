import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

export default function Uploadsection() {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadTrack, setUploadTrack] = useState(0);

    // const onFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         setUploadedFile(file);
    //         console.log("Selected file:", file);
    //     }
    // };

    const handleChange = async (event) => {

        const file = event.target.files[0];
        if (file) {
            setUploadedFile(file);
            console.log("Selected file:", file);
        }


        if (!uploadedFile) return;

        const formData = new FormData();
        formData.append("file", uploadedFile);

        try {
            await axios.post("http://localhost:8000/api/rpdf/upload", formData, {
                onUploadProgress: (progressEvent) => {
                    const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadTrack(percentage);
                },
            });
            toast.success("File uploaded successfully");
            setUploadTrack(0);
        } catch (error) {
            toast.error("File upload failed");
            console.error(error);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            setUploadedFile(file);
            console.log("Dropped file:", file);
        }
    };

    const handleClick = () => {
        document.getElementById("fileInput").click();
    };

    return (
        <div className="w-full h-[500px] bg-[#D9D9D9] justify-center items-center flex flex-row row-auto">

            <ToastContainer />
            <div className="w-[40%] h-[80%] rounded-lg bg-[#F2F2F2]">
                <div className='flex flex-row justify-between'>
                    <h1 className="m-4 text-2xl font-sans">Upload file</h1>
                    <h1 className="m-4 text-2xl font-sans">
                        <FontAwesomeIcon icon={faTimes} />
                    </h1>
                </div>
                <form onSubmit={handleChange} method="post" encType="multipart/form-data">
                    <div className='flex justify-center flex-col gap-4 items-center'>
                        <div
                            className={`flex flex-col items-center justify-center w-80 p-6 border-2 rounded-lg cursor-pointer transition duration-300 ${isDragging ? "border-blue-500 bg-blue-50" : " border-gray-300 bg-white"
                                } border-dashed rounded-lg p-6 w-80 text-center cursor-pointer transition duration-300`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={handleClick}
                        >
                            <input
                                id="fileInput"
                                onChange={handleChange}
                                type="file"
                                name="file"
                                accept=".pdf,.jpeg,.jpg,.png"
                                required
                                className="hidden"
                            />
                            <div className="mb-4">
                                <FontAwesomeIcon icon={faUpload} />
                            </div>
                            <p className="text-gray-500">
                                {isDragging ? "Drop the file here!" : "Drag and drop a file here or click to upload"}
                            </p>
                            {uploadedFile && (
                                <p className="mt-2 text-sm text-gray-700">
                                    Uploaded File: <span className="font-semibold">{uploadedFile.name}</span>
                                </p>
                            )}
                        </div>
                        <div>
                            <button onClick={handleChange} disabled={!uploadedFile}>
                                Upload
                            </button>
                            {uploadTrack > 0 && (
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full"
                                        style={{ width: `${uploadTrack}%` }}
                                    >
                                        {uploadTrack}%
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}