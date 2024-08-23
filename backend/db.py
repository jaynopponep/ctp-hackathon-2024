import json

from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy.orm import Session
from sqlalchemy import select
from llm import run_query
from flask_mail import Mail,Message

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://sql5727106:kUcuNKbnJK@sql5.freesqldatabase.com:3306/sql5727106'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['Mail_Server'] = 'smtp.gmail.com'#the email server you will use
app.config['Mail_Port'] = 465
app.config['Mail_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['Mail_Username'] = 'sender_email' # insert your  email here
app.config['Mail_Password']='sender_password'# if use gmail, go to your accoutns and make a app password for this
db = SQLAlchemy(app)
migrate = Migrate(app, db)
mail = Mail(app)

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





@app.route('/quest/<int:quest_id>/progress',methods=['GET'])#Retrieve and return the progress and completion status of a specific quest for a user based on quest_id and user_id
def quest_progress(quest_id):
    user_id=request.args.get('user_id')

    if not user_id:
        return jsonify({'error': 'User ID is required'}),400
    

    try:
        user_id = int(user_id)

    except ValueError:
        return jsonify({'error': 'Invalid User ID format'}), 400
    progress=QuestProgress.query.filter_by(user_id=user_id, quest_id=quest_id).first()

    if progress:
        return jsonify({
            'quest_id': quest_id,
            'user_id': user_id,
            'progress': progress.progress,
            'completed': progress.completed
        }), 200
    else:
        return jsonify({'error':'No progress found for this quest and user'}),404




@app.route('/quest/<int:quest_id>/progress',methods=['POST'])#Update or create quest progress and completion status for a user
def update_progress(quest_id):
    data = request.json
    user_id = data.get('user_id')
    progress_value = data.get('progress')
    completed = data.get('completed', False)

    if not user_id or progress_value is None:
        return jsonify({'error': 'User ID and progress value are required'}), 400

    progress=QuestProgress.query.filter_by(user_id=user_id, quest_id=quest_id).first()

    if progress:
        progress.progress = progress_value
        progress.completed = completed
    else:
        progress = QuestProgress(user_id=user_id, quest_id=quest_id, progress=progress_value, completed=completed)
        db.session.add(progress)

    db.session.commit()

    return jsonify({
        'message':'Progress updated successfully',
        'quest_id':quest_id,
        'user_id':user_id,
        'progress': progress.progress,
        'completed': progress.completed


    }), 200


@app.route('/user/<int:user_id>/completion_percentage', methods=['GET'])# Calculate and return the percentage of completed quests for a specific user
def completion_percentage(user_id):
    total_quests = Quest.query.count()
    
    if total_quests == 0:
        return jsonify({'error': 'No quests found'}), 404

    completed_quests = QuestProgress.query.filter_by(user_id=user_id, completed=True).distinct(QuestProgress.quest_id).count()
    completion_percentage = (completed_quests / total_quests) * 100

    return jsonify({
        'user_id':user_id,
        'total_quests': total_quests,
        'completed_quests':completed_quests,
        'completion_percentage': completion_percentage}), 200



@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method=='POST':
        try:
            title = request.form.get('title')
            location_id=request.form.get('location_id')
            questions=[]

            if not title or not location_id:
                return render_template('host.html', error='Title and Location are required')

            for i in range(1, 6):
                question_text = request.form.get(f'question_text_{i}')
                correct_option = request.form.get(f'correct_option_{i}')
                options= [
                    request.form.get(f'option_{i}_1'),
                    request.form.get(f'option_{i}_2'),
                    request.form.get(f'option_{i}_3'),
                    request.form.get(f'option_{i}_4')
                ]

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
                    quest_id=new_quest.quest_id,
                    question_title=question['question_text']
                )
                db.session.add(new_question)
                db.session.commit()

                for j, option_text in enumerate(question['options']):
                    if option_text:
                        new_option = Option(
                            question_id=new_question.question_id,
                            option_text=option_text,
                            correct_bool=1 if j==int(question['correct_option']) else 0
                        )
                        db.session.add(new_option)

                db.session.commit()
                users = User.query.all()
                for user in users:
                    msg = Message(
                        subject="New Quest Posted",
                        sender='noreply@demo.com',
                        recipients=[user.email],#replace with your email if needed
                        body=f"A new quest has been posted,check it out now"
                    )
                try:
                    mail.send(msg)
                except Exception as e:
                    print (f"Failed to send email!:{str(e)}")
            return render_template ('host.html',success='Quiz created successfully!')
        except Exception as e:
            db.session.rollback()
@app.route('/get-options', methods=['GET'])
def get_options(): # get options based on current question shown on screen
    try:
        question_id = request.args.get('question_id')
        if not question_id:
            return render_template('get_options.html', error="Options to question not found")
        sel = select(Option).where(Option.question_id == question_id)
        result = db.session.execute(sel).all()
        options = [row[0] for row in result]

        options_data = [{"option_id": o.option_id, "option_text": o.option_text, "correct_bool": o.correct_bool} for o in options]
        return jsonify(options_data)
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/get-questions', methods=['GET'])
def get_questions(): # get questions based on quest_id
    try:
        quest_id = request.args.get('quest_id')
        if not quest_id:
            return render_template('get_questions.html', error="Quiz not found")

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


@app.route('/query-llm', methods=['POST', 'GET'])
def query_llm():
    query = request.args.get('query')
    chat_history_str = request.args.get('chat_history', '[]')
    chat_history = json.loads(chat_history_str)  # convert chat_history into json for arg
    key = request.args.get('openai_api_key')
    response = run_query(query, chat_history, key)
    return jsonify(response)





# Sample API call:
# http://127.0.0.1:5000/query-llm?query="Where is the CCNY mental health center?"&
# chat_history=[]&
# openai_api_key=<PUT YOUR KEY HERE!>

if __name__ == '__main__':
    app.run(debug=True)
