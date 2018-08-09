""" Database API for the Brooke Glen app """
import os
from flask import Flask, jsonify, request

from bg_forms.database.dbops import DBOps
from bg_forms.database.patients import Patients
from bg_forms.database.patient_views import PatientViews
from bg_forms.database.trends import Trends

app = Flask(__name__)
ENVIRONMENT = os.getenv('APP_ENVIRONMENT')

@app.route('/service/test', methods=['GET'])
def test():
    """ Tests to make sure the flask app is working """
    return jsonify({
        'status': 'success',
        'message': 'Hello, friend! :)'
    })

# Patient read and update routes
# See bg_forms.database.patients

@app.route('/service/patient/<patient_id>', methods=['GET'])
def get_patient(patient_id):
    """ Fetches a patient from the database """
    patient_info = Patients(ENVIRONMENT)
    patient = patient_info.get_patient(patient_id)
    return jsonify(patient)

@app.route('/service/patient/<patient_id>', methods=['DELETE'])
def delete_patient(patient_id):
    """ Deletes a patient from the database """
    patient_info = Patients(ENVIRONMENT)
    patient_info.delete_patient(patient_id)
    response = {'status': 'patient deleted'}
    return jsonify(response)

@app.route('/service/patient', methods=['POST'])
def update_patient():
    """ Creates or updates a patient in the database """
    patient_info = Patients(ENVIRONMENT)
    # Check to make sure there is a JSON in the request
    if not request.json:
        error = {'status': 'error: JSON not found'}

    patient = request.json
    if 'patient_id' in patient:
        check = patient_info.get_patient(patient['patient_id'])
    else:
        check = None
    if not check:
        patient_info.create_patient(patient)
        response = {'status': 'patient created'}
    else:
        patient_info.update_patient(patient)
        response = {'status': 'patient updated'}
    return jsonify(response)

@app.route('/service/patients', methods=['GET'])
def get_patients():
    """ Pulls all active patients from the database """
    patient_info = Patients(ENVIRONMENT)
    patients = patient_info.get_all_patients()
    return jsonify(patients)

# Patient views routes
# See bg_forms.database.patient_views

@app.route('/service/patient_views', methods=['POST'])
def post_patient_view():
    """ Post a patient view to the database """
    patient_views = PatientViews(ENVIRONMENT)
    if not request.json:
        error = {'status': 'error: JSON not found'}

    view = request.json
    patient_views.post_view(view['user_id'], view['patient_id'])
    msg = 'USER: %s VIEWED %s'%(view['user_id'], view['patient_id'])
    return jsonify({'status': msg})

@app.route('/service/patient_views/<user_id>', methods=['GET'])
def get_patient_views(user_id):
    """ Pulls the most recently viewed patients for a user """
    limit = request.args.get('limit')
    if not limit:
        limit = 8

    patient_views = PatientViews(ENVIRONMENT)
    viewed = patient_views.get_recently_viewed(user_id, limit)
    return jsonify(viewed)

# Trend routes
# See bg_forms.database.trends

@app.route('/service/trends/precautions', methods=['GET'])
def get_precaution_totals():
    """ Aggregates the total number for each precaution """
    trends = Trends(ENVIRONMENT)
    totals = trends.get_precaution_totals()
    return jsonify(totals)
