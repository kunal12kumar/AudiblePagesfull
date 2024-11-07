import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

export default function Fileupload() {

    const [Filetitle, setFiletitle] = useState(''); //This is for the title of the pdf or file we will upload


    const [File, setFile] = useState(''); // This is for hte file we upload for audio conversion 

    // storing the formdata for extractchange

    const [saveformdata, setsaveformdata] = useState('')
    // functions to save tiltle

    // To show the audio file created

    const [audiofile, setaudiofile] = useState('');

    // to show download button if audiofile come

    const [showbutton, setshowbutton] = useState(true);

    const [Style, setStyle] = useState(false);

    const savetitle = (event) => {
        console.log(Filetitle);
        setFiletitle(event.target.value);
        console.log(Filetitle);

    }

    const savefile = async (event) => {
        if (event.target.files[0]) {
            setStyle(true);
            setFile(event.target.files[0]);
            console.log(event.target.files[0]);
            console.log(Style);
            console.log(File);
        }
    }

    const submitchange = async (event) => {
        try {
            event.preventDefault();
            const formdata = new FormData();
            formdata.append("Title", Filetitle);
            formdata.append("file", File);
            setsaveformdata(formdata)

            console.log(formdata);
            console.log(File);
            console.log(Style);
            console.log(Filetitle);

            const result = await axios.post("http://localhost:8091/api/rpdf/save", formdata);
            console.log(result);
            if (result.status === 200) {
                toast.success("Uploaded Successfully")
            }
        } catch (err) {
            console.log(err)
            toast.error("Uploading Failed");

        }



    }

    // function to send file to extract the letter

    const extractchange = async (event) => {
        try {
            event.preventDefault();
            // const formdata1 = new FormData();
            // formdata1.append("Title", Filetitle);
            // formdata1.append("File", File);
            console.log(File);
            console.log(Filetitle);
            console.log(saveformdata)
            const formdata = new FormData();
            formdata.append("Title", Filetitle);
            formdata.append("file", File);

            // console.log(formdata1);
            if (!File || !Filetitle) {
                toast.error("File or Title missing for extraction.");
                return;
            }

            const response = await axios.post("http://localhost:8091/api/rpdf/extract", formdata)
            console.log(response);

            setsaveformdata('');

            if (response.status === 200) {
                console.table(response);
                console.log(response.data.text);
                console.log(response.data.file__path)
                toast.success("Extraction Successful")
            }


            

        } catch (err) {

            console.table(err);
            toast.error("Extraction Failed");

        }


        // function to download all the audio file

        




    }


    const AudioDownloader = ({ filename }) => {
        const [isLoading, setIsLoading] = useState(false);
      
        const downloadAudio = async () => {
          setIsLoading(true);
          try {
            // Replace 'your-backend-url' with your backend's base URL
            const response = await axios.get(`http://your-backend-url/api/audio/${filename}`, {
              responseType: 'blob', // Important for binary data like audio
            });
            
            // Create a URL for the file blob and trigger download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); // or specify any filename
            document.body.appendChild(link);
            link.click();
            
            // Clean up
            link.remove();
            window.URL.revokeObjectURL(url);
          } catch (error) {
            console.error('Failed to download audio file', error);
          } finally {
            setIsLoading(false);
          }
        };
    }


    return (
        <div >

            <ToastContainer />
            <form onSubmit={submitchange} className="w-full  h-[480px] bg-[#D9D9D9] justify-center items-center flex flex-row row-span-1 gap-14">
                <div className="w-[40%] h-[80%] rounded-lg bg-[#F2F2F2]">
                    <div className='flex flex-row justify-between'>
                        <h1 className="m-4 text-2xl font-sans">Upload file</h1>
                        <h1 className="m-4 text-2xl font-sans">
                            <FontAwesomeIcon icon={faTimes} />
                        </h1>
                    </div>

                    <div>
                        <input type='text' className='flex justify-center my-7 px-8 text-center mx-auto w-[80%] h-[40px] border-[2px] rounded-lg border-dashed border-[blue]' placeholder='File Name' onChange={savetitle} name='title' value={Filetitle.title}></input>

                        {/* this is to upload the file  */}

                        <input type='file' className={`flex flex-col mx-auto items-center justify-center w-[80%] p-6 border-2 border-dashed ${setStyle ? "border-gray-700" : "border-blue-700 bg-blue-400"} rounded-lg cursor-pointer transition duration-300`} placeholder='Select File' accept='.jpg,.png,.pdf,.jpeg' onChange={savefile} name="file" value={File.file}></input>
                    </div>


                    <button className='w-[40%] text-center bg-[#F2CEAE] pt-1 font-serif h-[40px] flex justify-center rounded-lg mx-auto border-[2px] border-[#dba5a5]  m-8' >Upload</button>
                </div>


                {/* this will show the pdf we will upload */}
                <div className="w-[40%] h-[80%] rounded-lg bg-[#F2F2F2]">
                    <div className='flex flex-col justify-center items-center'>
                        <h1 className="m-4 text-2xl font-sans rounded-lg">Converted Audio file </h1>
                        <div className='m-7 w-[90%] h-[80%]'>
                            {
                                showbutton ? <div className='flex flex-col justify-center items-center gap-6'>
                                    <div className='w-[70%] mx-auto h-[60px] rounded-lg border-dashed border-[2px] border-[#2D3E73] bg-[#f0ecec] text-center p-2 '>
                                        {audiofile}
                                    </div>

                                    <button className='w-[70%] mx-auto h-[40px] rounded-lg border-dashed border-[2px] border-[#2D3E73] text-center p-2 bg-[#05F2C7]'>Download</button>
                                </div> : <h1 className='w-[70%] mx-auto h-[40px] rounded-lg border-dashed border-[2px] border-[#2D3E73] text-center p-2 bg-[#05F2C7]'>Pdf conversion is in process......</h1>

                            }

                        </div>

                    </div>
                </div>

            </form>

            {/* This button will be to furthur conversion of pdf to audiobook */}

            <form onSubmit={extractchange} className='w-full pb-9 h-[80px] mt-0 bg-[#D9D9D9] justify-center items-center flex flex-row'>
                <div className='w-[40%] h-[50px] flex justify-center items-center border-[2px] border-dotted border-red rounded-lg bg-[#0583F2]'>
                    <button>Convert the pdf to Audiobook</button>
                </div>
            </form>

        </div>


    )
}



// export function ShowAudioFile(){
//     return(
//         <div>
//             <div className='w-[70%] mx-auto h-[60px] rounded-lg border-dashed border-[2px] border-[#2D3E73] text-center p-2 '>
//                 `${audiofile}`
//             </div>

//             <button className='w-[70%] mx-auto h-[40px] rounded-lg border-dashed border-[2px] border-[#2D3E73] text-center p-2 bg-[#05F2C7]'>Download</button>
//         </div>
//     )
// }