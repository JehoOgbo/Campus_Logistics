#!/usr/bin/python3
""" holds class Location"""
import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship


class Location(BaseModel, Base):
    """Representation of locations"""
    __tablename__ = 'locations'
    city_id = Column(String(60), ForeignKey('cities.id'), nullable=False)
    name = Column(String(128), nullable=False, unique=True)
    deliveries_from = relationship("Delivery",
                                   foreign_keys="Delivery.f_location_id",
                                   back_populates="start")
    deliveries_to = relationship("Delivery",
                                 foreign_keys="Delivery.t_location_id",
                                 back_populates="stop")

    def __init__(self, *args, **kwargs):
        """initializes a location"""
        super().__init__(*args, **kwargs)
