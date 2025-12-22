"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignIn = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (
    values: { username: string; password: string },
    {
      setSubmitting,
      setStatus,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      setStatus: (status: string | null) => void;
    }
  ) => {
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer dummy", // your working fix
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          expiresInMins: 30,
        }),
        credentials: "omit",
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();

      // save in redux
      dispatch(
        loginSuccess({
          user: data,
          token: data.accessToken,
        })
      );

      // LocalStorage (for hydration)
      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: data,
          token: data.accessToken,
        })
      );

      // save token in cookie (middleware-readable)
      document.cookie = `token=${data.accessToken}; path=/; max-age=${30 * 60}`;

      toast.success("Successfully logged in!");

      router.push("/profile");
    } catch (error) {
      console.error(error);
      setStatus("Invalid username or password");
    } finally {
      setSubmitting(false);
    }
  };

return (
    <div className="flex justify-center items-center min-h-screen mx-auto">
      <div className="max-w-md w-full p-6 border rounded">
        <h1 className="text-2xl mb-4">Login using DummyJSON</h1>

        <Formik
          initialValues={{
            username: 'emilys',
            password: 'emilyspass',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, status }) => (
            <Form className="space-y-4">
              {/* Username */}
              <div>
                <Field
                  name="username"
                  type="text"
                  placeholder="Username"
                  className="w-full p-2 border"
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Password */}
              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 border"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white p-2 disabled:bg-blue-300"
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>

              {/* API Error */}
              {status && <p className="text-red-500">{status}</p>}
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-sm">
          Test users:{' '}
          <a
            href="https://dummyjson.com/users"
            target="_blank"
            className="text-blue-500"
          >
            https://dummyjson.com/users
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
