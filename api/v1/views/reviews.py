#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Reviews """
from models.review import Review
from models.delivery import Delivery
from models.sender import Sender
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from flask_jwt_extended import jwt_required, get_jwt_identity


@app_views.route('/deliverys/<delivery_id>/reviews', methods=['GET'],
                 strict_slashes=False)
@swag_from('documentation/reviews/get_reviews.yml', methods=['GET'])
@jwt_required()
def get_reviews(delivery_id):
    """
    Retrieves the list of all Review objects of a Delivery
    """
    delivery = storage.get(Delivery, delivery_id)

    if not delivery:
        abort(404)

    reviews = [review.to_dict() for review in delivery.reviews]

    return jsonify(reviews)


@app_views.route('/reviews/<review_id>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/reviews/get_review.yml', methods=['GET'])
@jwt_required()
def get_review(review_id):
    """
    Retrieves a Review object
    """
    review = storage.get(Review, review_id)
    if not review:
        abort(404)

    return jsonify(review.to_dict())


@app_views.route('/reviews/<review_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/reviews/delete_reviews.yml', methods=['DELETE'])
@jwt_required()
def delete_review(review_id):
    """
    Deletes a Review Object
    """

    review = storage.get(Review, review_id)

    if not review:
        abort(404)

    storage.delete(review)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/deliverys/<delivery_id>/reviews', methods=['POST'],
                 strict_slashes=False)
@swag_from('documentation/reviews/post_reviews.yml', methods=['POST'])
@jwt_required()
def post_review(delivery_id):
    """
    Creates a Review
    """
    delivery = storage.get(Delivery, delivery_id)

    if not delivery:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'sender_id' not in request.get_json():
        abort(400, description="Missing sender_id")
    if 'rating_id' not in request.get_json():
        abort(400, description="Missing rating")

    data = request.get_json()
    sender = storage.get(Sender, data['sender_id'])

    if not sender:
        abort(404)

    if 'text' not in request.get_json():
        abort(400, description="Missing text")

    data['delivery_id'] = delivery_id
    instance = Review(**data)
    instance.save()
    return make_response(jsonify(instance.to_dict()), 201)


@app_views.route('/reviews/<review_id>', methods=['PUT'], strict_slashes=False)
@swag_from('documentation/reviews/put_reviews.yml', methods=['PUT'])
@jwt_required()
def put_review(review_id):
    """
    Updates a Review
    """
    review = storage.get(Review, review_id)

    if not review:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'sender_id', 'delivery_id', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if key not in ignore:
            setattr(review, key, value)
    storage.save()
    return make_response(jsonify(review.to_dict()), 200)
