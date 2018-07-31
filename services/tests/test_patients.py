from copy import deepcopy
import datetime

from bg_forms.database.patients import Patients

ENV = 'LOCAL'

def test_create_patient():
    patient_info = Patients(ENV)
    patient = {
        'patient_id': 'test123',
        'first_name': 'firstname',
        'last_name': 'lastname',
        'unit': 'testunit',
        'obs_level': 'testobs',
        'precautions': ['testprecaution']
    }
    patient_info.delete_patient(patient['patient_id'])

    patient_info.create_patient(patient)
    test_patient = patient_info.get_patient(patient['patient_id'])
    # Make sure eastern timezone is applied correctly
    now = datetime.datetime.now(patient_info.timezone)
    assert str(now)[11:13] == test_patient['created_date'][11:13]
    assert str(now)[11:13] == test_patient['updated_date'][11:13]
    for key in patient:
        assert test_patient[key] == patient[key]

    patient = deepcopy(test_patient)
    patient['first_name'] = 'FIRSTNAME'
    patient_info.update_patient(patient)
    test_patient = patient_info.get_patient(patient['patient_id'])
    patient = patient_info.normalize_patient(patient)
    for key in patient:
        assert test_patient[key] == patient[key]
   
    patient_info.delete_patient(patient['patient_id'])
    test_patient = patient_info.get_patient(patient['patient_id'])
    assert test_patient == None

def test_get_patients():
    patient_info = Patients(ENV)
    patients = patient_info.get_all_patients()
    now = datetime.datetime.now(patient_info.timezone)
    assert type(patients) == list
    assert len(patients) > 0
