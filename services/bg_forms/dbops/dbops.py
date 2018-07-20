""" Connects to the postgres database
and performs operatoins on tables """
import logging
import os

import daiquiri
import pandas as pd
import psycopg2

class DBOps(object):
    """ Manage database operations """
    def __init__(self):
        self.pg_user = os.getenv('POSTGRES_USER')
        self.pg_pass = os.getenv('POSTGRES_PASSWORD')
