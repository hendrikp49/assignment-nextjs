import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
const LoginPage = () => {
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const [errors, setErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
        setLogin(true);
        setErrors(false);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      })
      .catch((err) => {
        setErrors(true);
        setErrorMessage(err.response.data.message);
      });
  };

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-cover text-white bg-[url('/img/asap.jpg')]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full max-w-xs px-5 duration-300 ease-in-out bg-transparent border border-teal-500 rounded-lg shadow-md backdrop-blur-md hover:shadow-2xl gap-7 py-7 shadow-teal-500 hover:shadow-teal-500"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-center text-teal-500">
              Login
            </h2>
            <p className="text-sm font-light text-center">Enter Your Detail</p>
          </div>
          {login && (
            <p className="px-5 py-1 mx-auto text-sm text-center bg-green-500 rounded-md w-fit">
              Login Successful!
            </p>
          )}
          {errors && (
            <p className="px-5 py-1 mx-auto text-sm text-center bg-red-500 rounded-md w-fit">
              {errorMessage}
            </p>
          )}
          <div className="flex flex-col gap-3 ">
            <div className="flex flex-col justify-between gap-2">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleChange}
                type="text"
                name="email"
                className="px-2 py-1 text-sm border rounded-md placeholder:text-slate-300 text-slate-600 focus:outline-teal-500"
                placeholder="example@mail.com"
              />
            </div>
            <div className="flex flex-col justify-between gap-2">
              <label htmlFor="password">Password</label>
              <input
                onChange={handleChange}
                type="text"
                name="password"
                className="px-2 py-1 text-sm border rounded-md placeholder:text-slate-300 text-slate-600 focus:outline-teal-500"
                placeholder="********"
              />
            </div>
          </div>
          <div className="space-y-2">
            <button
              type="submit"
              className="w-full py-1 text-white duration-200 ease-out bg-teal-600 rounded-lg hover:bg-teal-700"
            >
              Submit
            </button>
            <p className="text-sm font-light text-center">
              Don't have an account?{" "}
              <a className="text-teal-500 cursor-pointer hover:underline">
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
