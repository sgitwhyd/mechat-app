import { NextPage } from "next";
import Link from "next/link";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";

import { AuthContext } from "@/store/context/AuthContext";
import Layout from "@/components/layout";
import { signInValidationSchema } from "@/validator/auth";
import Input from "@/components/ui/input";
import { useSignIn } from "@/services/auth.service";
import { AuthSignInProps } from "@/types/auth-store";
import Seo from "@/components/seo";

const SignIn: NextPage = () => {
  const router = useRouter();
  const { state } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (state.isAuthenticated) {
      router.push("/");
    }
  }, [router, state.isAuthenticated]);

  const { mutateAsync: signIn } = useSignIn();

  const handleSubmit = async (values: AuthSignInProps) => {
    try {
      setIsLoading(true);
      const { message } = await signIn({
        email: values.email,
        password: values.password,
      });

      alert(message);

      router.reload();
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout withTopBar title="Welcome">
      <Seo
        title="Sign In"
        description="This is a Sign in Page on this application"
      />
      <div className="flex-1 w-full px-[27px]">
        <h3 className="text-brand-2xl leading-brand-2xl font-bold">Sign In</h3>
        <p className="text-lg leading-[18px mt-[25px]">
          A simple application to chat with other people..
        </p>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={signInValidationSchema}
          onSubmit={async (values, { resetForm }) => {
            await handleSubmit(values);
            resetForm();
          }}
        >
          {({ errors }) => (
            <Form className="mt-[62px]">
              <Input
                label="Email"
                type="email"
                error={errors.email}
                placeholder="Enter Your Email"
              />
              <Input
                type="password"
                error={errors.password}
                label="Password"
                placeholder="Enter Your Password"
                isPasswordInput
              />
              <button
                disabled={isLoading}
                type="submit"
                className={`bg-brand-blue-500 disabled:opacity-50 rounded-[10px] w-full py-[19px] text-brand-xl leading-brand-xl font-bold text-white ${
                  isLoading ? "cursor-not-allowed" : ""
                }`}
              >
                Sign In
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-brand-blue-500 text-base font-semibold text-center mt-3">
          Don&apos;t have account ?{" "}
          <Link href="/sign-up" className="font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default SignIn;
