""" Calculates trends based on patient information """
from bg_forms.database.dbops import DBOps
from bg_forms.database.patients import Patients

class Trends(DBOps):
    def __init__(self, environment='DEV'):
        super().__init__(environment)
        self.patient_info = Patients(environment)

    def get_precaution_totals(self):
        """ Aggregates a count for each precaution """
        patients = self.patient_info.get_all_patients()
        precautions = [x['precautions'] for x in patients]
        totals = {}
        for list_ in precautions:
            for precaution in list_:
                if precaution not in totals:
                    totals[precaution] = 1
                else:
                    totals[precaution] += 1
        return totals
