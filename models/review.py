#!/usr/bin/python3
""" holds class Review"""
import models
import enum
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Float, Enum


class Rating_values(enum.Enum):
    """Declare an enum class for the item type"""
    ONE = 1.0
    ONE_P_FIVE = 1.5
    TWO = 2.0
    TWO_P_FIVE = 2.5
    THREE = 3.0
    THREE_P_FIVE = 3.5
    FOUR = 4.0
    FOUR_P_FIVE = 4.5
    FIVE = 5


class Review(BaseModel, Base):
    """Representation of a review"""
    __tablename__ = 'reviews'
    delivery_id = Column(String(60), ForeignKey('deliveries.id'), nullable=False)
    sender_id = Column(String(60), ForeignKey('senders.id'), nullable=False)
    rating = Column(Enum(Rating_values), nullable=True)
    description = Column(String(1024), nullable=True)

    def __init__(self, *args, **kwargs):
        """initializes Review"""
        super().__init__(*args, **kwargs)
