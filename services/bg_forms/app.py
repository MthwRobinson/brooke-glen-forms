import os
from flask import Flask, jsonify

app = Flask(__name__)
app_settings = os.getenv('APP_SETTINGS')
app.config.from_object(app_settings)


@app.route('/services/test', methods=['GET'])
def test():
    return jsonify({
        'status': 'success',
        'message': 'Hello, friend! :)'
    })
