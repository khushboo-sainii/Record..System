from backend.app.database import Base, engine
from backend.app import models


print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created!")
