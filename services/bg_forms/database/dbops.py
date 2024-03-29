""" Connects to the postgres database
and performs operatoins on tables """
from copy import deepcopy
import datetime
import json
import logging
import os

import daiquiri
import pandas as pd
from pandas._libs.tslibs.timestamps import Timestamp
import psycopg2
import pytz
import uuid

from bg_forms.configuration import get_config
import bg_forms.configuration as conf

class DBOps(object):
    """ Manage database operations """
    def __init__(self, environment='DEV'):
        daiquiri.setup(level=logging.INFO)
        self.logger = daiquiri.getLogger(__name__)

        self.path = os.path.dirname(os.path.realpath(__file__))

        self.env = environment
        self.pg_schema = get_config('PG_SCHEMA', self.env)
        self.timezone = get_config('TIMEZONE', self.env)
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

    def initialize_database(self):
        """ 
        Builds table in the database using the table
        definitions in the database/tables folder
        """
        sql = "CREATE SCHEMA IF NOT EXISTS %s"%(self.pg_schema)
        with self.connection.cursor() as cursor:
            cursor.execute(sql)
        self.connection.commit()

        path = self.path + '/sql/'
        files = os.listdir(path)
        for file_ in files:
            if file_.endswith('.sql'):
                filename = path + file_
                with open(filename, 'r') as f:
                    sql = f.read().format(schema=self.pg_schema)
                with self.connection.cursor() as cursor:
                    cursor.execute(sql)
                self.connection.commit()

    def format_array(self, array):
        """ Formats a Python array for insertion into postgres """
        pg_array = str(array).replace("'",'"')
        pg_array = pg_array.replace('[','{')
        pg_array = pg_array.replace(']','}')
        pg_array = "'" + pg_array + "'"
        return pg_array

    def normalize_patient(self, patient):
        """ Normalizes patient info for display in ui """
        patient = deepcopy(patient)
        patient['active'] = int(patient['active'])
        patient['name'] = patient['first_name'] + ' ' + patient['last_name']
        patient['updated_date'] = self.normalize_timestamp(patient['updated_date'])
        patient['created_date'] = self.normalize_timestamp(patient['created_date'])
        return patient

    def normalize_timestamp(self, timestamp):
        """ Adds a timezone and formats the timestamp as a string """
        if isinstance(timestamp, Timestamp):
            timestamp = timestamp.to_pydatetime()
            timestamp = timestamp.astimezone(self.timezone)
        timestamp = str(timestamp)[:16]
        return timestamp

    def load_data(self):
        """ Loads dummy data into the database """
        filename = self.path + '/../data/dummy_patients.json'
        with open(filename, 'r') as f:
            patients = json.load(f)
        for patient in patients:
            patient['first_name'] = patient['name'].split(' ')[0]
            patient['last_name'] = patient['name'].split(' ')[1]
            patient['active'] = True
            self.create_patient(patient)
