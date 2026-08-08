# Vercel serverless entrypoint.
# Vercel imports this file and looks for a WSGI-compatible "app" object.
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import create_app

app = create_app()
