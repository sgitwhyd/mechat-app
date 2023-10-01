/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import { useSendChat } from "@/services/chat.service";
import { useAuthContext } from "@/store/context/AuthContext";

export const SendMessage = () => {
  const { state } = useAuthContext();
  const { mutate: sendMessage, isLoading } = useSendChat();

  const schema = Yup.object({
    message: Yup.string().required("Message is required"),
  });

  return (
    <Formik
      initialValues={{
        message: "",
      }}
      validationSchema={schema}
      onSubmit={({ message }, { resetForm }) => {
        sendMessage({ text: message, roomId: state.room?._id as string });
        resetForm();
      }}
    >
      {({ errors }) => (
        <Form className="flex justify-between py-5 pr-5 gap-3 bottom-0 bg-white fixed w-full max-w-lg">
          <div className="bg-brand-gray-400 rounded-[10px] py-[18px] pl-[18px] flex flex-col w-full ">
            <div className="flex gap-5">
              <Image
                src="/assets/icons/emot.svg"
                alt="emot icon"
                width={24}
                height={24}
                className=" w-6 h-6"
              />
              <Field
                as="input"
                name="message"
                type="text"
                placeholder="Write Here.."
                className="bg-transparent w-full focus:outline-none"
              />
            </div>
            {errors.message && (
              <div className="text-xs text-red-500 mt-3">{errors.message}</div>
            )}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-[100px] cursor-pointer"
          >
            <div className="w-[60px] h-[60px] bg-brand-blue-500 rounded-full flex items-center justify-center">
              {isLoading ? (
                <div
                  className="w-1 h-1  animate-spin rounded-full"
                  style={{
                    boxShadow: "10px 0 0 5px white, -10px 0 0 5px white",
                  }}
                ></div>
              ) : (
                <Image
                  src="/assets/icons/send-icons.svg"
                  alt="send chat icon"
                  width={24}
                  height={24}
                />
              )}
            </div>
          </button>
        </Form>
      )}
    </Formik>
  );
};
