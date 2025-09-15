#!/usr/bin/python3
"""holds class City"""
import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class City(BaseModel, Base):
    """Representation of City"""
    __tablename__ = 'cities'
    state_id = Column(String(60), ForeignKey('states.id'), nullable=False)
    name = Column(String(128), nullable=False, unique=True)
    locations = relationship("Location",
                             backref="cities",
                             cascade="all, delete, delete-orphan")

    def __init__(self, *args, **kwargs):
        """initializes a city"""
        super().__init__(*args, **kwargs)
