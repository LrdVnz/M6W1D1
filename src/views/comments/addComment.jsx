import { Container, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function AddComment() {
    const { id } = useParams();

    async function handleSubmit(event){
        event.preventDefault();

        const commentData = JSON.stringify({
            "comment": {
           "description" : event.target.elements["input-description"].value
            }
        })

        try {
            const res = await fetch(`http://localhost:3000/blogs/${id}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3IiOnsiX2lkIjoiNjYzMjc2NzIxNGE1MGFkZmNkOWUzMTA2IiwibmFtZSI6IkV2aWxUb2J5IiwibGFzdE5hbWUiOiJQb3J0b1JpY2FuIG1hbiAiLCJwYXNzd29yZCI6IiQyYiQxMCQuZkVUbFZRY3VMdHIzS1J4b3BDNkouZDh0cHdLZW1RZXdZNkdraUFWSjMuSGN5WW5KRDVxZSIsImVtYWlsIjoidG9ieUB0b2J5LmNvbSIsImJpcnRoRGF0ZSI6IjExLzA5LzIwMDEiLCJhdmF0YXIiOiJodHRwczovL2hlbGlvcy1pLm1hc2hhYmxlLmNvbS9pbWFnZXJ5L2FydGljbGVzLzAyZ1F0d2ZXVWJScmU0SWt0UGFHZm13L2ltYWdlcy0xLmZpbGwuc2l6ZV8yMDAweDEzMzMudjE2MTE3MDcxNDguanBnIiwiX192IjowfSwiaWF0IjoxNzE0NTkxNTczfQ.S2jr1J4pCv0koQaU3zMVgfnzG3hjZTBjmERAsa8mxVA"
                }, 
                body: commentData
            });

            console.log(res)
        } catch(err) {
            console.log(err)
        }
    }

    return(
        <Container fluid="sm"> 
            <h2>Aggiungi un commento</h2>
            <Form onSubmit={handleSubmit}> 
             <Form.Group controlId="input-name"> 
                <Form.Label> Author Name </Form.Label>
                <Form.Control 
                type="text"
                />
             </Form.Group>
             <Form.Group controlId="input-description"> 
                <Form.Label> Comment Description </Form.Label>
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