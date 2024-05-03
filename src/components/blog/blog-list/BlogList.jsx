import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = props => {
  const [ blogs, setBlogs ] = useState()
  
  useEffect(() => {
      getPosts() 
  }, [])

  async function getPosts() {
    try {
      const res = await fetch("http://localhost:3000/blogs");     
      const json = await res.json(); 
      
      ///console.log(json)
      setBlogs(json)

    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Row>
      { !blogs && <p> loading </p>}

      { blogs && blogs.map((post, i) => (
        <Col
          key={`item-${i}`}
          md={4}
          style={{
            marginBottom: 50,
          }}
        >
          <BlogItem key={post.title} {...post} />
        </Col>
      ))}
    </Row>
  );
};

export default BlogList;
