"""empty message

Revision ID: 008cc6daf058
Revises: ff5e10b999b7
Create Date: 2022-08-04 13:24:05.835092

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '008cc6daf058'
down_revision = 'ff5e10b999b7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tasks', sa.Column('userId', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'tasks', 'users', ['userId'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tasks', type_='foreignkey')
    op.drop_column('tasks', 'userId')
    # ### end Alembic commands ###
