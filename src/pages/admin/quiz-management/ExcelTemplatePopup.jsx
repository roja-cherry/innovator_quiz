const quizData = [
    {
      question: "What is the capital of France?",
      option1: "London",
      option2: "Berlin",
      option3: "Paris",
      option4: "Madrid",
      correctAnswer: "Paris"
    },
    {
      question: "Which planet is known as the Red Planet?",
      option1: "Venus",
      option2: "Mars",
      option3: "Jupiter",
      option4: "Saturn",
      correctAnswer: "Mars"
    },
    {
      question: "What is the largest mammal in the world?",
      option1: "Elephant",
      option2: "Blue Whale",
      option3: "Giraffe",
      option4: "Polar Bear",
      correctAnswer: "Blue Whale"
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      option1: "Gold",
      option2: "Oxygen",
      option3: "Osmium",
      option4: "Oganesson",
      correctAnswer: "Oxygen"
    },
    {
      question: "Who painted the Mona Lisa?",
      option1: "Vincent van Gogh",
      option2: "Pablo Picasso",
      option3: "Leonardo da Vinci",
      option4: "Michelangelo",
      correctAnswer: "Leonardo da Vinci"
    },
    {
      question: "What is the hardest natural substance on Earth?",
      option1: "Gold",
      option2: "Iron",
      option3: "Diamond",
      option4: "Graphite",
      correctAnswer: "Diamond"
    },
    {
      question: "Which country is home to the kangaroo?",
      option1: "South Africa",
      option2: "Brazil",
      option3: "Australia",
      option4: "New Zealand",
      correctAnswer: "Australia"
    },
    {
      question: "How many continents are there on Earth?",
      option1: "5",
      option2: "6",
      option3: "7",
      option4: "8",
      correctAnswer: "7"
    },
  ];

const ExcelTemplatePopup = () => {
  return (
    <>
      <button
        type="button"
        className="btn btn-link p-0 m-0"
        data-bs-toggle="modal"
        data-bs-target="#templateFormatModal"
      >
        Excel format
      </button>

      <div
        className="modal fade modal-xl"
        id="templateFormatModal"
        tabindex="-1"
        aria-labelledby="templateFormatModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="container mt-4 p-5">
              <div className="table-responsive">
                <table
                  className="table table-bordered table-hover"
                  style={{
                    minWidth: "800px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <thead className="table-light">
                    <tr>
                      <th className="text-center align-middle">Question</th>
                      <th className="text-center align-middle">Option 1</th>
                      <th className="text-center align-middle">Option 2</th>
                      <th className="text-center align-middle">Option 3</th>
                      <th className="text-center align-middle">Option 4</th>
                      <th className="text-center align-middle">
                        Correct Answer
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizData.map((row, index) => (
                      <tr key={index}>
                        <td className="p-2">{row.question}</td>
                        <td className={`p-2`}>{row.option1}</td>
                        <td className={`p-2`}>{row.option2}</td>
                        <td className={`p-2 `}>{row.option3}</td>
                        <td className={`p-2`}>{row.option4}</td>
                        <td className="p-2">{row.correctAnswer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExcelTemplatePopup;
