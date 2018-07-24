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

def test_create_patient():
    dbops = DBOps('TEST')
    patient = {
        'patient_id': 'test123',
        'first_name': 'firstname',
        'last_name': 'lastname',
        'unit': 'testunit',
        'obs_level': 'testobs',
        'precautions': ['testprecaution']
    }
    dbops.delete_patient(patient['patient_id'])

    dbops.create_patient(patient)
    test_patient = dbops.get_patient(patient['patient_id'])
    for key in patient:
        assert test_patient[key] == patient[key]

    patient['first_name'] = 'FIRSTNAME'
    dbops.update_patient(patient)
    test_patient = dbops.get_patient(patient['patient_id'])
    for key in patient:
        assert test_patient[key] == patient[key]
   
    dbops.delete_patient(patient['patient_id'])
    test_patient = dbops.get_patient(patient['patient_id'])
    assert test_patient == None
