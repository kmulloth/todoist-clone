from .db import db

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(40), nullable=False)
    color = db.Column(db.String(11), nullable=False)
    type = db.Column(db.String(6), nullable=False)

    users = db.relationship('User', back_populates='projects')
    sections = db.relationship('Section', back_populates='projects')
    tasks = db.relationship('Task', back_populates='projects')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'color': self.color,
            'type': self.type
        }
