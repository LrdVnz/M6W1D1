import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const GoogleLogin = () => {
  // const { currentAuthor, authToken } = useParams();
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const currentAuthor = searchParams.get("currentAuthor");
    const authToken = searchParams.get("authToken");

    console.log(currentAuthor);
    console.log(authToken);

    localStorage.setItem("accessToken", authToken);
    localStorage.setItem("currentAuthor", currentAuthor);

    navigate("/");
  });

  return <p> Successfully logged in with google. </p>;
};

export default GoogleLogin;
