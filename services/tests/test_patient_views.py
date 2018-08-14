from bg_forms.database.patient_views import PatientViews
from bg_forms.database.patients import Patients

ENV = 'LOCAL'

def test_post_view():
    patient_views = PatientViews(ENV)
    patient_views.delete_views(user_id='unit_test_user')
    for i in range(10):
        patient_info = Patients(ENV)
        patient_id = 'test_patient_'+str(i)
        patient = {
            'patient_id': patient_id,
            'first_name': 'firstname',
            'last_name': 'lastname',
            'unit': 'testunit',
            'obs_level': 'testobs',
            'precautions': ['testprecaution']
        }
        patient_info.delete_patient(patient_id, remove=True)
        patient_info.create_patient(patient)
        patient_views.post_view(
            user_id='unit_test_user',
            patient_id='test_patient_'+str(i),
        )

    viewed = patient_views.get_recently_viewed('unit_test_user', 3)
    assert len(viewed) == 3
    for view in viewed:
        assert 'active' in view
        assert 'patient_id' in view
        assert 'created_date' in view
        assert 'first_name' in view
        assert 'last_name' in view
        assert 'name' in view
        assert 'obs_level' in view
        assert 'precautions' in view
        assert 'unit' in view
        assert 'time_viewed' in view
    assert viewed[0]['patient_id'] == 'test_patient_9'
    
    patient_views.delete_views(user_id='unit_test_user')
    for i in range(10):
        patient_info.delete_patient('test_patient_'+str(i), remove=True)
    viewed = patient_views.get_recently_viewed('unit_test_user', 3)
    assert len(viewed) == 0


