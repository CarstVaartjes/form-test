from flask import Flask, render_template, Response
import datetime
import json

import numpy as np
from bson import ObjectId


class MongoJSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId) or isinstance(o, np.bool_):
            return str(o)
        if isinstance(o, datetime.datetime):
            return o.isoformat()

        return json.JSONEncoder.default(self, o)

encoder = MongoJSONEncoder()

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/hello')
def hello():
    return render_template('hello.html')


@app.route('/form/schema')
def form_schema():
    uiSchema = {
        "ui:order": ["title", "done"]
    }

    schema = {
        'title': "JSON Based Flask Generated Form",
        'type': "object",
        'required': ["title"],
        'properties': {
            'title': {'type': "string", 'title': "What time is it?", 'default': "Self Service Screen Making Time!!!"},
            'done': {'type': "boolean", 'title': "Done?", 'default': False}
        }
    }

    response = encoder.encode({'schema': schema, 'uiSchema': uiSchema})
    return Response(response, mimetype='application/json')


@app.route('/form')
def form():
    return render_template('form.html')

if __name__ == '__main__':
    app.run(debug=True)

