#!/usr/bin/python3
""" holds class State"""
import models
from models.base_model import BaseModel, Base
from models.city import City
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class State(BaseModel, Base):
    """Representation of state"""
    __tablename__ = 'states'
    name = Column(String(128), nullable=False, unique=True)
    cities = relationship("City",
                          backref="state",
                          cascade="all, delete, delete-orphan")

    def __init__(self, *args, **kwargs):
        """initializes state"""
        super().__init__(*args, **kwargs)
