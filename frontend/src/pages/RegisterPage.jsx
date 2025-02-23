import { useState, useContext, useActionState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import { registration } from "../context/AuthAction";

const RegisterPage = () => {
  const { message, dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name == "" || email === "" || password === "") {
      toast.error("Fill all fields");
    } else {
      const data = await registration(formData);

      if (data.success) {
        dispatch({ type: "REGISTRATION", payload: data });
        toast.success(data.message);

        //clear fields
        setFormData({
          name: "",
          email: "",
          password: "",
        });

        navigate("/login");
      } else {
        toast.error(data.message);
      }
    }
  };

  return (
    <>
      <section className="py-10">
        <div className="container">
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="max-w-md rounded-lg bg-white px-8 py-6 shadow-md">
              <h1 className="mb-4 text-center text-2xl font-bold">Register</h1>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                    placeholder="Kwaku Ananse"
                    value={name}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                    placeholder="your@email.com"
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="focus:border-indigo-500 focus:ring-indigo-500 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none"
                    placeholder="Enter your password"
                    value={password}
                    onChange={onChange}
                  />
                </div>

                <div className="flex items-center mb-3">
                  <p className="text-sm text-gray-400 mr-1">
                    Already have an account?{" "}
                  </p>
                  <Link to="/login" className="text-sm text-primary ">
                    Login
                  </Link>
                </div>

                <button
                  type="submit"
                  name="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
