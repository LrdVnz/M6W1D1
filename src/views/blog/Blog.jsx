import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
/* import posts from "../../data/posts.json"; */
import "./styles.css";

const Blog = (props) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const { id } = params;
    console.log(id);
    /* const blog = posts.find(post => post._id.toString() === id); */

    getPosts(id);
  }, []);

  async function getPosts(id) {
    try {
      const res = await fetch("http://localhost:3000/blogs/" + id);
      const json = await res.json();

      if (json) {
        setBlog(json);
        setLoading(false);
      } else {
        navigate("/404");
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor name={blog.author.name} avatar={blog.author.avatar} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`lettura da ${blog.readTime.value} ${blog.readTime.unit}`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </Container>
        <Container>
          <h2>Commenti : </h2>
          <Row>
            {blog.comments.map((comment, i) => (
              <Col
                key={`comment-${i}`}
                sm={12}
                style={{
                  margin: 10,
                  border: "solid 2px lightgray"
                }}
              >
                <h3> {comment.name} </h3>
                <p> {comment.description} </p>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
};

export default Blog;
