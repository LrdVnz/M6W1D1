import React, { useCallback, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./styles.css";
import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
const NewBlogPost = (props) => {
  const [text, setText] = useState("");
  const handleChange = useCallback((value) => {
    setText(draftToHtml(value));
    // console.log(convertToRaw(value.getCurrentContent()))
  });

  const authorToken = localStorage.getItem("accessToken");

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", event.target.elements["blog-form"].value);
    formData.append("content", text);
    formData.append("category", event.target.elements["blog-category"].value);
    formData.append("cover", event.target.elements["blog-cover"].files[0]);
    formData.append("readTime[value]", 10);
    formData.append("readTime[unit]", "mins");

    try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blogs/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${authorToken}`
            },
            body: formData,
        });

        console.log(res)
        window.location.reload()
    } catch (err) {
        console.log(err)
    }
}

  return (
    <Container className="new-blog-container">
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Form.Group controlId="blog-form" className="mt-3">
          <Form.Label>Titolo</Form.Label>
          <Form.Control size="lg" placeholder="Title" />
        </Form.Group>
        <Form.Group controlId="blog-category" className="mt-3">
          <Form.Label>Categoria</Form.Label>
          <Form.Control size="lg" as="select">
            <option>Categoria 1</option>
            <option>Categoria 2</option>
            <option>Categoria 3</option>
            <option>Categoria 4</option>
            <option>Categoria 5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="blog-content" className="mt-3">
          <Form.Label>Contenuto Blog</Form.Label>

          <Editor
            value={text}
            onChange={handleChange}
            className="new-blog-content"
          />
        </Form.Group>
        <Form.Group controlId="blog-cover">
          <Form.Label> Carica la cover dell'articolo: </Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Group className="d-flex mt-3 justify-content-end">
          <Button type="reset" size="lg" variant="outline-dark">
            Reset
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="dark"
            style={{
              marginLeft: "1em",
            }}
          >
            Invia
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default NewBlogPost;
