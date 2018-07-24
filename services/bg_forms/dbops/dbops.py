""" Connects to the postgres database
and performs operatoins on tables """
import logging
import os

import daiquiri
import pandas as pd
import psycopg2

from bg_forms.configuration import get_config
import bg_forms.configuration as conf

class DBOps(object):
    """ Manage database operations """
    def __init__(self, environment='DEV'):
        daiquiri.setup(level=logging.INFO)
        self.logger = daiquiri.getLogger(__name__)

        self.path = os.path.dirname(os.path.realpath(__file__))
        self.sql_path = self.path + '/../../../database'

        self.env = environment
        self.pg_schema = get_config('PG_SCHEMA', self.env)
        self.connection = self.connect()
        
    def connect(self):
        """ Connects to the postgres database """
        pg_user = get_config('PG_USER', self.env)
        pg_pass = get_config('PG_PASS', self.env)
        pg_host = get_config('PG_HOST', self.env)
        pg_port = get_config('PG_PORT', self.env)
        pg_db = get_config('PG_DATABASE', self.env)
        connection = psycopg2.connect(
            user=pg_user,
            password=pg_pass,
            host=pg_host,
            port=pg_port,
            dbname=pg_db
        )
        return connection

    def initialize_tables(self):
        """ 
        Builds table in the database using the table
        definitions in the database/tables folder
        """
        path = self.sql_path + '/tables/'
        files = os.listdir(path)
        for file_ in files:
            if file_.endswith('.sql'):
                filename = path + file_
                with open(filename, 'r') as f:
                    sql = f.read().format(schema=self.pg_schema)
                with self.connection.cursor() as cursor:
                    cursor.execute(sql)
                self.connection.commit()
