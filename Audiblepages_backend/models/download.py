from flask import Flask, jsonify, request
import os

app = Flask(__name__)

# Define a route to handle file uploads
@app.route('/api/rpdf/saveaudio', methods=['POST'])
def upload_file(file_name):
    # Assuming 'file' is the key for the file in the FormData object
    uploaded_file = request.files.get('file')
    
    if uploaded_file:
        # Save the file to a directory (e.g., 'audiofiles')
        save_path = os.path.join('audiofiles', uploaded_file.filename)
        uploaded_file.save(save_path)

        # Send back a JSON response with the file path or any other info needed
        return jsonify({"file_path": save_path}), 200
    else:
        return jsonify({"error": "No file uploaded"}), 400

if __name__ == '__main__':
    app.run(port=8091)
