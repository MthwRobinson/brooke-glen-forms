import pandas as pd

from bg_forms.dbops import DBOps

def test_initialize():
    dbops = DBOps('TEST')
    dbops.initialize_database()
    try:
        sql = "SELECT * FROM %s.patients"%(dbops.pg_schema)
        df = pd.read_sql(sql, dbops.connection)
        table_exists = True
    except:
        table_exists = False
    assert table_exists

