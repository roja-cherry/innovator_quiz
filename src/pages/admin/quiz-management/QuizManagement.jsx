import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import "./QuizManagement.scss"

const QuizManagement = () => {
  return (
    <section className="container-fluid p-5">
      <h2>Quiz Management</h2>
      <div className="p-5 mt-4">
        {/* filters */}
        <div>
          <div>
            <div class="mb-3 position-relative">
              <input
                type="text"
                class="form-control"
                id="search"
                placeholder="search"
              />
              <IoSearchOutline />
            </div>
          </div>
        </div>
        // table
      </div>
    </section>
  );
};

export default QuizManagement;
