from copy import deepcopy
import datetime

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

def test_create_patient():
    dbops = DBOps(ENV)
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
    # Make sure eastern timezone is applied correctly
    now = datetime.datetime.now(dbops.timezone)
    assert str(now)[11:13] == test_patient['created_date'][11:13]
    assert str(now)[11:13] == test_patient['updated_date'][11:13]
    for key in patient:
        assert test_patient[key] == patient[key]

    patient = deepcopy(test_patient)
    patient['first_name'] = 'FIRSTNAME'
    dbops.update_patient(patient)
    test_patient = dbops.get_patient(patient['patient_id'])
    patient = dbops.normalize_patient(patient)
    for key in patient:
        assert test_patient[key] == patient[key]
   
    dbops.delete_patient(patient['patient_id'])
    test_patient = dbops.get_patient(patient['patient_id'])
    assert test_patient == None

def test_get_patients():
    dbops = DBOps(ENV)
    patients = dbops.get_all_patients()
    now = datetime.datetime.now(dbops.timezone)
    assert type(patients) == list
    assert len(patients) > 0

def test_precaution_totals():
    dbops = DBOps(ENV)
    totals = dbops.get_precaution_totals()
    assert type(totals) == dict
    for key in totals:
        assert type(totals[key]) == int
