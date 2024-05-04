import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import AddComment from "../comments/addComment";
import "./styles.css";

const Blog = (props) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const authorToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const { id } = params;
    console.log(id);

    getPosts(id);
  }, []);

  async function getPosts(id) {
    try {
      const res = await fetch("http://localhost:3000/blogs/" + id, {
        headers: {
          Authorization: `Bearer ${authorToken}`,
        },
      });
      const json = await res.json();

      //console.log(json)
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
          <AddComment></AddComment>
        </Container>
        <Container>
          <h2 className="">Commenti : </h2>
          <Row className="">
            {blog.comments.map((comment, i) => (
              <Col
                key={`comment-${i}`}
                sm={12}
                style={{
                  margin: 10,
                  border: "solid 2px lightgray",
                }}
              >
                <span width="200px">
                  <img src={`${comment.author.avatar}`} alt="" width="100px" />
                </span>
                <span width="200px">
                  <h5>{comment.author.name && comment.author.name} </h5>
                </span>
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
