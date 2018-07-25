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

    def create_patient(self, patient):
        """ Inserts patient info into the database """
        patient = deepcopy(patient)
        if 'patient_id' not in patient:
            patient['patient_id'] = uuid.uuid4().hex
        patient['updated_date'] = datetime.datetime.now(self.timezone)
        patient['created_date'] = datetime.datetime.now(self.timezone)
        patient['active'] = True
        values = (
            patient['patient_id'],
            patient['first_name'],
            patient['last_name'],
            patient['unit'],
            patient['obs_level'],
            patient['precautions'],
            patient['active'],
            patient['updated_date'],
            patient['created_date']
        )
        sql = """
            INSERT INTO {schema}.patients
            (patient_id, first_name, last_name, unit,
            obs_level, precautions, active, updated_date, created_date)
            VALUES 
            (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """.format(schema=self.pg_schema)
        with self.connection.cursor() as cursor:
            cursor.execute(sql, values)
        self.connection.commit()

    def delete_patient(self, patient_id):
        """ Deletes a patient from the database """
        sql = """
            DELETE FROM {schema}.patients
            WHERE patient_id = '{patient_id}'
        """.format(schema=self.pg_schema, patient_id=patient_id)
        with self.connection.cursor() as cursor:
            cursor.execute(sql)
        self.connection.commit()

    def update_patient(self, patient):
        """ Updates a patient in the database """
        patient['updated_date'] = datetime.datetime.now(self.timezone)
        sql = """
            UPDATE {schema}.patients
            SET first_name = '{first_name}',
                last_name = '{last_name}',
                unit = '{unit}',
                obs_level = '{obs_level}',
                precautions = {precautions},
                active = {active},
                updated_date = '{updated_date}'
            WHERE patient_id = '{patient_id}'
        """.format(
            schema=self.pg_schema,
            first_name=patient['first_name'],
            last_name=patient['last_name'],
            unit=patient['unit'],
            obs_level=patient['obs_level'],
            precautions=self.format_array(patient['precautions']),
            active=str(bool(patient['active'])).lower(),
            updated_date=patient['updated_date'],
            patient_id=patient['patient_id']
        )
        with self.connection.cursor() as cursor:
            cursor.execute(sql)
        self.connection.commit()

    def get_patient(self, patient_id):
        """ Fetches a patient from the database """
        sql = """
            SELECT * FROM {schema}.patients
            WHERE patient_id = '{patient_id}'
        """.format(schema=self.pg_schema, patient_id=patient_id)
        df = pd.read_sql(sql, self.connection)
        if len(df) > 0:
            patient = dict(df.loc[0])
            patient = self.normalize_patient(patient)
            return patient
        else:
            return None

    def get_all_patients(self):
        """ Fetches all active patients """
        sql = """
            SELECT * FROM {schema}.patients
            WHERE active = true
        """.format(schema=self.pg_schema)
        df = pd.read_sql(sql, self.connection)
        patients = [dict(df.loc[i]) for i in df.index]
        patients = [self.normalize_patient(x) for x in patients]
        return patients

    def get_precaution_totals(self):
        """ Aggregates a count for each precaution """
        patients = self.get_all_patients()
        precautions = [x['precautions'] for x in patients]
        totals = {}
        for list_ in precautions:
            for precaution in list_:
                if precaution not in totals:
                    totals[precaution] = 1
                else:
                    totals[precaution] += 1
        return totals

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
        filename = self.path + '/data/dummy_patients.json'
        with open(filename, 'r') as f:
            patients = json.load(f)
        for patient in patients:
            patient['first_name'] = patient['name'].split(' ')[0]
            patient['last_name'] = patient['name'].split(' ')[1]
            patient['active'] = True
            self.create_patient(patient)



