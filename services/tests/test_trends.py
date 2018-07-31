from bg_forms.database.trends import Trends

ENV = 'LOCAL'

def test_precaution_totals():
    trends = Trends(ENV)
    totals = trends.get_precaution_totals()
    assert type(totals) == dict
    for key in totals:
        assert type(totals[key]) == int
