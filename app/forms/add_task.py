from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, SubmitField, TextAreaField
from wtforms.validators import DataRequired


class addTask(FlaskForm):

    name = StringField('Name', validators=[DataRequired()])
    description = TextAreaField('Description')
    complete = BooleanField('Complete')
    section_id = IntegerField('Section ID')
    project_id = IntegerField('Project ID')
    due = StringField('Due Date')
    priority = IntegerField('Priority')
    submit = SubmitField('Add Task')
