import { useRef, useEffect } from "react";
import { CiLogin } from "react-icons/ci";
import { userAuth } from "../store/userAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const signupInp = useRef({ name: "", email: "", password: "" });
  const { signup, user } = userAuth();

  useEffect(() => {
    if (user.name) {
      return navigate("/home");
    }
  }, [user]);

  async function handleSubmit(event) {
    event.preventDefault();
    let email = signupInp.current.email.value;
    let password = signupInp.current.password.value;
    let name = signupInp.current.name.value;
    signupInp.current.name.value = "";
    signupInp.current.email.value = "";
    signupInp.current.password.value = "";
    try {
      await signup(email, password, name);
      toast.success("Signed In successfully", { id: "signup" });
      navigate("/home");
    } catch (err) {
      if (err.status == 401 || err.status == 403) {
        toast.error(err.message, { id: "signup" });
      } else {
        toast.error("Something went wrong", { id: "signup" });
      }
    }
  }

  return (
    <div className="flex w-full h-full mt-10">
      <div className="w-1/2 p-8 xs:flex hidden justify-center items-center">
        <img
          src="/airobot.png"
          alt="robot"
          className="w-[300px] drop-shadow-[0_0_35px_rgba(165,243,252,0.5)]"
        />
      </div>
      <div className="grow">
        <div className="flex min-h-full flex-col px-6 lg:px-8 ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm max-xs:mb-10">
            <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200 animate-pulse">
              Sign up to Chat
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="sm:space-y-6 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-200"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="name"
                    required
                    className="block w-full px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                    ref={(el) => {
                      signupInp.current.name = el;
                    }}
                  />
                </div>
              </div>

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
                      signupInp.current.email = el;
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
                      signupInp.current.password = el;
                    }}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full xs:mt-8 mt-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up <CiLogin className="text-xl mt-0.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
