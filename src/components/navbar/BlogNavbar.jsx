import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./styles.css";
import { useEffect, useState } from "react";

const NavBar = (props) => {
  const [currentAuthor, setCurrentAuthor] = useState();

  useEffect(() => {
    setCurrentAuthor(JSON.parse(localStorage.getItem("currentAuthor")));
  }, []);

  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentAuthor");
    window.location.reload();
  }

  return (
    <Navbar expand="lg" className="blog-navbar" fixed="top">
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/">
          <img className="blog-navbar-brand" alt="logo" src={logo} />
        </Navbar.Brand>
        <Button
          as={Link}
          to="/new"
          className="blog-navbar-add-button bg-dark"
          size="lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16"
          >
            <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
          </svg>
          Nuovo Articolo
        </Button>
      </Container>
      <Container className="justify-content-end">
        <Navbar.Brand className="d-flex align-items-center">
          {currentAuthor && (
            <>
              {" "}
              <p className="fs-5 ms-2 me-2 mb-0">{currentAuthor.name}</p>
              <img
                src={currentAuthor.avatar}
                alt=""
                width="50px"
                style={{
                  border: "solid 1px",
                  borderRadius: "50%",
                }}
              />
            </>
          )}
        </Navbar.Brand>
        {currentAuthor == null && (
          <>
            <Button as={Link} to="/login" className="bg-dark" size="lg">
              Login
            </Button>
            <Button as={Link} to="/register" className="bg-dark" size="lg">
              Register
            </Button>
          </>
        )}
        {currentAuthor && (
          <Button onClick={() => handleLogout()} className="bg-dark" size="lg">
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
