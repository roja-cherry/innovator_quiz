import { useEffect } from "react";
import ScheduleForm from "../../../components/schedule/ScheduleForm";
import { useAppContext } from "../../../context/AppContext";

export const EditPublish = () => {
  const {setTitle} = useAppContext()

  useEffect(() => {
    setTitle("Re-Schedule Quiz")
    return () => setTitle("")
  }, [])

  return (
    <section className="container-fluid p-5 publish-page">
      <div className="quiz-form-container p-5 mt-4">
        <ScheduleForm isEdit />
      </div>
    </section>
  );
};
