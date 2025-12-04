from authlib.integrations.starlette_client import OAuth
from fastapi import Request
import os

oauth = OAuth()

# Load client IDs and secrets from environment variables
oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={"scope": "openid email profile"},
    redirect_uri=os.getenv("GOOGLE_REDIRECT_URI")
)

