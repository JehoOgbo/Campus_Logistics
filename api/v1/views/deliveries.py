#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Locations """
from models.state import State
from models.city import City
from models.location import Location
from models.sender import Sender, UserType
from models.delivery import Delivery
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from flask_jwt_extended import jwt_required, get_jwt_identity


@app_views.route('/deliveries', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_all_deliveries():
    """
    Retrieves the list of all delveries in the database
    """
    current_user = get_jwt_identity()
    if current_user['user_type'] != 'admin':
        return jsonify({"message": "Access denied"}), 403
    all_deliveries = storage.all(Delivery).values()
    list_deliveries = []
    for delivery in all_deliveries:
        list_deliveries.append(delivery.to_dict())
    return jsonify(list_deliveries)

@app_views.route('/locations/<location_id>/deliveries/to', methods=['GET'],
                 strict_slashes=False)
@jwt_required()
# @swag_from('documentation/location/get_locations.yml', methods=['GET'])
def get_deliveries_to(location_id):
    """
    Retrieves the list of all deliveries to a location
    """
    current_user = get_jwt_identity()
    if current_user['user_type'] != 'admin':
        return jsonify({"message": "Access denied"}), 403
    location = storage.get(Location, location_id)

    if not location:
        abort(404)

    deliveries = [delivery.to_dict() for delivery in location.deliveries_to]

    return jsonify(deliveries)


@app_views.route('/locations/<location_id>/deliveries/from', methods=['GET'],
                 strict_slashes=False)
@jwt_required()
# @swag_from('documentation/location/get_locations.yml', methods=['GET'])
def get_deliveries_from(location_id):
    """
    Retrieves the list of all deliveries to a location
    """
    current_user = get_jwt_identity()
    if current_user['user_type'] != 'admin':
        return jsonify({"message": "Access denied"}), 403
    location = storage.get(Location, location_id)

    if not location:
        abort(404)

    deliveries = [delivery.to_dict() for delivery in location.deliveries_from]

    return jsonify(deliveries)


@app_views.route('/deliveries/<delivery_id>', methods=['GET'], strict_slashes=False)
@jwt_required()
# @swag_from('documentation/delivery/get_delivery.yml', methods=['GET'])
def get_delivery(delivery_id):
    """
    Retrieves a Delivery object
    """
    delivery = storage.get(Delivery, delivery_id)
    if not delivery:
        abort(404)

    return jsonify(delivery.to_dict())


@app_views.route('/deliveries/<delivery_id>', methods=['DELETE'],
                 strict_slashes=False)
@jwt_required()
# @swag_from('documentation/delivery/delete_delivery.yml', methods=['DELETE'])
def delete_delivery(delivery_id):
    """
    Deletes a Delivery Object
    """

    delivery = storage.get(Delivery, delivery_id)

    if not delivery:
        abort(404)

    storage.delete(delivery)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/locations/<location_id>/deliveries', methods=['POST'],
                 strict_slashes=False)
@jwt_required()
# @swag_from('documentation/delivery/post_location.yml', methods=['POST'])
def post_delivery(location_id):
    """
    Creates a delivery
    """
    location = storage.get(Location, location_id)

    if not location:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'sender_id' not in request.get_json():
        abort(400, description="Missing sender_id")

    if 't_location_id' not in request.get_json():
        abort(400, description="Missing destination")

    data = request.get_json()
    sender = storage.get(Sender, data['sender_id'])
    t_location_id = storage.get(Location, data['f_location_id'])

    if not sender:
        abort(404)

    if not t_location_id:
        abort(404)

    if 'weight' not in request.get_json():
        abort(400, description="Missing weight")
    elif 'receiver_name' not in request.get_json():
        abort(400, description="Missing receiver name")
    elif 'receiver_phone' not in request.get_json():
        abort(400, description="Missing receiver phone")

    data["t_location_id"] = location_id
    instance = Delivery(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/deliveries/<delivery_id>', methods=['PUT'], strict_slashes=False)
@jwt_required()
# @swag_from('documentation/delivery/put_location.yml', methods=['PUT'])
def put_delivery(delivery_id):
    """
    Updates a Delivery
    """
    delivery = storage.get(Delivery, delivery_id)

    if not delivery:
        abort(404)

    data = request.get_json()
    if not data:
        abort(400, description="Not a JSON")

    ignore = ['id', 'sender_id', 'f_location_id', 'created_at', 'updated_at']

    for key, value in data.items():
        if key not in ignore:
            setattr(delivery, key, value)
    storage.save()
    return make_response(jsonify(delivery.to_dict()), 200)
