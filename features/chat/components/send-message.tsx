/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Image from "next/image";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

import EmojiPicker, {
  EmojiClickData,
  Emoji,
  EmojiStyle,
} from "emoji-picker-react";
import socket from "@/config/socket/socket";

type SendMessageProps = {
  room_id: string;
};

export const SendMessage = ({ room_id }: SendMessageProps) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [text, setText] = useState("");

  const handleSendMessage = (message: string) => {
    socket.emit("store-chat", {
      room_id: room_id as string,
      text: message,
    });
  };

  const schema = Yup.object({
    message: Yup.string().required("Message is required"),
  });

  const handlePickEmoji = (emojiData: EmojiClickData) => {
    setText(
      (prev) =>
        prev + (emojiData.isCustom ? emojiData.unified : emojiData.emoji)
    );

    console.log({
      text,
      emojiData,
    });
  };

  return (
    <>
      {showEmoji && (
        <div className="fixed bottom-0">
          <EmojiPicker
            height={400}
            autoFocusSearch={false}
            onEmojiClick={handlePickEmoji}
            emojiStyle={EmojiStyle.NATIVE}
          />
        </div>
      )}
      <Formik
        initialValues={{
          message: text,
        }}
        enableReinitialize={true}
        validationSchema={schema}
        onSubmit={({ message }, { resetForm }) => {
          handleSendMessage(message);
          setText("");
          resetForm();
        }}
      >
        {({ errors }) => (
          <Form className="flex justify-between py-5 pr-5 gap-3 z-20 bottom-0 bg-white fixed w-full max-w-lg">
            <div className="bg-brand-gray-400 rounded-[10px] py-[18px] pl-[18px] flex flex-col w-full ">
              <div className="flex gap-5">
                <button
                  type="button"
                  className="hover:bg-brand-gray-400 p-2 block rounded-full"
                  onClick={() => setShowEmoji(!showEmoji)}
                >
                  <Image
                    src="/assets/icons/emot.svg"
                    alt="emot icon"
                    width={24}
                    height={24}
                  />
                </button>
                <Field
                  name="message"
                  type="text"
                  placeholder="Write Here.."
                  className="bg-transparent w-full focus:outline-none"
                />
              </div>
              {errors.message && (
                <div className="text-xs text-red-500 mt-3">
                  {errors.message}
                </div>
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
    </>
  );
};
