#!/usr/bin/python3
"""holds class delivery"""
import enum
import models
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Enum, Boolean, Float
from sqlalchemy.orm import relationship


class ItemType(enum.Enum):
    """Declare an enum class for the item type"""
    FRAGILE = 'fragile'
    ROBUST = 'robust'
    PERISHABLE = 'perishable'


class Delivery(BaseModel, Base):
    """Representation of deliveries"""
    __tablename__ = 'deliveries'
    sender_id = Column(String(60), ForeignKey('senders.id'), nullable=False)
    t_location_id = Column(String(60), ForeignKey('locations.id'), nullable=False)
    f_location_id = Column(String(60), ForeignKey('locations.id'), nullable=False)
    weight = Column(Float, nullable=False)
    declared_items = Column(String(1024), nullable=True)
    item_type = Column(Enum(ItemType), default=ItemType.ROBUST,
                       nullable = False)
    price = Column(Float, nullable=True)
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


    def calc_price(self):
        """calculate the price of the product based on the weight and type"""
        self.price = int((self.weight / 5) * 1000)

