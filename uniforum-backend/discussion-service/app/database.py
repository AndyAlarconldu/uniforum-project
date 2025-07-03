from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
from dotenv import load_dotenv

load_dotenv()
#Here we get the database
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://uniforum_user:uniforum123@172.31.4.157:5432/uniforum")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
