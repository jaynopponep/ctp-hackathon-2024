'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './QuestionPage.module.css'; // Import the CSS module

const QuestionPage = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [timerExpired, setTimerExpired] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [question, setQuestion] = useState('Loading question...'); // Default state to indicate loading
  const [optionOne, setOptionOne] = useState('Option 1');
  const [optionTwo, setOptionTwo] = useState('Option 2');
  const [optionThree, setOptionThree] = useState('Option 3');
  const [optionFour, setOptionFour] = useState('Option 4');

  const questID = localStorage.getItem("questID");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/get-question?quest_id=${questID}`);
        const data = await response.json();
        if (data && data.question_title) {
          setQuestion(data.question_title); // Set the question title
        } else {
          setQuestion('Question not found'); // Handle case where no question is returned
        }
      } catch (error) {
        console.error('Error fetching question:', error.message);
        setQuestion('Error loading question'); // Handle fetch error
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

  const handleAnswerClick = (answer) => {//choice handler for quests
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

  return ( //choice handler
    <div className={styles.container}>
      <h1 className={styles.title}>Question</h1>

      <div className={styles.timer}> 
        {timerExpired ? "Times up!" : `Time Remaining: ${timeRemaining} seconds`} 
      </div> 

      <div className={styles.question}>
        {question} {/* Display the question title */}
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
        {questID === '1' ? (
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
