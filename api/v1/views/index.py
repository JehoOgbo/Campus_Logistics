#!/usr/bin/python3
""" Index """
from api.v1.views import app_views
from flask import jsonify
from models import storage
from flask_jwt_extended import jwt_required


@app_views.route('/status', methods=['GET'], strict_slashes=False)
def status():
    """ Status of API """
    return jsonify({"status": "OK"})

@app_views.route('/stats', methods=['GET'], strict_slashes=False)
@jwt_required()
def number_objects():
    """ Retrieves the number of each objects by type """
    classes = ["State", "Location", "Delivery", "Review", "City", "Sender"]
    objects = ["states", "locations", "deliveries", "reviews", "cities", "senders"]

    num_objs = {}
    for i in range(len(classes)):
        num_objs[objects[i]] = storage.count(classes[i])

    return jsonify(num_objs)
