""" Connects to the postgres database
and performs operatoins on tables """
import logging
import os

import daiquiri
import pandas as pd
import psycopg2

import bg_forms.configuration as conf

class DBOps(object):
    """ Manage database operations """
    def __init__(self, environment='DEV'):
        daiquiri.setup(level=LOGGING.INFO)
        self.logger = daiquiri.getLogger(__name__)

        self.path = os.path.dirname(os.path.realpath(__file__))
        self.sql_path = self.path + '/../../../database'
        self.conn = self.connect()
        
    def connect():
        """ Connects to the postgres database """
        pg_user = os.getenv('POSTGRES_USER')
        pg_pass = os.getenv('POSTGRES_PASSWORD')
        pg_host= os.getenv('POSTGRES_HOST')
        pg_port = int(os.getenv('POSTGRES_PORT'))
        pg_db = conf.configs[environment]['PG_DATABASE']
        connection = psycopg2.connect(
            user=pg_user,
            password=pg_pass,
            host=pg_host,
            port=pg_port,
            dbname=pg_db
        )
        return connection

    def initialize_tables():
        """ 
        Builds table in the database using the table
        definitions in the database/tables folder
        """
        path = self.sql_path + 'tables/'
        files = os.listdir(path)
        for f in files:
            if f.endswith('.sql'):
                filename = path + f
                with open(filename, 'r'):
                    sql = f.read()
                with self.connection.cursor() as cursor:
                    cursor.execute(sql)
                self.connection.commit()
