'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import styles from './QuestionPage.module.css'; // Import the CSS module

const QuestionPage = () => {
  const { id } = useParams(); // `id` can be string or string[]
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [timerExpired, setTimerExpired] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const questionId = Array.isArray(id) ? id[0] : id;
  console.log(questionId)
  const correctAnswer = questionId === '1' ? 'Counseling Center' : 'Other Answer';

  useEffect(() => {
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
  }, [timeRemaining]);

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
      <h1 className={styles.title}>Question: {questionId}</h1>

      <div className={styles.timer}>
        {timerExpired ? "Times up!" : `Time Remaining: ${timeRemaining} seconds`}
      </div>

      <div className={styles.question}>
        {questionId === '1' ? 'Where can you find the mental health center at CCNY?' : 'Which resource provides counseling services for students at CCNY?'}
      </div>

      <div className={styles.imageContainer}>
        <Image
          src={questionId === '1' ? "/images/image1.png" : "/images/image2.png"}
          alt="Mental Health Resource"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {questionId === '1' ? (
          ['NAC 1-113', 'Marshak MR-3', 'ARC Library', 'NAC 7-118'].map((answer) => (
            <button
              key={answer}
              onClick={() => handleAnswerClick(answer)}
              className={`${styles.answerButton} ${selectedAnswer === answer ? (isCorrect ? styles.buttonCorrect : styles.buttonIncorrect) : 
                (answer === 'NAC 1-113' ? styles.buttonRed : answer === 'Marshak MR-3' ? styles.buttonBlue : answer === 'ARC Library' ? styles.buttonYellow : styles.buttonGreen)}`}
              disabled={timerExpired}
            >
              {answer}
            </button>
          ))
        ) : (
          ['Counseling Center', 'Health Center', 'Student Services', 'Library'].map((answer) => (
            <button
              key={answer}
              onClick={() => handleAnswerClick(answer)}
              className={`${styles.answerButton} ${selectedAnswer === answer ? (isCorrect ? styles.buttonCorrect : styles.buttonIncorrect) : 
                (answer === 'Counseling Center' ? styles.buttonRed : answer === 'Health Center' ? styles.buttonBlue : answer === 'Student Services' ? styles.buttonYellow : styles.buttonGreen)}`}
              disabled={timerExpired}
            >
              {answer}
            </button>
          ))
        )}
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