from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.orm import Session
from sqlalchemy import select

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://sql5727106:kUcuNKbnJK@sql5.freesqldatabase.com:3306/sql5727106'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

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


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        try:
            title = request.form.get('title')
            location_id = request.form.get('location_id')
            questions = []

            if not title or not location_id:
                return render_template('host.html', error='Title and Location are required')

            for i in range(1, 6):
                question_text = request.form.get(f'question_text_{i}')

                options = [request.form.get(f'option_{i}_{j}') for j in range(1, 5)]

                correct_option = request.form.get(f'correct_option_{i}')

                if question_text:
                    questions.append({
                        'question_text': question_text,
                        'options': options,
                        'correct_option': correct_option
                    })

            new_quest = Quest(
                title=title,
                location_id=int(location_id)
            )
            db.session.add(new_quest)
            db.session.commit()

            for question in questions:
                new_question = Question(
                    quest_id=new_quest.Name,
                    question_text=question['question_text'],

                    correct_option=int(question['correct_option'])
                )
                db.session.add(new_question)

                db.session.commit()

                for option_text in question['options']:
                    if option_text:
                        new_option = Option(
                            question_id=new_question.id,
                            option_text=option_text
                        )
                        db.session.add(new_option)

                db.session.commit()

            return render_template('host.html', success='Quiz created successfully!')

        except Exception as e:
            db.session.rollback()
            return render_template('host.html', error=str(e))

    return render_template('host.html')


@app.route('/get-questions', methods=['GET'])
def get_questions(): # get questions based on quest_id
    try:
        quest_id = request.args.get('quest_id')
        if not quest_id:
            return render_template('fetch_quiz.html', error="Quiz not found")

        # retrieve questions using quest id
        sel = select(Question).where(Question.quest_id == quest_id)
        result = db.session.execute(sel).all() # <- sql select query
        questions = [row[0] for row in result] # interacts with each row and extracts each tuple (row[0]) and map into questions

        # built the data into json mapping
        question_data = [{"question_id": q.question_id, "question_title": q.question_title} for q in questions]
        # reference to the above process for future mappings with sqlalchemy

        return jsonify(question_data)

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/sign-up', methods=['POST'])
def sign_up():
    username = request.args.get('user')
    email = request.args.get('email')
    password = request.args.get('password')

    # error handling
    if not username or not password or not email:
        return "Please provide user, email, and password", 404
    try:
        new_user = User(username=username, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": f"User {username} signed up successfully!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 405


@app.route('/login', methods=['GET'])
def login():
    username = request.args.get('user')
    password = request.args.get('password')
    # TODO: Include choice between user and email compatibility
    # error handle
    if not username or not password:
        return "Please provide both user and password", 404
    try:
        sel = select(User).where(User.username == username)
        user = db.session.execute(sel).scalar_one_or_none()
        if not user:
            return jsonify({"Error": "User not found in DB"}), 404
        if user.password != password:
            return jsonify({"Error": "Incorrect password"}), 401
        return jsonify({"message": "Login Successful!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 405


@app.route('/get-score', methods=['GET'])
def get_score():
    username = request.args.get('user')
    if not username:
        return "User retrieval error", 404
    try:
        sel = select(User.score).where(User.username == username)
        user_score = db.session.execute(sel).scalar_one_or_none()
        if not user_score:
            return jsonify({"Error": "User not found in DB"}), 404
        return jsonify({"score": user_score}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 405

@app.route('/add-score', methods=['POST'])
def add_score():
    username = request.args.get('user')
    new_score = request.args.get('score')

    # error handle
    if not username or not new_score:
        return "Please provide both user and score", 404
    try:
        new_score = int(new_score) # set new score to int
        user = User.query.filter_by(username=username).first() # Queries where username=username
        # .first() -> first result OR none if none is found
        user.score += new_score if new_score else 0
        db.session.commit()
        return jsonify({"message": "Score added successfully!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 404

if __name__ == '__main__':
    app.run(debug=True)
