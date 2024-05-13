import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const [blogs, setBlogs] = useState();
  const [isError, setIsError] = useState(false);

  const authorToken = localStorage.getItem("accessToken");

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blogs`, {
        headers: {
          Authorization: `Bearer ${authorToken}`,
        },
      });

      if (res.status == 401) {
        setIsError(true);
      }

      const json = await res.json();

      if (json) {
        setBlogs(json);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Row>
      {!blogs && !isError && <p> loading </p>}

      {isError && <h2>401 unauthorized. Please log in</h2>}

      {blogs &&
        blogs.map((post, i) => (
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
