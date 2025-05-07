import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import "./QuizManagement.scss";
import QuizManagementTable from "../../../components/quiz-management/QuizManagementTable";
import { CiFilter } from "react-icons/ci";
import { Link, useSearchParams } from "react-router-dom";
import QuizFilter from "../../../components/quiz-management/QuizFilter";
import { getQuizList } from "../../../api/apiService";
import Swal from "sweetalert2";

const QuizManagement = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [filters, setFilters] = useState({ isActive: false });
  const [quizList, setQuizList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (key, val) => {
    searchParams.set(key, val);
    setSearchParams(searchParams);

    setFilters((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const getAllQuiz = async () => {
    try {
      const res = await getQuizList(filters);
      setQuizList(res?.data);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", error?.message, "error");
    }
  };

  useEffect(() => {
    setFilters(Object.fromEntries(new URLSearchParams(searchParams).entries()));
    getAllQuiz();
  }, []);

  const handleDelete = (id) => {};

  return (
    <section className="container-fluid quiz-management-container p-5">
      <h2>Quiz Management</h2>
      <div className="mt-4">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div className="position-relative">
              <input
                type="text"
                className="form-control ps-5"
                id="search"
                placeholder="search"
              />
              <IoSearchOutline className="search-icon" />
            </div>
            <button
              className={`btn border ms-2 ${showFilter && "btn-primary"}`}
              onClick={() => setShowFilter((prev) => !prev)}
            >
              <CiFilter className="me-2" style={{ fontSize: "1.5rem" }} />
              <span>Filter</span>
            </button>
          </div>
          <div>
            <Link to="/admin/create-quiz" className="btn btn-primary">
              Create Quiz
            </Link>
          </div>
        </div>
        {showFilter && (
          <QuizFilter
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
        )}
        <QuizManagementTable data={quizList} onDelete={handleDelete} />
      </div>
    </section>
  );
};

export default QuizManagement;
