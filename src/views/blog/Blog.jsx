import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import AddComment from "../comments/addComment";
import "./styles.css";

const Blog = (props) => {
  const [blog, setBlog] = useState();
  const [isError, setIsError] = useState(false);

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
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/blogs/` + id, {
        headers: {
          Authorization: `Bearer ${authorToken}`,
        },
      });

      if (res.status == 401) {
        setIsError(true);
      }

      const json = await res.json();

      if (json) {
        setBlog(json);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {!blog && !isError && <p> loading </p>}

      {isError && (
        <h2
          style={{
            marginTop: "200px",
            marginLeft: "100px",
          }}
        >
          401 unauthorized. Please log in
        </h2>
      )}

      {blog && (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>

            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor
                  name={blog.author.name}
                  avatar={blog.author.avatar}
                />
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
            <h5 className="">Commenti : </h5>
            <Row className="">
              {blog.comments.map((comment, i) => (
                <Row
                  style={{
                    margin: 10,
                    border: "solid 2px lightgray",
                  }}
                >
                  <Col
                    key={`comment-${i}`}
                    sm={12}
                    className="d-flex m-2 justify-content-between align-items-center"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <img
                        src={`${comment.author.avatar}`}
                        alt=""
                        width="50px"
                        height="50px"
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />

                      <h5 className="ms-3">
                        {comment.author.name && comment.author.name}{" "}
                      </h5>
                    </div>
                    <div>
                      <Button className="me-3">Modify comment</Button>
                      <Button>Delete comment</Button>
                    </div>
                  </Col>
                  <Col>
                    <p> {comment.description} </p>
                  </Col>
                </Row>
              ))}
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default Blog;
