from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from sqlalchemy.orm import Session
from sqlalchemy import select, desc
import os

from db import db, init_app, User, Option, Question, Quest, QuestProgress  # Import models and init function
from llm import run_query

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://sql5727106:kUcuNKbnJK@sql5.freesqldatabase.com:3306/sql5727106'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database and migrations
init_app(app)

chat_history = []


# Chat route
@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        query = request.json.get('message')

        if not query:
            return jsonify({"error": "Query is required"}), 400

        openai_api_key = os.getenv('OPENAI_API_KEY')
        response = run_query(query, chat_history, openai_api_key)

        return jsonify({"reply": response}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Application routes
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # insert post stuff here
        pass

    return render_template('host.html')


@app.route('/get-options', methods=['GET'])
def get_options():
    try:
        question_id = request.args.get('question_id')
        if not question_id:
            return render_template('get_options.html', error="Options to question not found")
        sel = select(Option).where(Option.question_id == question_id)
        result = db.session.execute(sel).all()
        options = [row[0] for row in result]

        options_data = [{"option_id": o.option_id, "option_text": o.option_text, "correct_bool": o.correct_bool} for o
                        in options]
        return jsonify(options_data)
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@app.route('/get-questions', methods=['GET'])
def get_questions():
    try:
        quest_id = request.args.get('quest_id')
        if not quest_id:
            return render_template('get_questions.html', error="Quiz not found")

        sel = select(Question).where(Question.quest_id == quest_id)
        result = db.session.execute(sel).all()
        questions = [row[0] for row in result]

        question_data = [{"question_id": q.question_id, "question_title": q.question_title} for q in questions]

        return jsonify(question_data)

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


# this one is not that fun : (
@app.route('/login', methods=['GET'])  # this works just avoid the edge case where user not in db
def login():
    username = request.args.get('user')
    password = request.args.get('password')

    if not username or not password:
        return jsonify({"error": "Please provide both user and password"}), 404

    try:
        sel = select(User).where(User.username == username)
        user = db.session.execute(sel).scalar_one_or_none()

        if not user:
            return jsonify({"error": "User not found in DB"}), 404

        if user.password != password:
            return jsonify({"error": "Incorrect password"}), 401

        return jsonify({"message": "Login Successful!"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@app.route('/sign-up', methods=['GET'])
def sign_up():
    username = request.args.get('user')
    email = request.args.get('email')
    password = request.args.get('password')

    if not username or not password or not email:
        return jsonify({"error": "Please provide user, email, and password"}), 404

    try:
        # Check if the username already exists
        existing_user = db.session.execute(select(User).where(User.username == username)).scalar_one_or_none()
        if existing_user:
            return jsonify({"error": f"User {username} already exists."}), 409

        # Create a new user
        new_user = User(username=username, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": f"User {username} signed up successfully!"}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/get-leaderboard', methods=['GET'])
def get_leaderboard():
    try:
        sel = select(User.username, User.score).order_by(desc(User.score))
        leaderboard = db.session.execute(sel).fetchall()

        if not leaderboard:
            return jsonify({"leaderboard": []}), 200
        leaderboard_data = [{"username": row.username, "score": row.score} for row in leaderboard]
        return jsonify({"leaderboard": leaderboard_data})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

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

    if not username or not new_score:
        return "Please provide both user and score", 404
    try:
        new_score = int(new_score)
        user = User.query.filter_by(username=username).first()
        user.score += new_score if new_score else 0
        db.session.commit()
        return jsonify({"message": "Score added successfully!"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 404


@app.route('/get-quest-progress', methods=['GET'])
# Retrieve the progress and completion status of a specific quest for a user based on quest_id and user_id
def quest_progress():
    user_id = request.args.get('user_id')
    quest_id = request.args.get('quest_id')
    if not user_id or quest_id:
        return jsonify({'error': 'User ID & Quest ID is required, check params'}), 400
    try:
        user_id = int(user_id)
    except ValueError:
        return jsonify({'error': 'Invalid User ID format'}), 400
    progress = QuestProgress.query.filter_by(user_id=user_id, quest_id=quest_id).first()
    if progress:
        return jsonify({
            'quest_id': quest_id,
            'user_id': user_id,
            'progress': progress.progress,
            'completed': progress.completed
        }), 200
    else:
        return jsonify({'error': 'No progress found for this quest and user'}), 404


@app.route('/update-quest-progress',methods=['POST'])  # Update or create quest progress and completion status for a user
def update_progress():
    quest_id = request.args.get('quest_id')
    data = request.json
    user_id = data.get('user_id')
    progress_value = data.get('progress')
    completed = data.get('completed', False)
    if not user_id or progress_value is None:
        return jsonify({'error': 'User ID and progress value are required'}), 400
    progress = QuestProgress.query.filter_by(user_id=user_id, quest_id=quest_id).first()
    if progress:
        progress.progress = progress_value
        progress.completed = completed
    else:
        progress = QuestProgress(user_id=user_id, quest_id=quest_id, progress=progress_value, completed=completed)
        db.session.add(progress)
    db.session.commit()
    return jsonify({
        'progress': progress.progress,
        'completed': progress.completed
    }), 200


@app.route('/get-completion',methods=['GET'])  # Calculate and return the percentage of completed quests for a specific user
def completion_percentage():
    user_id = request.args.get('user_id')
    total_quests = Quest.query.count()

    if total_quests == 0:
        return jsonify({'error': 'No quests found'}), 404
    completed_quests = QuestProgress.query.filter_by(user_id=user_id, completed=True).distinct(
        QuestProgress.quest_id).count()
    completion_percentage = (completed_quests / total_quests) * 100
    return jsonify({
        'user_id': user_id,
        'total_quests': total_quests,
        'completed_quests': completed_quests,
        'completion_percentage': completion_percentage}), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)
