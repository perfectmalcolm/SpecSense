import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Environment variables for database connection
DB_USER = os.environ.get("DB_USER")
DB_PASSWORD = os.environ.get("DB_PASSWORD")
DB_NAME = os.environ.get("DB_NAME")
CLOUD_SQL_CONNECTION_NAME = os.environ.get("CLOUD_SQL_CONNECTION_NAME")

# Construct the DATABASE_URL based on the environment
if os.environ.get("USE_LOCAL_DB"):
    # Local PostgreSQL connection
    LOCAL_DB_HOST = os.environ.get("LOCAL_DB_HOST", "localhost")
    LOCAL_DB_PORT = os.environ.get("LOCAL_DB_PORT", "5432")
    DATABASE_URL = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{LOCAL_DB_HOST}:{LOCAL_DB_PORT}/{DB_NAME}"
else:
    # Cloud SQL Public IP connection
    CLOUD_SQL_HOST = "35.194.42.145" # Public IP of your Cloud SQL instance
    CLOUD_SQL_PORT = "5432" # Default PostgreSQL port
    DATABASE_URL = f"postgresql+psycopg2://{DB_USER}:{DB_PASSWORD}@{CLOUD_SQL_HOST}:{CLOUD_SQL_PORT}/{DB_NAME}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()