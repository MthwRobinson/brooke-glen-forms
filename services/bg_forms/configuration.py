""" Environment configurations for the app """

def get_config(variable, env):
    """ Pulls a configuration for the selected environment """
    return configs[env][variable]

configs = {
    'DEV': {
        'PG_HOST': 'localhost',
        'PG_PORT': 5435,
        'PG_DATABASE': 'bg_forms_dev',
        'PG_USER': 'postgres',
        'PG_PASS': 'postgres',
        'PG_SCHEMA': 'bg_forms'
    },
    'TEST': {
        'PG_HOST': 'localhost',
        'PG_PORT': 5435,
        'PG_DATABASE': 'bg_forms_test',
        'PG_USER': 'postgres',
        'PG_PASS': 'postgres',
        'PG_SCHEMA': 'bg_forms'
    },
    'PROD': {
        'PG_HOST': 'localhost',
        'PG_PORT': 5435,
        'PG_DATABASE': 'bg_forms_prod',
        'PG_USER': 'postgres',
        'PG_PASS': 'postgres',
        'PG_SCHEMA': 'bg_forms'
    }
}
