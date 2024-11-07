# we are using amazon polly to convert text into the voice 
# boto3 is the AWS SDK (Software Development Kit) for Python. It enables you to interact programmatically with AWS services like Amazon Polly, S3, EC2, and many others directly from your Python code.

import boto3
from datetime import datetime
import os
import requests
from dotenv import load_dotenv
# this is to merge all segment of audio
# from pydub import AudioSegment
# Accessing the AWS credentials
# aws_access_key_id = os.getenv('AWS_ACCESS_KEY_ID')
# aws_secret_access_key = os.getenv('AWS_SECRET_ACCESS_KEY')

load_dotenv()



def generate_voice(text, voice_id='Aditi', output_format='mp3', folder_path='Audio_Files'):
    # Initialize a session using Amazon Polly
    polly = boto3.Session(
        # Replace with your secret key
        region_name='ap-south-1'  # Change the region as needed
    ).client('polly')

     # Function to chunk text
    def chunk_text(text, max_length=1500):
        words = text.split()
        chunks = []
        current_chunk = []

        for word in words:
            # If adding this word exceeds the max length, save the current chunk
            if len(' '.join(current_chunk + [word])) > max_length:
                chunks.append(' '.join(current_chunk))
                current_chunk = [word]  # Start a new chunk
            else:
                current_chunk.append(word)
        
        # Add the last chunk if there's any remaining text
        if current_chunk:
            chunks.append(' '.join(current_chunk))

        return chunks

    # Chunk the text to ensure it fits within Polly's limits
    text_chunks = chunk_text(text)

    for i, chunk in enumerate(text_chunks):
        # SSML with customization for each chunk
        ssml_text = f"""
        <speak>
            <prosody rate="medium" pitch="-1st">
                {chunk}
            </prosody>
        </speak>
        """

        response = polly.synthesize_speech(
            Text=ssml_text,
            OutputFormat='mp3',
            VoiceId='Aditi',  # You can change this to any other voice ID
            TextType='ssml'
        )

        # Save each chunk to a separate audio file
        if 'AudioStream' in response:
    # Generate a timestamped filename
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            file_name = f"{folder_path}/Audio_{timestamp}_{i + 1}.mp3"  # Adjust the filename format as needed
            
            # Create folder if it doesn't exist
            if not os.path.exists(folder_path):
                os.makedirs(folder_path)
            
            with open(file_name, 'wb') as audio_file:
                audio_file.write(response['AudioStream'].read())
    
            print(f'Custom audio content written to file "{file_name}".')
        else:
            print("Could not retrieve audio stream for chunk:", i + 1)
            
        if file_name:
            server_url = "http://localhost:8091/api/rpdf/saveaudio"  # Replace with your server's upload endpoint
            upload_audio_to_server(file_name, server_url)




# def combine_audio_files(file_names, output_file):
#     combined = AudioSegment.empty()
#     for file_name in file_names:
#         combined += AudioSegment.from_mp3(file_name)
#     combined.export(output_file, format="mp3")

# # After generating all parts, combine them:
# file_names = ["output_part1.mp3", "output_part2.mp3", ...]  # Add all chunked file names here
# combine_audio_files(file_names, "final_output.mp3")



# Define function to send audio file to server
def upload_audio_to_server(file_name, server_url):
    # Open file in binary mode
    with open(file_name, 'rb') as audio_file:
        files = {'file_name': audio_file}
        response = requests.post(server_url, files=files)

    if response.status_code == 200:
        print("File uploaded successfully.")
    else:
        print(f"Failed to upload file. Status code: {response.status_code}")
        
        
        
# If audio file was generated successfully, upload it to server