""" Database API for the Brooke Glen app """
import os
from flask import Flask, jsonify

from bg_forms.database.dbops import DBOps

app = Flask(__name__)
ENVIRONMENT = os.getenv('APP_ENVIRONMENT')

@app.route('/service/test', methods=['GET'])
def test():
    """ Tests to make sure the flask app is working """
    return jsonify({
        'status': 'success',
        'message': 'Hello, friend! :)'
    })

@app.route('/service/patient/<patient_id>', methods=['GET'])
def get_patient(patient_id):
    """ Fetches a patient from the database """
    dbops = DBOps(ENVIRONMENT)
    patient = dbops.get_patient(patient_id)
    return jsonify(patient)

@app.route('/service/patient/<patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    """ Deletes a patient from the database """
    dbops = DBOps(ENVIRONMENT)
    dbops.delete_patient(patient_id)
    response = {'status': 'patient deleted'}
    return jsonify(response)

@app.route('/service/patient', methods=['POST'])
def update_patient(patient_id):
    """ Creates or updates a patient in the database """
    dbops = DBOps(ENVIRONMENT)
    # Check to make sure there is a JSON in the request
    if not request.json:
        error = {'status': 'error: JSON not found'}

    patient = request.json
    check = dbops.get_patient(patient['patient_id'])
    if not check:
        dbops.create_patient(patient)
        reponse = {'status': 'patient created'}
    else:
        dbops.update_patient(patient)
        response = {'status': 'patient updated'}
    return jsonify(response)

@app.route('/service/patients', methods=['GET'])
def get_patients():
    """ Pulls all active patients from the database """
    dbops = DBOps(ENVIRONMENT)
    patients = dbops.get_all_patients()
    return jsonify(patients)

@app.route('/service/aggregates/precautions', methods=['GET'])
def get_precaution_totals():
    """ Aggregates the total number for each precaution """
    dbops = DBOps(ENVIRONMENT)
    totals = dbops.get_precaution_totals()
    return jsonify(totals)
