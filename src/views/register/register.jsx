import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function Login() {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    console.log(event.target.elements)
    const formData = new FormData();

    formData.append('name', event.target.elements["input-name"].value);
    formData.append('lastName', event.target.elements["input-lastname"].value);
    formData.append('password', event.target.elements["input-password"].value);
    formData.append('email', event.target.elements["input-email"].value);
    formData.append('birthDate', event.target.elements["input-birthdate"].value);
    formData.append('avatar', event.target.elements["input-avatar"].files[0]);
  
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}authors/register`, {
        method: "POST",
        body: formData, 
      });
  
      navigate("/");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container fluid="sm">
      <h1 className="blog-main-title">Registrati: </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="input-name">
          <Form.Label> Nome </Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group controlId="input-lastname">
          <Form.Label> Cognome</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        <Form.Group controlId="input-password">
          <Form.Label> Password </Form.Label>
          <Form.Control type="password" />
        </Form.Group>
        <Form.Group controlId="input-email">
          <Form.Label> Email </Form.Label>
          <Form.Control type="email" />
        </Form.Group>
        <Form.Group controlId="input-birthdate">
          <Form.Label> Data di Nascita </Form.Label>
          <Form.Control type="date" />
        </Form.Group>
        <Form.Group controlId="input-avatar">
          <Form.Label> Carica il tuo avatar : </Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-center">
          <Button type="submit" size="lg" variant="dark">
            invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
}
