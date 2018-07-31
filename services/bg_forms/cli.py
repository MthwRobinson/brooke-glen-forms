import logging

import click
import daiquiri

from bg_forms.database.dbops import DBOps
from bg_forms.configuration import list_environments

daiquiri.setup(level=logging.INFO)
LOGGER = daiquiri.getLogger(__name__)

@click.group()
def main():
    """
    Welcome to the Brooke Glen Forms CLI!
    To learn more about a command, use the --help flag
    """
    pass

@click.command()
@click.option('--environment', help='The environment to initialize')
def initialize_database(environment):
    dbops = DBOps(environment)
    msg = 'Initializing database, ENV: %s, SCHEMA: %s'%(
        environment, 
        dbops.pg_schema
    )
    LOGGER.info(msg)
    dbops.initialize_database()
main.add_command(initialize_database)

if __name__ == '__main__':
    main()
