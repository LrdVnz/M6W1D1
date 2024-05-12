import { Container, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

export default function AddComment() {
  const { id } = useParams();

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    const authorToken = localStorage.getItem("accessToken");
    const commentData = JSON.stringify({
      comment: {
        description: event.target.elements["input-description"].value,
      },
    });

    try {
      const res = await fetch(`http://localhost:3000/blogs/${id}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authorToken}`,
        },
        body: commentData,
      });

      window.location.reload();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container fluid="sm">
      <h4>Aggiungi un commento:</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="input-description">
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-center">
          <Button type="submit" size="lg" variant="dark">
           
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
