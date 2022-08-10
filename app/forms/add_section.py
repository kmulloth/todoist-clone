from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class addSection(FlaskForm):

    name = StringField('Name', validators=[DataRequired()])
    project_id = StringField('Project ID', validators=[DataRequired()])
    submit = SubmitField('Add Section')
