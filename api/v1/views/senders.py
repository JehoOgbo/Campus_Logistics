#!/usr/bin/python3
""" objects that handle all default RestFul API actions for Senders """
from models.sender import Sender
from models import storage
from api.v1.views import app_views
from flask import abort, jsonify, make_response, request
from flasgger.utils import swag_from
from werkzeug.security import generate_password_hash
from flask_jwt_extended import jwt_required


@app_views.route('/senders', methods=['GET'], strict_slashes=False)
@swag_from('documentation/sender/all_senders.yml')
@jwt_required()
def get_senders():
    """
    Retrieves the list of all sender objects
    or a specific sender
    """
    all_senders = storage.all(Sender).values()
    list_senders = []
    for senders in all_senders:
        list_senders.append(senders.to_dict())
    return jsonify(list_senders)


@app_views.route('/senders/<sender_id>', methods=['GET'], strict_slashes=False)
@swag_from('documentation/sender/get_sender.yml', methods=['GET'])
@jwt_required()
def get_sender(sender_id):
    """ Retrieves an sender """
    sender = storage.get(Sender, sender_id)
    if not sender:
        abort(404)

    return jsonify(sender.to_dict())


@app_views.route('/senders/<sender_id>', methods=['DELETE'],
                 strict_slashes=False)
@swag_from('documentation/sender/delete_sender.yml', methods=['DELETE'])
@jwt_required()
def delete_sender(sender_id):
    """
    Deletes a sender Object
    """

    sender = storage.get(Sender, sender_id)

    if not sender:
        abort(404)

    storage.delete(sender)
    storage.save()

    return make_response(jsonify({}), 200)


@app_views.route('/senders', methods=['POST'], strict_slashes=False)
@swag_from('documentation/sender/post_sender.yml', methods=['POST'])
def post_sender():
    """
    Creates a sender
    """
    if not request.get_json():
        abort(400, description="Not a JSON")

    if 'name' not in request.get_json():
        abort(400, description="Missing name")
    if 'email' not in request.get_json():
        abort(400, description="Missing email")
    if 'password' not in request.get_json():
        abort(400, description="Missing password")

    data = request.get_json()
    data['password'] = generate_password_hash(data['password'])
    instance = Sender(**data)
    value = instance.save()
    if value == 0:
        return make_response(jsonify(instance.to_dict()), 201)
    else:
        abort(409)


@app_views.route('/senders/<sender_id>', methods=['PUT'], strict_slashes=False)
@swag_from('documentation/sender/put_sender.yml', methods=['PUT'])
@jwt_required()
def put_sender(sender_id):
    """
    Updates a sender
    """
    sender = storage.get(Sender, sender_id)

    if not sender:
        abort(404)

    if not request.get_json():
        abort(400, description="Not a JSON")

    ignore = ['id', 'email', 'created_at', 'updated_at']

    data = request.get_json()
    for key, value in data.items():
        if value == '':
            continue
        if key not in ignore:
            if key == 'password':
                key = generate_password_hash(key)
            setattr(sender, key, value)
    value = storage.save()
    if value == 0:
        return make_response(jsonify(sender.to_dict()), 200)
    else:
        abort(409)

#def upload_image(sender_id):
#    """
#    Adds image to a sender
#    """
#    sender = storage.get(Sender, sender_id)
#
#    if not sender:
#        abort(404)
#
#    if 'image' not in request.files:
#        abort(400, description="Not a File")
#
#    file = request.files['image']
#
#    #if file.name == '':
#        #abort(400, description="No file found")
#
#    if file and allowed_file(file.filename):
#        filename = secure_filename(file.filename)
#
#        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#        file.save(file_path)

#        setattr(sender, "image_path", file_path)
#        setattr(sender, "saved_filename", filename)
#
#        return make_response(jsonify(sender.to_dict()), 200)
#
#    abort(400, description="Invalid file type")


@app_views.route('/senders/upload/<sender_id>/<filename>', methods=['PUT'], strict_slashes=False)
def upload(sender_id, filename):
    secure_name = secure_filename(filename)
    full_filepath = os.path.join(app.config['UPLOAD_FOLDER'], secure_name)

    try:
        with open(full_filepath, 'wb') as f:
            f.write(request.get_data())

        return make_response(jsonify("success"), 200)
    except Exception as e:
        abort(400)
