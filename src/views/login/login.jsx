import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./styles.css"

export default function Login() {

    const navigate = useNavigate()

    async function handleSubmit(event){
        event.preventDefault();

        const loginData = JSON.stringify({
            name : event.target.elements["input-username"].value,
            password : event.target.elements["input-password"].value
        })

        try {
            const res = await fetch("http://localhost:3000/authors/login", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                }, 
                body: loginData
            });

            const json = await res.json()
            const authToken = json.accessToken 
            localStorage.setItem('accessToken', authToken)
            navigate("/")
            console.log(res)
            console.log("logged in...")
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <Container fluid="sm"> 
            <h1 className="blog-main-title" >Effettua il login con il tuo username e la tua password:</h1>
            <Form onSubmit={handleSubmit}> 
             <Form.Group controlId="input-username"> 
                <Form.Label> Username </Form.Label>
                <Form.Control 
                type="text"
                />
             </Form.Group>
             <Form.Group controlId="input-password"> 
                <Form.Label> Password </Form.Label>
                <Form.Control
                type="password" />
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