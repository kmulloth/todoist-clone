from .db import db

class Section(db.Model):
    __tablename__ = 'sections'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)

    project = db.relationship('Project', back_populates='sections')
    tasks = db.relationship('Task', back_populates='section')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'project_id': self.project_id
        }
