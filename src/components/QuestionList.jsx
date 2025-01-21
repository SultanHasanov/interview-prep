import React, { useEffect, useState } from "react";
import { Button, Card, Input, Space, Spin } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";


const API_URL = "https://1fb1af6fd6340d08.mokky.dev/items";

const contentStyle = {
  padding: 50,
  //   background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const QuestionList = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1); // Для отслеживания текущей страницы
  const [isLoading, setIsLoading] = useState(false);
  console.log(title);
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${API_URL}?page=${page}&question=*${title}`
        );
        console.log(response.data.items);
        setQuestions((prev) => {
          // Проверяем, если данные не пустые, то добавляем
          if (response.data.items.length > 0) {
            return [...prev, ...response.data.items];
          }
          return prev;
        });
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [page, title]);

  if (questions.length === 0) {
    return (
      <Spin tip="Loading" size="large">
        {content}
      </Spin>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Search by title"
        style={{ marginBottom: "20px" }}
      />
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Сетка карточек */}

        {questions.map(({ id, question }) => (
          <Card
            key={id}
            style={{
              height: "auto", // Карточка растягивается по содержимому
              wordWrap: "break-word", // Перенос длинных слов
              whiteSpace: "normal", // Текст отображается без обрезки
            }}
          >
            {/* Текст вопроса внутри содержимого */}
            <div style={{ marginBottom: "16px", fontSize: "16px" }}>
              <b>{`${id}.`}</b> {question}
            </div>
            <Link className="linkstyle" to={`/question/${id}`}>
              Подробнее...
            </Link>
          </Card>
        ))}
      </Space>

      <Button
        disabled={isLoading}
        type="primary"
        onClick={() => setPage((prev) => prev + 1)}
      >
        Еще...
      </Button>
      {isLoading && <Spin tip="Loading" size="large" />}
    </div>
  );
};

export default QuestionList;
