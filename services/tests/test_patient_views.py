from bg_forms.database.patient_views import PatientViews

ENV = 'LOCAL'

def test_post_view():
    patient_views = PatientViews(ENV)
    patient_views.delete_views(user_id='unit_test_user')
    for i in range(10):
        patient_views.post_view(
            user_id='unit_test_user',
            patient_id='test_patient_'+str(i),
        )

    viewed = patient_views.get_recently_viewed('unit_test_user', 3)
    assert len(viewed) == 3
    for view in viewed:
        assert 'view_id' in view
        assert 'user_id' in view
        assert 'patient_id' in view
        assert 'time_viewed' in view
    assert viewed[0]['patient_id'] == 'test_patient_9'
    
    patient_views.delete_views(user_id='unit_test_user')
    viewed = patient_views.get_recently_viewed('unit_test_user', 3)
    assert len(viewed) == 0


