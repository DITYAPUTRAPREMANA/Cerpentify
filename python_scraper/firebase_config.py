import firebase_admin
from firebase_admin import credentials, firestore
import os
import json

def initialize_firebase():
    """Initialize Firebase Admin SDK"""
    # Try multiple possible paths
    possible_paths = [
        './firebase-credentials.json',
        './cerpentify/python_scraper/firebase-credentials.json',
        'firebase-credentials.json'
    ]
    
    credential_path = None
    
    # Find the correct path
    for path in possible_paths:
        if os.path.exists(path):
            credential_path = path
            break
    
    if not credential_path:
        raise FileNotFoundError(f"Firebase credentials file not found in any of these locations: {possible_paths}")
    
    print(f"Using credentials file: {credential_path}")
    
    # Check if credentials file is valid JSON
    try:
        with open(credential_path, 'r') as f:
            json_data = json.load(f)
        
        # Validate required fields
        required_fields = ['type', 'project_id', 'private_key_id', 'private_key', 'client_email']
        for field in required_fields:
            if field not in json_data:
                raise ValueError(f"Missing required field '{field}' in credentials file")
                
    except json.JSONDecodeError as e:
        raise ValueError(f"Invalid JSON in credentials file: {e}")
    
    # Initialize Firebase
    cred = credentials.Certificate(credential_path)
    
    # Check if already initialized
    if not firebase_admin._apps:
        firebase_admin.initialize_app(cred)
    
    # Return Firestore client
    return firestore.client()

# Initialize Firebase
try:
    db = initialize_firebase()
    print("Firebase initialized successfully!")
except Exception as e:
    print(f"Error initializing Firebase: {e}")
    print("Please check your firebase-credentials.json file")
    db = None