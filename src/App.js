import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionList from "./components/QuestionList";
import QuestionDetail from "./components/QuestionDetail";
import QuestionSlider from "./components/QuestionSlider";
import BottomNavigation from "./components/BottomNavigation";

const App = () => {
  return (
    <Router>
      <div style={{ paddingBottom: "60px" }}>
        {/* Основной контент */}
        <Routes>
          <Route path="/" element={<QuestionList />} />
          <Route path="/question/:id" element={<QuestionDetail />} />
          <Route path="/slider" element={<QuestionSlider />} />
        </Routes>
      </div>
      {/* Нижняя навигация */}
      <BottomNavigation />
    </Router>
  );
};

export default App;
