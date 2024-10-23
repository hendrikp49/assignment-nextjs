import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
const LoginPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: loginData.email,
      password: loginData.password,
    };
    const config = {
      headers: {
        apiKey: "w05KkI9AWhKxzvPFtXotUva-",
        "Content-Type": "application/json",
      },
    };

    axios
      .post(
        "https://api-bootcamp.do.dibimbing.id/api/v1/login",
        payload,
        config
      )
      .then((res) => {
        setCookie("token", res.data.token);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      })
      .catch((err) => console.log(err.response));
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            type="text"
            name="email"
            className="border"
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="text"
            name="password"
            className="border"
          />
          <button type="submit" className="border">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
