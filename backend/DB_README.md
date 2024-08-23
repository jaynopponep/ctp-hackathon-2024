# Campus Quest Backend

## Setting Up: </br>
Make sure to run the following to get all the necessary packages:
```
$ cd backend
$ pip install -r requirements.txt
```

## How to use: </br>
Note that host stands for http://127.0.0.1:5000 or whatever host you are running on
### Signup
Signing up requires params user, email and password. Pass these parameters in your calls like so:</br>
```
host/sign-up?user=<username-here>&email=<email-here>&password=<password-here>
```
Example:
```
host/sign-up?user=Jay&email=jaynopponep@gmail.com&password=123abc
```

### Login
Logging in requires specifically user and password. (Will implement email compatibility later)
```
host/login?user=<username-here>&password=<password-here>
```
Example:
```
host/login?user=Jay&password=123abc
```
### Get user score
Retrieving user score requires only parameter user. Write your endpoints like so:</br>
```
host/get-score?user=<username-here>
```

### Add new user score
Adding or incrementing a user's score requires params user and score (the new score to add onto current db-stored user score)</br>
```
host/add-score?user=<username-here>&score=<added-score-here>
```

### Get questions
Retrieving questions requires the quest id. Write endpoints like below:</br>
```
host/get-question?quest_id=<quest-id-here>
```

### Get options/answer choices
Retrieving answer choices/options requires the question id.</br>
```
host/get-options?question_id=<question-id-here>
```
