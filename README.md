# Campus Quest - CTP Hackathon 2024

## Welcome
Hello! Welcome to Campus Quest. This project aims to solve ths issue that CUNY students are not aware of the different resources available to them at their campuses, and even if they know these resources are available they don't know where to locate them. We aim to fix this issue by game-ifying this problem. We at Campus Quest have developed a solution that motivates students to know where these resources are and when they're available by implementing Quests. We provide multiple choice questions that test a student's knowledge of these resources and rewards them based on their knowledge. We have a global leaderboard that tracks the highest scores, motivating students to try and aim for a better score. We also implemented an ai assistant QuickCalm to provide real-time feedback. 

## Installation
To install all of the frontend dependencies, go inside the `app` directory and run:
```bash
npm install
```
To install all of the backend dependencies, you'll need to first make a virtual environment like so :
```bash
py -m venv .venv
```
Next, you'll want to activate the venv like so:
```bash
.venv/Scripts/activate
```
Now navigate to the `backend` directory.
Then, you'll want to install all backend dependencies:
```bash
pip install -r requirements.txt
```

Also, please note that this project uses both the OpenAI API and Google Maps API, and so you'll need a `.env` file containing your api keys inside the root directory. The structure is 

```bash
OPENAI_API_KEY = sk-proj......
```

## Getting Started

First, run the frontend inside the app directory:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Then, run the development server inside the backend directory:
```bash
py app.py
```
