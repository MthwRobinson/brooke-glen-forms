""" Methods for pulling patient information from the database """
from copy import deepcopy
import datetime

import pandas as pd

from bg_forms.database.dbops import DBOps

class Patients(DBOps):
    """ Class for manipulating patient information """
    def __init__(self, environment='DEV'):
        super().__init__(environment)

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

    def normalize_patient(self, patient):
        """ Normalizes patient info for display in ui """
        patient = deepcopy(patient)
        patient['active'] = int(patient['active'])
        patient['name'] = patient['first_name'] + ' ' + patient['last_name']
        patient['updated_date'] = self.normalize_timestamp(patient['updated_date'])
        patient['created_date'] = self.normalize_timestamp(patient['created_date'])
        return patient
