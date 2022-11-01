import Card from "react-bootstrap/Card";
import "./customCard.style.css";

export const CustomCard = ({ title, count }) => {
  return (
    <Card style={{ minwidth: "18rem" }}>
      <Card.Body className="text-center py-3 text-light">
        <Card.Title className="m-5 fs-1">{count}</Card.Title>
        <Card.Text className="fw-bolder fs-5">{title}</Card.Text>
      </Card.Body>
    </Card>
  );
};
