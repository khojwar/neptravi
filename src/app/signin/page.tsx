"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/slices/authSlice";
import toast from "react-hot-toast";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import GoogleLoginButton from '@/components/auth/GoogleLoginButton';

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
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>

        <CardContent>
          <Formik
            initialValues={{
              username: "emilys",
              password: "emilyspass",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, status }) => (
              <Form className="space-y-4">
                {/* Username */}
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Field name="username">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        id="username"
                        placeholder="Enter username"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="username"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Password */}
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Field name="password">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        id="password"
                        type="password"
                        placeholder="Enter password"
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-sm text-red-500"
                  />
                  </div>

                {/* API Error */}
                {status && (
                  <p className="text-sm text-red-500">{status}</p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </Form>
            )}
          </Formik>

          {/* <p className="mt-4 text-sm">
            Test users:{" "}
            <a
              href="https://dummyjson.com/users"
              target="_blank"
              className="text-blue-500"
            >
              https://dummyjson.com/users
            </a>
          </p> */}

          {/* login with google: */}
            <GoogleLoginButton />

        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
