import { Container, Form, Button } from "react-bootstrap";
import "./styles.css"

export default function Login() {

    return(
        <Container fluid="sm"> 
            <h1 class="blog-main-title" >Effettua il login con il tuo username e la tua password:</h1>
            <Form> 
             <Form.Group> 
                <Form.Label> Username </Form.Label>
                <Form.Control />
             </Form.Group>
             <Form.Group> 
                <Form.Label> Password </Form.Label>
                <Form.Control />
             </Form.Group>
           <Form.Group className="d-flex mt-3 justify-content-center">
            <Button // da centrare !!!
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