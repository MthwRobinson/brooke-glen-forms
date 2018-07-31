import pandas as pd

from bg_forms.database.dbops import DBOps

ENV = 'LOCAL'

def test_initialize():
    dbops = DBOps(ENV)
    dbops.initialize_database()
    try:
        sql = "SELECT * FROM %s.patients"%(dbops.pg_schema)
        df = pd.read_sql(sql, dbops.connection)
        table_exists = True
    except:
        table_exists = False
    assert table_exists
