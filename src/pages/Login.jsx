import { useEffect, useRef } from "react";
import { CiLogin } from "react-icons/ci";
import { userAuth } from "../store/userAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const loginInp = useRef({ email: "", password: "" });

  let { login, user } = userAuth();

  useEffect(() => {
    if (user.name) {
      return navigate("/home");
    }
  }, [user]);

  async function handleSubmit(event) {
    event.preventDefault();
    let email = loginInp.current.email.value;
    let password = loginInp.current.password.value;
    loginInp.current.email.value = "";
    loginInp.current.password.value = "";
    try {
      toast.loading("Logging In ....", { id: "login" });
      await login(email, password);
      toast.success("Logged In Successfully", { id: "login" });
      navigate("/home");
    } catch (err) {
      if (err.status == 401 || err.status == 403) {
        toast.error(err.message, { id: "login" });
      } else {
        toast.error("Unable to Login", { id: "login" });
      }
    }
  }

  return (
    <div className="flex w-full h-full mt-10">
      <div className="w-1/2 p-8 xs:flex hidden justify-center">
        <img
          src="/airobot.png"
          alt="robot"
          className="w-[300px] drop-shadow-[0_0_35px_rgba(165,243,252,0.5)]"
        />
      </div>
      <div className="grow">
        <div className="flex min-h-full flex-col px-6 py-10 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm max-xs:mb-10">
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200 animate-pulse ">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="sm:space-y-6 space-y-12" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-200"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                    ref={(el) => {
                      loginInp.current.email = el;
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-200"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    minLength={6}
                    className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                    ref={(el) => {
                      loginInp.current.password = el;
                    }}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login <CiLogin className="text-xl mt-0.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
