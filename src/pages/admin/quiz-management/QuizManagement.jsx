import React, { useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import "./QuizManagement.scss";
import QuizManagementTable from "../../../components/quiz-management/QuizManagementTable";
import { CiFilter } from "react-icons/ci";
import { Link, useSearchParams } from "react-router-dom";
import QuizFilter from "../../../components/quiz-management/QuizFilter";
import { getQuizList } from "../../../api/apiService";
import Swal from "sweetalert2";

const QuizManagement = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ isActive: false });
  const [quizList, setQuizList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const data = useMemo(() => {
    if (!search) return quizList;

    const searchResult = quizList.filter((quiz) => {
      if (
        quiz?.quizName?.toLowerCase()?.includes(search?.toLowerCase()?.trim())
      ) {
        return quiz;
      }
    });
    return searchResult;
  }, [quizList, search]);

  const handleFilterChange = (key, val) => {
    if (val == "-1") {
      const { [key]: _, ...newFilters } = filters;
      setFilters(newFilters);
    } else {
      searchParams.set(key, val);
      setFilters((prev) => ({
        ...prev,
        [key]: val,
      }));
    }
    setSearchParams(searchParams);
  };

  const getAllQuiz = async (query = filters) => {
    try {
      const res = await getQuizList(query);
      setQuizList(res?.data);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", error?.message, "error");
    }
  };

  const applyFilter = () => {
    console.log(filters);
    getAllQuiz();
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    const updatedFilters = { ...params, ...filters };
    setFilters(updatedFilters);
    getAllQuiz(updatedFilters);
  }, []);

  const handleDelete = (quizId) => {
    setQuizList((prevList) => prevList.filter((quiz) => quiz.quizId !== quizId));
  };
  

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
                value={search}
                onChange={(e) => setSearch(e.target?.value)}
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
            applyFilter={applyFilter}
          />
        )}
        <QuizManagementTable data={data} onDelete={handleDelete} />
      </div>
    </section>
  );
};

export default QuizManagement;
