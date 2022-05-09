"""game table

Revision ID: d88fb96df13d
Revises: aaa2dcf39fb9
Create Date: 2022-05-09 17:26:18.529081

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd88fb96df13d'
down_revision = 'aaa2dcf39fb9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Score',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('points', sa.String(length=64), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Score')
    # ### end Alembic commands ###
