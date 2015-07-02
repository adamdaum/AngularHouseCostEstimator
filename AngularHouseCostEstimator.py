from flask import Flask
from flask.ext.heroku import Heroku
from flask.ext.restless import APIManager
from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, Text, Float, Date

app = Flask(__name__, static_url_path='')
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://adamdaum:t7w94u3qA@localhost/projects'
heroku = Heroku(app)
db = SQLAlchemy(app)

class Project(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(Text, unique=False)
    description = Column(Text, unique=False)
    vendor = Column(Text, unique=False)
    hours = Column(Float, unique=False)
    cost = Column(Float, unique=False)
    start = Column(Date, unique=False)
    finish = Column(Date, unique=False)


db.create_all()

api_manager = APIManager(app, flask_sqlalchemy_db=db)
api_manager.create_api(Project, methods=['GET', 'POST', 'DELETE', 'PUT'])


@app.route('/')
def index():
    return app.send_static_file('index.html')



#app.debug = True

if __name__ == '__main__':
    app.run()
