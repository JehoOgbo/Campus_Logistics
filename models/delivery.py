#!/usr/bin/python3
"""holds class delivery"""
from models.enum import ItemType
import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Enum, Boolean, Float
from sqlalchemy.orm import relationship


class Delivery(BaseModel, Base):
    """Representation of deliveries"""
    __tablename__ = 'deliveries'
    sender_id = Column(String(60), ForeignKey('senders.id'), nullable=False)
    t_location_id = Column(String(60), ForeignKey('locations.id'), nullable=False)
    f_location_id = Column(String(60), ForeignKey('locations.id'), nullable=False)
    weight = Column(Float, nullable=False)
    declared_items = Column(String(1024), nullable=True)
    item_type = Column(Enum(ItemType), default=ItemType.ROBUST,
                       nullable=False)
    price = Column(Float, nullable=False)
    receiver_name = Column(String(128), nullable=False)
    receiver_email = Column(String(128), nullable=False)
    receiver_phone = Column(String(128), nullable=False)
    paid = Column(Boolean, default=False, nullable=False)
    delivered = Column(Boolean, default=False, nullable=False)
    reviews = relationship("Review",
                           backref="delivery",
                           cascade="all, delete, delete-orphan")
    start = relationship('Location',
                         foreign_keys=[f_location_id],
                         back_populates="deliveries_from")
    stop = relationship('Location',
                        foreign_keys=[t_location_id],
                        back_populates="deliveries_to")

    def __init__(self, *args, **kwargs):
        """initializes Delivery"""
        super().__init__(*args, **kwargs)

    def __setattr__(self, name, value):
        """sets the price based on the weight of the shipment"""
        if name == "weight":
            price = int((self.weight / 5) * 1000)
            super().__setattr__("price", value)
        super().__setattr__(name, value)
