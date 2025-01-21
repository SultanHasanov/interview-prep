import React, { useEffect, useState } from "react";
import { Card, Button, Typography, Space, Spin } from "antd";
import { motion } from "framer-motion";
import axios from "axios";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

const { Title} = Typography;

const API_URL = "https://1fb1af6fd6340d08.mokky.dev/items";

const contentStyle = {
  padding: 50,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
//   background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const QuestionSlider = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBlurred, setIsBlurred] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(API_URL);
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  if (questions.length === 0) {
    return (
      <Spin tip="Loading" size="large">
        {content}
      </Spin>
    );
  }

  const toggleBlur = () => {
    setIsBlurred((prev) => !prev);
  };

  const nextQuestion = () => {
    setIsBlurred(true);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    setIsBlurred(true);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const { question, answer } = questions[currentIndex];

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Card>
        <Space direction="vertical" size="middle">
          <Title level={4}>{question}</Title>
          <motion.div
            initial={{ filter: "blur(10px)" }}
            animate={{ filter: isBlurred ? "blur(4px)" : "blur(0px)" }}
            transition={{ duration: 0.3 }}
            onClick={toggleBlur}
            style={{
              cursor: "pointer",
              whiteSpace: "pre-wrap",
              padding: "10px",
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
            }}
          >
            {answer}
          </motion.div>
          <Space>
            <Button
              type="primary"
              onClick={prevQuestion}
              disabled={currentIndex === 0}
            >
            <ArrowLeftOutlined />   Назад
            </Button>
            <Button
              type="primary"
              onClick={nextQuestion}
              disabled={currentIndex === questions.length - 1}
            >
              Далее  <ArrowRightOutlined />
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
};

export default QuestionSlider;
