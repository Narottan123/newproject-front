import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  return <Navigate to={token ? "/dashboard" : "/login"} replace />;
};

export default Home;
