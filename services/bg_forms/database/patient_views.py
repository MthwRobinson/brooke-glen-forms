""" Class for pulling and retrieving patient views """
import datetime
import uuid

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


