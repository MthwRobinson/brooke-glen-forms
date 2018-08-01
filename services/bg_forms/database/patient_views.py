""" Class for pulling and retrieving patient views """
import datetime
import uuid

import pandas as pd

from bg_forms.database.dbops import DBOps

class PatientViews(DBOps):
    """ Class for posted and retrieving patient views """
    def __init__(self, environment='DEV'):
        super().__init__(environment)

    def post_view(self, user_id, patient_id, view_id=None):
        """ Posts a patient view to the database """
        if not view_id:
            view_id = uuid.uuid4().hex
        time_viewed = datetime.datetime.now(self.timezone)
        values = (view_id, user_id, patient_id, time_viewed)
        sql = """
            INSERT INTO {schema}.patient_views
            (view_id, user_id, patient_id, time_viewed)
            VALUES
            (%s, %s, %s, %s)
        """.format(schema=self.pg_schema)
        with self.connection.cursor() as cursor:
            cursor.execute(sql, values)
        self.connection.commit()

    def delete_views(self, user_id):
        """ Deletes a view from the database """
        sql = """
            DELETE FROM {schema}.patient_views
            WHERE user_id = '{user_id}'
        """.format(schema=self.pg_schema, user_id=user_id)
        with self.connection.cursor() as cursor:
            cursor.execute(sql)
        self.connection.commit()

    def get_recently_viewed(self, user_id, limit=8):
        """ Pulls a user's most recently viewed patients """
        sql = """
            SELECT
                b.patient_id,
                first_name,
                last_name,
                unit,
                obs_level,
                precautions,
                active,
                updated_date,
                created_date,
                time_viewed
            FROM (
                SELECT 
                    user_id,
                    patient_id,
                    max(time_viewed) as time_viewed
                FROM {schema}.patient_views
                WHERE user_id = '{user_id}'
                GROUP BY user_id, patient_id
            ) a
            INNER JOIN {schema}.patients b
            ON a.patient_id = b.patient_id
            ORDER BY time_viewed desc
            LIMIT {limit}
        """.format(schema=self.pg_schema, user_id=user_id, limit=limit)
        df = pd.read_sql(sql, self.connection)
        patients = [dict(df.loc[i]) for i in df.index]
        patients = [self.normalize_patient(x) for x in patients]
        return patients
