'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './QuestionPage.module.css';

const QuestionPage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [timerExpired, setTimerExpired] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [question, setQuestion] = useState('Loading question...');
  const [optionOne, setOptionOne] = useState('Option 1');
  const [optionTwo, setOptionTwo] = useState('Option 2');
  const [optionThree, setOptionThree] = useState('Option 3');
  const [optionFour, setOptionFour] = useState('Option 4');

  const questID = localStorage.getItem("questID");

  useEffect(() => {
  const fetchQuestion = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/get-questions-set?quest_id=${questID}`);
      const data = await response.json();

      const questionText = Object.keys(data)[0];
      const options = data[questionText];

      setQuestion(questionText);
      setOptionOne(options[0]);
      setOptionTwo(options[1]);
      setOptionThree(options[2]);
      setOptionFour(options[3]);

    } catch (error) {
      console.error('Error fetching question:', error.message);
      setQuestion('Error loading question');
    }
  };

  fetchQuestion();

  if (timeRemaining <= 0) {
    setTimerExpired(true);
    if (timerId) {
      clearInterval(timerId);
    }
    return;
  }

  const timer = setInterval(() => {
    setTimeRemaining((prevTime) => prevTime - 1);
  }, 1000);

  setTimerId(timer);

  return () => clearInterval(timer);
}, [timeRemaining, questID]);


  const handleAnswerClick = (answer) => {
  const isAnswerCorrect = answer === correctAnswer;
  setSelectedAnswer(answer);
  setIsCorrect(isAnswerCorrect);

  if (isAnswerCorrect) {
    setIsCompleted(true);
    setTimerExpired(true);
    if (timerId) {
      clearInterval(timerId);
    }
  } else {
    setIsCompleted(false);
  }

  setTimeout(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
  }, 1000);
};

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Question</h1>

      <div className={styles.timer}>
        {timerExpired ? "Times up!" : `Time Remaining: ${timeRemaining} seconds`}
      </div>

      <div className={styles.question}>
        {question} {}
      </div>

      <div className={styles.imageContainer}>
        <Image
          src={questID === '1' ? "/images/image1.png" : "/images/image2.png"}
          alt="Mental Health Resource"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {[optionOne, optionTwo, optionThree, optionFour].map((answer, index) => (
            <button
                key={answer}
                onClick={() => handleAnswerClick(answer)}
                className={`${styles.answerButton} ${selectedAnswer === answer ? (isCorrect ? styles.buttonCorrect : styles.buttonIncorrect) :
                    (index === 0 ? styles.buttonRed : index === 1 ? styles.buttonBlue : index === 2 ? styles.buttonYellow : styles.buttonGreen)}`}
                disabled={timerExpired}
            >
              {answer}
            </button>
        ))}
      </div>

      {isCompleted && !timerExpired && (
          <div className={styles.completedMessage}>
            This question is marked as completed.
          </div>
      )}
    </div>
  );
};

export default QuestionPage;
