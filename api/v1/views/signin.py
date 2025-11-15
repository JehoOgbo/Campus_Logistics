#!/usr/bin/python3
""" objects that handle all API actions for sign in """
from models.sender import Sender, UserType
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
    if (user.user_type != UserType.REGULAR):
        return jsonify({"message": "Invalid email or password"}), 401

    # Create the access token for the logged-in user
    iden = user.to_dict()
    iden['user_type'] = 'user'
    access_token = create_access_token(identity=iden)
    return jsonify(access_token=access_token), 200

@app_views.route('/admin/login', methods=["POST"], strict_slashes=False)
def login_admin():
    """
    Log in an existing admin and return a JWT access token.
    Expects JSON data with 'email' and 'password'.
    """
    data = request.get_json()
    email = data.get("email", None)
    password = data.get("password", None)

    user = senders_search(email)

    if not user or not check_password_hash(user.password, password):
        return jsonify({"message": "Invalid email or password"}), 401
    if (user.user_type != UserType.ADMIN):
        return jsonify({"message": "Invalid email or password"}), 401

    # Create the access token for the logged-in user
    iden = user.to_dict() | user.to_dictionary()
    access_token = create_access_token(identity=iden)
    return jsonify(access_token=access_token), 200



@app_views.route("/dashboard", methods=["GET"])
@jwt_required()
def user_dashboard():
    """
    A protected route that requires a valid JWT access Token.
    Returns a personalized welcome message for the user
    """
    current_user = get_jwt_identity()
    current_user_name = current_user['name']
    return jsonify({
        "name": current_user_name,
        "all": current_user
    }), 200
