"use client";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  useEffect(() => {
    console.log("session?.status :>> ", session?.status);
    if (session?.status === "authenticated") {
      router.replace("/users");
    }
  }, [session?.status]);

  const onSubmit = (formData) => {
    console.log("formData :>> ", formData);
    setIsLoading(true);
    if (variant === "REGISTER") {
      axios.post("/api/register", formData).then(() => {
        () => signIn("credentials", formData);
      });
    } else if (variant === "LOGIN") {
      signIn("credentials", {
        ...formData,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            console.error("Invalid credentials");
          }
          if (callback?.ok && !callback?.error) {
            console.log("Logged in!");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    // NextAuth Social Sign In
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <Form
          className="space-y-6"
          onFinish={onSubmit}
          layout="vertical"
          initialValues={{
            name: "dd",
            email: "",
            password: "",
          }}
        >
          {variant === "REGISTER" && (
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
          )}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Button className="w-full" htmlType="submit" type="primary">
            {variant === "LOGIN" ? "Sign in" : "Register"}
          </Button>
        </Form>

        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-500 dark:after:border-neutral-500">
          <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
            OR
          </p>
        </div>
        <div>
          <a
            className="mb-3 flex w-full items-center justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            style={{ backgroundColor: "#3b5998" }}
            href="#!"
            role="button"
            data-twe-ripple-init=""
            data-twe-ripple-color="light"
          >
            {/* Facebook */}
            <span className="me-2 fill-white [&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
                <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
              </svg>
            </span>
            Continue with Facebook
          </a>
          <a
            className="mb-3 flex w-full items-center justify-center rounded bg-info px-7 pb-2.5 pt-3 text-center text-sm font-medium uppercase leading-normal text-white shadow-info-3 transition duration-150 ease-in-out hover:bg-info-accent-300 hover:shadow-info-2 focus:bg-info-accent-300 focus:shadow-info-2 focus:outline-none focus:ring-0 active:bg-info-600 active:shadow-info-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            style={{ backgroundColor: "#55acee" }}
            href="#!"
            role="button"
            data-twe-ripple-init=""
            data-twe-ripple-color="light"
          >
            {/* X */}
            <span className="me-2 fill-white [&>svg]:h-3.5 [&>svg]:w-3.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                {/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
                <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
              </svg>
            </span>
            Continue with X
          </a>
        </div>
        <div className="flex items-center justify-center text-sm">
          {variant === "LOGIN" ? (
            <span>
              You New?{" "}
              <span onClick={() => setVariant("REGISTER")}>Register</span>
            </span>
          ) : (
            <span>
              Already have a account?{" "}
              <span onClick={() => setVariant("LOGIN")}>Login</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
