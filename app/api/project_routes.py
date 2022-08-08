from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, Project
from app.forms.add_project import addProject

project_routes = Blueprint('project_routes', __name__)

@project_routes.route('/', methods=['GET'])
@login_required
def get_projects():
    projects = Project.query.all()
    return jsonify([project.to_dict() for project in projects])

@project_routes.route('/<int:project_id>/', methods=['GET'])
@login_required
def get_project(project_id):
    project = Project.query.get(project_id)
    return jsonify(project.to_dict())

@project_routes.route('/', methods=['POST'])
@login_required
def create_project():
    form = addProject()
    project = Project(
        user_id=current_user.id,
        name=form.data['name'],
        color=form.data['color'],
        type=form.data['type']
    )
    db.session.add(project)
    db.session.commit()
    return project.to_dict()

@project_routes.route('/<int:project_id>/', methods=['PUT'])
@login_required
def update_project(project_id):
    project = Project.query.get(project_id)
    form = addProject()
    project.name = form.data['name']
    project.color = form.data['color']
    project.type = form.data['type']
    db.session.commit()
    return project.to_dict()

@project_routes.route('/<int:project_id>/', methods=['DELETE'])
@login_required
def delete_project(project_id):
    project = Project.query.get(project_id)
    db.session.delete(project)
    db.session.commit()
    return jsonify(project.to_dict())
