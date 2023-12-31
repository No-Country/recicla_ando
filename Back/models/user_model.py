from config.database import Base
from sqlalchemy import Column, String, Integer, ForeignKey, DateTime, Boolean
from sqlalchemy.sql import func


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String,unique=True, nullable=False)
    country = Column(String, nullable=False)
    coins = Column(Integer, default=0)
    currency_history = Column(Integer, default=0, nullable=True)
    password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    
