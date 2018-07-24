from flask.cli import FlaskGroup

from bg_forms.app import app
from bg_forms.dbops import DBOps

cli = FlaskGroup(app)

@cli.command()
def initialize_tables():
    dbops = DBOps()
    dbops.initialize_tables()

if __name__ == '__main__':
    cli()
