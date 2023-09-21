/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import socket from "@/config/socket/socket";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

type SendMessageProps = {
  room_id: string;
};

const SendMessage = ({ room_id }: SendMessageProps) => {
  const handleSendMessage = (message: string) => {
    socket.emit("store-chat", {
      room_id: room_id as string,
      text: message,
    });
  };
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
        handleSendMessage(message);
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
              />
              <Field
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
          <button type="submit" className="w-[100px] cursor-pointer">
            <div className="w-[60px] h-[60px] bg-brand-blue-500 rounded-full flex items-center justify-center">
              <Image
                src="/assets/icons/send-icons.svg"
                alt="send icon"
                width={24}
                height={24}
              />
            </div>
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SendMessage;
