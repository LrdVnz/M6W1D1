import { useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const { currentAuthor, authToken } = useParams();
  const navigate = useNavigate()
  
  useEffect(() =>{

  localStorage.setItem("accessToken", authToken);
  localStorage.setItem("currentAuthor", currentAuthor);

  navigate("/");

  })

  return <p> Successfully logged in with google. </p>;
};

export default GoogleLogin;
