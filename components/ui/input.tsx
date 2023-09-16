import React, { useState } from "react";
import { Field } from "formik";
import Image from "next/image";

type InputProps = {
  label?: string;
  type: string;
  error: string | undefined;
  placeholder: string;
  isPasswordInput?: boolean;
};

const Input = ({
  label,
  type,
  error,
  placeholder,
  isPasswordInput = false,
}: InputProps) => {
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  return (
    <div className="mb-[26px]">
      <label htmlFor={label} className="text-brand-xl leading-brand-xl ">
        {label}
      </label>

      {isPasswordInput ? (
        <div className="relative flex items-center">
          <Field
            name={label?.toLocaleLowerCase()}
            type={isPasswordOpen ? "text" : "password"}
            placeholder="Enter Your Password"
            className="w-full rounded-[10px] mt-2 py-[21px] pl-[27px] bg-brand-gray-400 border border-brand-gray-500 focus:outline-none"
          />
          <div
            className="absolute right-5 pt-2 cursor-pointer"
            onClick={() => setIsPasswordOpen(!isPasswordOpen)}
          >
            <Image
              src={
                isPasswordOpen
                  ? "/assets/icons/eye-slash.svg"
                  : "/assets/icons/eye.svg"
              }
              alt="eye slash"
              width={24}
              height={24}
            />
          </div>
        </div>
      ) : (
        <Field
          name={label?.toLocaleLowerCase()}
          type={type}
          placeholder={placeholder}
          className="w-full rounded-[10px] mt-2 py-[21px] pl-[27px] bg-brand-gray-400 border border-brand-gray-500 focus:outline-none"
        />
      )}

      {error && <div className="text-xs text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default Input;
