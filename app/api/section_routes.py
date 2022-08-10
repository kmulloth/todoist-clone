from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import db, Project, Task, Section, section
from app.forms.add_section import addSection

section_routes = Blueprint('section_routes', __name__)

@section_routes.route('/', methods=['GET'])
@login_required
def get_sections():
    sections = Section.query.all()
    return jsonify([section.to_dict() for section in sections])

@section_routes.route('/<int:section_id>/', methods=['GET'])
@login_required
def get_section(section_id):
    section = Section.query.get(section_id)
    return jsonify(section.to_dict())

@section_routes.route('/', methods=['POST'])
@login_required
def create_section():
    form = addSection()
    section = Section(
        name=form.data['name'],
        project_id=form.data['project_id']
    )
    db.session.add(section)
    db.session.commit()
    return section.to_dict()

@section_routes.route('/<int:section_id>/', methods=['PUT'])
@login_required
def update_section(section_id):
    section = Section.query.get(section_id)
    form = addSection()
    section.name = form.data['name']
    section.project_id = form.data['project_id']
    db.session.commit()
    return section.to_dict()

@section_routes.route('/<int:section_id>/', methods=['DELETE'])
@login_required
def delete_section(section_id):
    section = Section.query.get(section_id)
    db.session.delete(section)
    db.session.commit()
    return jsonify(section.to_dict())
