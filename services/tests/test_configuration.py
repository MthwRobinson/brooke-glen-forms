from bg_forms.configuration import get_config, list_environments

def test_get_config():
    host = get_config('PG_HOST', 'TEST')
    assert type(host) == str

def test_list_environments():
    environments = list_environments()
    assert type(environments) == list
    assert len(environments) > 0
