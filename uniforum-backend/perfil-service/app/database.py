from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Charge variables .env
load_dotenv()

# URL connection to PostgreSQL docker
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://uniforum_user:1234@localhost:5432/uniforum")

# Create engine
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


Base = declarative_base()
