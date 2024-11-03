import React, { useState } from "react";
import '../CssFiles/Questions.css';

export default function Question() {
  const questions = [
    { question: "Name", type: "text" },
    { question: "Age", type: "number" },
    { question: "Occupation", type: "text" },
    { question: "Race", type: "choice", options: ["Asian", "Black", "White", "Other"] },
    { question: "Relationship", type: "choice", options: ["Single", "Married", "Other"] },
    { question: "Gender", type: "choice", options: ["Male", "Female", "Other"] },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleNext = () => setCurrentIndex((prevIndex) => prevIndex + 1);
  const handlePrev = () => setCurrentIndex((prevIndex) => prevIndex - 1);

  const handleSubmit = async () => {
    console.log("Answers:", answers); // Debugging: check answers object
  
    try {
      await fetch("http://localhost:5000/save-response", {  // Use the correct URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      answers.userid="Jenn";
      alert("Data saved successfully!");
      console.log(answers);
      
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  
  const handleChange = (e) => {
    setAnswers({ ...answers, [questions[currentIndex].question]: e.target.value });
  };

  const renderInput = () => {
    const currentQuestion = questions[currentIndex];

    if (currentQuestion.type === "text" || currentQuestion.type === "number") {
      return (
        <input
          type={currentQuestion.type}
          onChange={handleChange}
          value={answers[currentQuestion.question] || ""}
        />
      );
    } else if (currentQuestion.type === "choice") {
      return (
        <select onChange={handleChange} value={answers[currentQuestion.question] || ""}>
          <option value="" disabled>Select</option>
          {currentQuestion.options.map((option, idx) => (
            <option key={idx} value={option}>{option}</option>
          ))}
        </select>
      );
    }
  };

  return (
    <div className="projects-section bg-blue-500">
      <h1 className="text-7xl title">Projects</h1>
      <div className="project-card m-auto">
        <h1>{questions[currentIndex].question}</h1>
        {renderInput()}
        <button onClick={handleSubmit} disabled={currentIndex !== questions.length - 1}>
  Submit
</button>

      </div>
      
      <button onClick={handlePrev} disabled={currentIndex === 0}>Previous</button>
      <button onClick={handleNext} disabled={currentIndex === questions.length - 1}>Next</button>

    </div>
  );
}
