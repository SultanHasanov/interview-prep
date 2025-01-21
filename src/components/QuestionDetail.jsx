import React, { useEffect, useState } from "react";
import { useParams, Link} from "react-router-dom";
import { motion } from "framer-motion";
import { Card, Button, Typography, Space, Spin } from "antd";
import axios from "axios";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title} = Typography;

const API_URL = "https://1fb1af6fd6340d08.mokky.dev/items";

const contentStyle = {
  padding: 50,
//   background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const QuestionDetail = () => {
  const { id } = useParams();
  const [questionData, setQuestionData] = useState(null);
  const [isBlurred, setIsBlurred] = useState(true);

//   const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setQuestionData(response.data);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };
    fetchQuestion();
  }, [id]);

  if (!questionData) {
    return <Spin tip="Loading" size="large">
    {content}
  </Spin>
  }

  const toggleBlur = () => setIsBlurred((prev) => !prev);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <Card>
        <Space direction="vertical" size="middle">
          <Title level={4}>{questionData.question}</Title>
          <motion.div
            initial={{ filter: "blur(10px)" }}
            animate={{ filter: isBlurred ? "blur(4px)" : "blur(0px)" }}
            transition={{ duration: 0.3}}
            onClick={toggleBlur}
            style={{
              cursor: "pointer",
              whiteSpace: "pre-wrap",
              padding: "10px",
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
            }}
          >
            {questionData.answer}
          </motion.div>
          <Button type="dashed" >
          <ArrowLeftOutlined /> <Link to="/">Назад</Link>
        </Button>
          {/* <Button type="primary">
            <Link to="/">Назад</Link>
          </Button> */}
        </Space>
      </Card>
    </div>
  );
};

export default QuestionDetail;
