#!/usr/bin/python3
""" objects that handle all API actions for sign in """
from models.sender import Sender
from models import storage
from api.v1.views import app_views
from flask import jsonify, request
from flasgger.utils import swag_from
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


def senders_search(data=""):
    """
    Retrieves a user object with a certain username
    """
    if not data or not len(data): 
        return None

    all_senders = storage.all(Sender).values()
    for senders in all_senders:
        if senders.email == data:
            return senders
    return None


@app_views.route('/login', methods=["POST"], strict_slashes=False)
def login_user():
    """
    Log in an existing user and return a JWT access token.
    Expects JSON data with 'email' and 'password'.
    """
    data = request.get_json()
    email = data.get("email", None)
    password = data.get("password", None)

    user = senders_search(email)

    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid email or password"}), 401

    # Create the access token for the logged-in user
    access_token = create_access_token(identity=user.name)
    return jsonify(access_token=access_token), 200


@app_views.route("/dashboard", methods=["GET"])
@jwt_required()
def user_dashboard():
    """
    A protected route that requires a valid JWT access Token.
    Returns a personalized welcome message for the user
    """
    current_user_id = get_jwt_identity()
    return jsonify(message=f"Welcome, {current_user_id}! You have successfully accessed a protected resource."), 200
