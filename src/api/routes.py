"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Favorites
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import json
from flask import session



api = Blueprint('api', __name__)

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter(User.email == email, User.password == password, User.is_active == True).first()
    
    if not user :
        return jsonify({"msg": "Bad username or password"}), 401

    else:    
        access_token = create_access_token(identity=email)
        session['user_id'] = user.id
        response_body = {"email": email,
                     "access_token": access_token,
                     "user_id": user.id} 
           
    return jsonify(response_body), 200


@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200



@api.route('/register', methods=['POST'])
def create_user():
    body = json.loads(request.data)
    user = User(email = body["email"], password= body["password"], is_active = True)
    db.session.add(user)
    db.session.commit()

    response_body = {
        "msg": " The new user has been created correctly "
    }

    return jsonify(response_body), 200

@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user is None:
        raise APIException('User not found', status_code=404)
    user.is_active = False
    db.session.commit()
    response_body = {
        "message": "User deactivated correctly"}          
    return jsonify(response_body), 200



@api.route('/favorites/<int:user_id>', methods=['GET'])
@jwt_required()
def get_favorites(user_id):
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    
    favorites = Favorites.query.filter(Favorites.user_id == user_id).all()
    if favorites:
        results = [favorite.serialize() for favorite in favorites]
        response_body = {'message': 'OK',
                         'total_records': len(results),
                         'results': results}
        return jsonify(response_body), 200
    else:
        response_body = {'message': 'No active favorites found for that ID'}
        return jsonify(response_body), 404   


@api.route('/favorites', methods=['POST'])
@jwt_required()
def add_favorite():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    
    if not user:
        return 'User not found', 404
    
    fav_name = request.json['fav_name']
    fav_id = request.json['fav_id']

    favorite = Favorites(fav_name=fav_name, fav_id=fav_id,  user_id=user.id )
    db.session.add(favorite)
    db.session.commit()

    return 'Favorite added successfully', 200


@api.route('/favorites/<int:id>', methods=['DELETE'])
def delete_favorite(id):
    favorite = Favorites.query.get_or_404(id)
    db.session.delete(favorite)
    db.session.commit()
    return jsonify({'message': 'Favorite deleted successfully'})



if __name__ == "__main__":
    app.run()
