import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Image from "../../assets/bg.png";
import { Button } from 'antd';
import { useCreate, useGetIdentity } from "@refinedev/core";
import { useEffect } from "react";
import { ExamContext } from "../../pages/context/exam_context";
 

export const QuizResult = ({ answers, questions}) => {
  // answers, questions, setIsPlayer, testId, testType 
  const { setIsPlayer, testType,testId} = useContext(ExamContext);

  const allAnswers = answers;
  const allQuestions = questions;

   
  const { data: identity } = useGetIdentity();
  const { mutate } = useCreate();

  useEffect(() => {


    const id = identity.id
    const wrongQueId = []
    const rightQueId = []
    const totalQueId = []
    for (let i = 0; i < allQuestions.length; i++) {
      if (allAnswers[i]?.isCorrect) {
        rightQueId.push(allQuestions[i].id)
      } else {
        wrongQueId.push(allQuestions[i].id)
      }
      totalQueId.push(allQuestions[i].id)
    }
    // console.log(id)
    // console.log(examId)
    // console.log(totalQueId)
    // console.log(rightQueId)
    // console.log(wrongQueId)

    const UpdateData = () => {
      if (testType == "EXAM") {
        try {
          mutate({
            resource: "results",
            values: {
              name: `result_${testId}_${testType}_${identity.username}`,
              user: { id },
              exam: testId,
              totalque: totalQueId,
              wrongque: wrongQueId,
              correctque: rightQueId
            },
          });

          console.log('updated successfully')

        } catch (error) {
          console.log('not updated successfully', error)
        }
      }
      else if(testType=="CONTENT"){
        try {
          mutate({
            resource: "results",
            values: {
              name: `result_${testId}_${testType}_${identity.username}`,
              user: { id },
              content: testId,
              totalque: totalQueId,
              wrongque: wrongQueId,
              correctque: rightQueId
            },
          });

          console.log('updated successfully')
          
        } catch (error) {
          console.log('not updated successfully', error)
        }
      }

    };

    UpdateData();

  }, [])

  let percentile = 0;
  // console.log("answers",allAnswers)
  // console.log("questions",allQuestions)
  allAnswers.forEach((item) => {
    if (item.isCorrect) {
      percentile += 1;
    }
  });

  return (
    <div className="result">
      <div className="result-box">
        <div className="result-bg">
          <span className="percentile">
            {Math.round((percentile / allQuestions.length) * 100)}%
          </span>
          <img src={Image} alt="result" />
        </div>
        <p className="result-detail">
          You answered {percentile} out of {allQuestions.length} questions
          correctly!
        </p>
        <Button onClick={() => { setIsPlayer(false) }}>Submit</Button>
      </div>
      <h2 className="check-answers-title">Check Correct Answers</h2>
      <div className="check-answers-boxes">
        {allQuestions.map((item, key) => {
          console.log();
          return (
            <div
              key={key}
              className={
                allAnswers[key].isCorrect
                  ? "check-answer-box correct"
                  : "check-answer-box wrong"
              }
            >
              <div className="check-answer-top">
                <div className="check-texts">
                  <p className="check-answer-count">Question: {key + 1}</p>
                  <h3 className="check-answer-question">{item.name}</h3>
                </div>
                <div className="check-icon">
                  <i
                    className={
                      allAnswers[key].isCorrect ? "bi bi-check" : "bi bi-x"
                    }
                  ></i>
                </div>
              </div>
              <div className="check-answer-bottom">
                <div className="answer-box">
                  <span className="answer-title">Your Answer</span>
                  <span className="answer-text">{allAnswers[key].optionval}</span>
                </div>
                <div className="answer-box">
                  <span className="answer-title">Correct Answer</span>
                  <span className="answer-text">
                    {item.options.map((ans) => {
                      return ans.isCorrect ? ans.optionval : null;
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
