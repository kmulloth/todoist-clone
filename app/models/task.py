from .db import db

class Task(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    complete = db.Column(db.Boolean, nullable=False, default=False)
    section_id = db.Column(db.Integer, db.ForeignKey('sections.id'), nullable=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=True)
    due = db.Column(db.String(50), nullable=True)
    priority = db.Column(db.Integer, nullable=True)

    user = db.relationship('User', back_populates='tasks')
    project = db.relationship('Project', back_populates='tasks')
    section = db.relationship('Section', back_populates='tasks')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'name': self.name,
            'description': self.description,
            'complete': self.complete,
            'section_id': self.section_id,
            'project_id': self.project_id,
            'due': self.due,
            'priority': self.priority
        }
