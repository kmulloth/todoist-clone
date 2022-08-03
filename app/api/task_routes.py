from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Task, Section, Project
from app.forms.add_task import addTask

task_routes = Blueprint('task_routes', __name__)

@task_routes.route('/', methods=['GET'])
@login_required
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks])

@task_routes.route('/<int:task_id>', methods=['GET'])
@login_required
def get_task(task_id):
    task = Task.query.get(task_id)
    return jsonify(task.to_dict())

@task_routes.route('/', methods=['POST'])
@login_required
def create_task():
    form = addTask()
    task = Task(
        name=form.data['name'],
        description=form.data['description'],
        complete=form.data['complete'],
        section_id=form.data['section_id'],
        project_id=form.data['project_id'],
        due=form.data['due'],
        priority=form.data['priority']
    )
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict())
