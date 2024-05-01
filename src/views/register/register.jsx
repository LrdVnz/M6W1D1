import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles.css"

export default function Login() {

    const navigate = useNavigate()

    async function handleSubmit(event){
        event.preventDefault();

        const loginData = JSON.stringify({
            name : event.target.elements["input-name"].value,
            lastName : event.target.elements["input-lastname"].value,
            password : event.target.elements["input-password"].value,
            email : event.target.elements["input-email"].value,
            birthDate : event.target.elements["input-birthdate"].value,
            avatar : event.target.elements["input-avatar"].value,
        })

        try {
            const res = await fetch("http://localhost:3000/authors/register", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                }, 
                body: loginData
            });

            navigate("/")
            console.log(res)
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <Container fluid="sm"> 
            <h1 className="blog-main-title" >Registrati: </h1>
            <Form onSubmit={handleSubmit}> 
             <Form.Group controlId="input-name"> 
                <Form.Label> Nome </Form.Label>
                <Form.Control 
                type="text"
                />
             </Form.Group>
             <Form.Group controlId="input-lastname"> 
                <Form.Label> Cognome</Form.Label>
                <Form.Control
                type="text" />
             </Form.Group>
             <Form.Group controlId="input-password"> 
                <Form.Label> Password </Form.Label>
                <Form.Control
                type="password" />
             </Form.Group>
             <Form.Group controlId="input-email"> 
                <Form.Label> Email </Form.Label>
                <Form.Control
                type="email" />
             </Form.Group>
             <Form.Group controlId="input-birthdate"> 
                <Form.Label> Data di Nascita </Form.Label>
                <Form.Control
                type="text" />
             </Form.Group>
             <Form.Group controlId="input-avatar"> 
                <Form.Label> Link al tuo avatar :  </Form.Label>
                <Form.Control
                type="text" />
             </Form.Group>
           <Form.Group className="d-flex mt-3 justify-content-center">
            <Button
            type="submit"
            size="lg"
            variant="dark"
            
           >  Invia
            </Button>
            </Form.Group>
            </Form>
        </Container>
    )

}