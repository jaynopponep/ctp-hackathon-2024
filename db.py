from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.orm import Session

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://sql5727106:kUcuNKbnJK@sql5.freesqldatabase.com:3306/sql5727106'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)


class Quest(db.Model):
    __tablename__ = 'quests'
    Name = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    location_id = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.TIMESTAMP, nullable=False, default=db.func.current_timestamp())


class Question(db.Model):
    __tablename__ = 'questions'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quests.Name'), nullable=False)
    question_text = db.Column(db.Text, nullable=False)
    correct_option = db.Column(db.Integer, nullable=False)
    quest = db.relationship('Quest', backref=db.backref('questions', lazy=True))


class Option(db.Model):
    __tablename__ = 'options'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    option_text = db.Column(db.String(255), nullable=False)
    question = db.relationship('Question', backref=db.backref('options', lazy=True))


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    score = db.Column(db.Integer, nullable=True)


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
                    quiz_id=new_quest.Name,
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


# Fetch the quest
@app.route('/fetch-quiz/<int:quest_id>', methods=['GET'])
def fetch_quiz(quest_id):
    try:
        session = Session()
        quest = session.get(Quest, quest_id)
        if not quest:
            return render_template('fetch_quiz.html', error="Quiz not found")

        # Fetch questions using quest_id
        questions = Question.query.filter_by(quiz_id=quest_id).all()
        quiz_data = {
            "title": quest.title,
            "location_id": quest.location_id,
            "created_at": quest.created_at,
            "questions": []
        }
        # Fetch question_id, their options and correct answer
        for question in questions:
            options = Option.query.filter_by(question_id=question.id).all()
            quiz_data["questions"].append({
                "id": question.id,
                "question_text": question.question_text,
                "options": [{"id": option.id, "option_text": option.option_text} for option in options],
                "correct_option": question.correct_option
            })

        return render_template('fetch_quiz.html', quiz=quiz_data)
    except Exception as e:
        return render_template('fetch_quiz.html', error=str(e))


@app.route('/sign-up', methods=['POST'])
def sign_up():
    username = request.args.get('user')
    password = request.args.get('password')

    # error handling
    if not username or not password:
        return "Please provide both user and password", 404
    try:
        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": f"User {username} signed up successfully!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 405


if __name__ == '__main__':
    app.run(debug=True)
