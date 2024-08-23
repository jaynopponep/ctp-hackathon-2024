from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy import select
from flask import Blueprint

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://sql5727106:kUcuNKbnJK@sql5.freesqldatabase.com:3306/sql5727106'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)
db_app = Blueprint('db_app', __name__)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    score = db.Column(db.Integer, nullable=True)

class Option(db.Model):
    __tablename__ = 'options'
    option_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.question_id'), nullable=False)
    option_text = db.Column(db.String(255), nullable=False)
    correct_bool = db.Column(db.String(255), nullable=False)
    question = db.relationship('Question', backref=db.backref('options', lazy=True))

class Question(db.Model):
    __tablename__ = 'questions'
    question_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    quest_id = db.Column(db.Integer, db.ForeignKey('quests.quest_id'), nullable=False)
    question_title = db.Column(db.String(255), nullable=False)
    quest = db.relationship('Quest', backref=db.backref('questions', lazy=True))
    # Many Questions to one Quest possible^

class Quest(db.Model):
    __tablename__ = 'quests'
    quest_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey('locations.location_id'), nullable=False)
    location = db.relationship('Location', backref=db.backref('quests', lazy=True))

class Location(db.Model):
    __tablename__ = 'locations'
    location_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)

class QuestProgress(db.Model):
    __tablename__ = 'quest_progress'
    progress_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    quest_id = db.Column(db.Integer, db.ForeignKey('quests.quest_id'), nullable=False)
    progress = db.Column(db.Integer, default=0)
    completed = db.Column(db.Boolean, default=False)
    user = db.relationship('User', backref=db.backref('quest_progress', lazy=True))
    quest = db.relationship('Quest', backref=db.backref('quest_progress', lazy=True))

def init_app(app):
    db.init_app(app)
    migrate.init_app(app, db)


