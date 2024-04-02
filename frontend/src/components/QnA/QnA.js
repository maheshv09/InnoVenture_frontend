import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const QnA = () => {
  const { firebaseId } = useParams();
  console.log("FIREBBASE:", useParams());
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/getQnA/${firebaseId}`
      );
      setQuestions(response.data.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleQuestionSubmit = async () => {
    try {
      await axios.post(`http://localhost:8000/addQuestion/${firebaseId}`, {
        question: newQuestion,
      });
      setNewQuestion(""); // Clear the input field
      fetchQuestions(); // Fetch updated questions
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleAnswerSubmit = async (questionIndex) => {
    try {
      await axios.post(
        `http://localhost:8000/addAnswer/${firebaseId}/${questionIndex}`,
        {
          answer: answer,
        }
      );
      fetchQuestions(); // Fetch updated questions after adding answer
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  };

  return (
    <div>
      <h2>Questions & Answers</h2>
      <div>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <button onClick={handleQuestionSubmit}>Submit</button>
      </div>
      <div>
        {questions.map((question, index) => (
          <div key={index}>
            <p>{question.question}</p>
            <ul>
              {question.answers.map((answer, answerIndex) => (
                <li key={answerIndex}>{answer}</li>
              ))}
            </ul>
            <div>
              <input
                type="text"
                placeholder="Enter your answer..."
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
              />
              <button onClick={() => handleAnswerSubmit(index)}>
                Submit Answer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QnA;
