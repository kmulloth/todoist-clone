from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class addProject(FlaskForm):

    name = StringField('Name', validators=[DataRequired()])
    color = StringField('Color', validators=[DataRequired()])
    type = StringField('Type', validators=[DataRequired()])
