from flask import Flask, jsonify

app = Flask(__name__)
app.config.from_object('bg_forms.config.DevelopmentConfig')

@app.route('/services/test', methods=['GET'])
def test():
    return jsonify({
        'status': 'success',
        'message': 'hello, friend! :)'
    })
