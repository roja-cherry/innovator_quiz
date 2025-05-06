import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const QuizManagementTable = () => {
  const [data, setData] = useState([0, 1, 2, 5, 6, 6, 5, 4, 4, 3, 3]);

  return (
    <div className="container mt-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Quiz Title</th>
            <th scope="col">Timer</th>
            <th scope="col">Created At</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((quiz, index) => (
            <tr key={index}>
              <td scope="row">Q1</td>
              <td>Air edn</td>
              <td>10m</td>
              <td>
                <FaEdit style={{ cursor: "pointer", marginRight: "10px" }} />
                <FaTrash className="ms-2" style={{ cursor: "pointer" }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuizManagementTable;
