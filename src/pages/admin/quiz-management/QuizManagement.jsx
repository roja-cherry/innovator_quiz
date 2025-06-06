import React, { useEffect, useMemo, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import QuizManagementTable from "../../../components/quiz-management/QuizManagementTable";
import { CiFilter } from "react-icons/ci";
import { Link, useSearchParams } from "react-router-dom";
import QuizFilter from "../../../components/quiz-management/QuizFilter";
import { getQuizList } from "../../../api/apiService";
import Swal from "sweetalert2";
import "./QuizManagement.scss";

const QuizManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(searchParams?.size > 0);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [quizList, setQuizList] = useState([]);

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
    if (val === "" || val == -1) {
      // “All” selected: remove the key
      searchParams.delete(key);
      const { [key]: _, ...rest } = filters;
      setFilters(rest);
    } else {
      // For isScheduled, we want a boolean not a string
      const actualValue = key === "isScheduled" ? val === "true" : val;

      searchParams.set(key, actualValue);
      setFilters((prev) => ({
        ...prev,
        [key]: actualValue,
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
    getAllQuiz();
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    const updatedFilters = { ...filters, ...params };
    setFilters(updatedFilters);
    getAllQuiz(updatedFilters);
  }, []);

  const handleDelete = (quizId) => {
    setQuizList((prevList) =>
      prevList.filter((quiz) => quiz.quizId !== quizId)
    );
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
                autoComplete="off"
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
            <Link
              to="/admin/quiz-management/create-quiz"
              className="btn btn-primary"
            >
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
