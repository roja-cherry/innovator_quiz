import React, { useEffect } from "react";
import ScheduleForm from "../../../components/schedule/ScheduleForm";
import { useAppContext } from "../../../context/AppContext";

export const Publish = () => {
  const {setTitle} = useAppContext()
  
    useEffect(() => {
      setTitle("Schedule Quiz")

      return () => setTitle("")
    }, [])
  return (
    <section className="publish-page">
      <div className="quiz-form-container mt-4">
        <ScheduleForm />
      </div>
    </section>
  );
};
