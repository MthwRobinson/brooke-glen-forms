import logging

import click
import daiquiri
from flask.cli import FlaskGroup

from bg_forms.app import app
from bg_forms.dbops import DBOps
from bg_forms.configuration import list_environments

daiquiri.setup(level=logging.INFO)
LOGGER = daiquiri.getLogger(__name__)

cli = FlaskGroup(app)

@click.group()
def main():
    """
    Welcome to the Brooke Glen Forms CLI!
    To learn more about a command, use the --help flag
    """
    pass

@click.command('launch', help='Launches the app')
def launch():
    """ Launches the API on localhost """
    cli()

@click.command()
def initialize_database():
    environments = list_environments()
    for env in environments:
        dbops = DBOps(env)
        msg = 'Initializing database, ENV: %s, SCHEMA: %s'%(env, dbops.pg_schema)
        LOGGER.info(msg)
        dbops.initialize_database()
main.add_command(initialize_database)

if __name__ == '__main__':
    main()
