import { NextPage } from "next";
import Link from "next/link";
import { Formik, Form } from "formik";
import { useState } from "react";

import Layout from "@/components/layout";
import Input from "@/components/ui/input";
import { signUpValidationSchema } from "@/validator/auth";
import { AuthSignUpProps } from "@/types/auth-store";
import { useSignUp } from "@/services/auth.service";
import Seo from "@/components/seo";

const SignUp: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync: signUp } = useSignUp();

  const handleSignUp = async (values: AuthSignUpProps) => {
    try {
      const { message } = await signUp(values);

      alert(message);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout withTopBar title="Create New Account">
      <Seo
        title="Sign Up"
        description="This is a Sign in Page on this application"
      />
      <div className="flex-1 w-full px-[27px]">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={signUpValidationSchema}
          onSubmit={async (values, { resetForm }) => {
            await handleSignUp(values);
            resetForm();
          }}
        >
          {({ errors }) => (
            <Form>
              <Input
                label="Name"
                type="text"
                error={errors.name}
                placeholder="Enter Your Name"
              />
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
                Register
              </button>
            </Form>
          )}
        </Formik>
        <p className="text-brand-blue-500 text-base font-semibold text-center mt-3">
          Have an account ?{" "}
          <Link href="/sign-in" className="font-bold">
            Sign in
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default SignUp;
