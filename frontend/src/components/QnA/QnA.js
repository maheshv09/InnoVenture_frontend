import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './QnA.css'
import { FaQuestionCircle, FaAngleDown, FaCheck } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

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
      setAnswer(" ");
      fetchQuestions(); // Fetch updated questions after adding answer
    } catch (error) {
      console.error("Error adding answer:", error);
    }
  };

  return (

    <>
      <section className="section_qna">
        <div class="container" data-aos="fade-up">

          <div class="section-header">
            <h2>Questions & Answers</h2>
          </div>

          <div className="form-group">
            <label for="que" className="fw-bold ">Ask a Question</label>
            <input
              type="text"
              name="que"
              className="form-control"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Ask a question..."
            />
            <button onClick={handleQuestionSubmit} className="btn-get-started">Submit</button>
          </div>

          <div className="faq mt-5">
            <div class="faq-list">
              <ul>

                {questions.map((question, index) => (
                  <li data-aos="fade-up" data-aos-delay="100" key={index} className="mt-2">
                    <FaQuestionCircle className="icon-help" />
                    <a data-bs-toggle="collapse" class="collapse" data-bs-target={`#faq-list${index}`}>
                      {question.question}
                      <FaAngleDown className="icon-show" />
                      <IoCloseSharp className="icon-close" />
                    </a>
                    <div id={`faq-list${index}`} class="collapse show" data-bs-parent=".faq-list">
                      <ul className="responses">
                        {question.answers.map((answer, answerIndex) => (
                          <li><FaCheck className="text-success me-2" key={answerIndex} /> {answer}</li>
                        ))}

                      </ul>
                    </div>
                    <div >
                      <input
                      className="form-control"
                        type="text"
                        placeholder="Enter your answer..."
                        value={answer}
                        onChange={(e) => {
                          setAnswer(e.target.value);
                        }}
                      />
                      <button onClick={() => handleAnswerSubmit(index)} className="btn-get-started">
                        Submit Answer
                      </button>
                    </div>
                  </li>

                ))}





              </ul>
            </div>
          </div>




        </div>
      </section>


    </>
  );
};

export default QnA;
