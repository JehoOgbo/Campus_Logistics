#!/usr/bin/python3
""" holds class Review"""
import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Float


class Review(BaseModel, Base):
    """Representation of a review"""
    __tablename__ = 'reviews'
    delivery_id = Column(String(60), ForeignKey('deliveries.id'), nullable=False)
    sender_id = Column(String(60), ForeignKey('senders.id'), nullable=False)
    rating = Column(Float, nullable=False)
    description = Column(String(1024), nullable=True)

    def __init__(self, *args, **kwargs):
        """initializes Review"""
        super().__init__(*args, **kwargs)
