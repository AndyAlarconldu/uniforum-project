from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()
#Here we get the database
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://uniforum_user:1234@107.20.72.252:5432/uniforum")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
