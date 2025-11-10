#!/usr/bin/python3
"""holds class sender"""
import models
import enum
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Enum
from sqlalchemy.orm import relationship


class UserType(enum.Enum):
    """Declare an enum class for the item type"""
    REGULAR = 'regular'
    ADMIN = 'admin'


class Sender(BaseModel, Base):
    """Representation of the Sender"""
    __tablename__ = 'senders'
    name = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False, unique=True)
    password = Column(String(1024), nullable=False)
    user_type = Column(Enum(UserType), default=UserType.REGULAR,
                       nullable=False)
    phone_number = Column(String(128), nullable=True)
    image_path = Column(String(1024), nullable=True)
    # store a path to the image in image_path
    deliveries = relationship("Delivery",
                              backref="sender",
                              cascade="all, delete, delete-orphan")
    reviews = relationship("Review", backref="sender")

    def __init__(self, *args, **kwargs):
        """initializes a sender"""
        super().__init__(*args, **kwargs)

    #def __setattr__(self, name, value):
        #"""sets a password with md5 encryption"""
        #if name == "password":
            #value = md5(value.encode()).hexdigest()
        #super().__setattr__(name, value)
