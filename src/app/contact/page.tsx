"use client";

import React, { useState } from "react";
import { Input } from "../_components/Input";

const Contact: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<{
    name: string;
    email: string;
    message: string;
  }>({ name: "", email: "", message: "" });
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleClear = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newError = { name: "", email: "", message: "" };
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (name.length === 0) {
      newError.name = "お名前は必須です。";
    } else if (name.length > 30) {
      newError.name = "お名前は30文字以内で入力してください。";
    }

    if (email.length === 0) {
      newError.email = "メールアドレスは必須です。";
    } else if (!emailPattern.test(email)) {
      newError.email = "メールアドレスの形式が正しくありません。";
    }

    if (message.length === 0) {
      newError.message = "本文は必須です。";
    } else if (message.length > 500) {
      newError.message = "本文は500文字以内で入力してください。";
    }

    if (
      newError.name !== "" ||
      newError.email !== "" ||
      newError.message !== ""
    ) {
      setErrors(newError);
      return;
    } else {
      setErrors({ name: "", email: "", message: "" });
      setDisabled(true);
    }

    try {
      const response = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        }
      );
      if (response.ok) {
        alert("送信しました");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setName("");
      setEmail("");
      setMessage("");
      setDisabled(false);
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto mt-20">
        <h2 className="font-bold text-2xl mb-10 text-center">
          お問い合わせフォーム
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="w-48" htmlFor="name">
              お名前
            </label>
            <div className="w-full">
              <Input
                type="text"
                id="name"
                name="name"
                value={name}
                disabled={disabled}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="text-red-700">{errors.name}</div>
            </div>
          </div>
          <div className="flex gap-2 items-center mt-5">
            <label className="w-48" htmlFor="email">
              メールアドレス
            </label>
            <div className="w-full">
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                disabled={disabled}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="text-red-700">{errors.email}</div>
            </div>
          </div>
          <div className="flex gap-2 items-center mt-5">
            <label className="w-48" htmlFor="message">
              本文
            </label>
            <div className="w-full">
              <textarea
                className="border border-slate-400 w-full rounded-md h-50 p-3"
                name="message"
                id="message"
                value={message}
                disabled={disabled}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="text-red-700">{errors.message}</div>
            </div>
          </div>
          <div className="mt-10 flex justify-center gap-4">
            <button
              className={`bg-slate-900 py-2 px-4 rounded-md text-white font-bold  ${
                disabled === true ? "cursor-default" : "cursor-pointer"
              }`}
              type="submit"
              disabled={disabled}
            >
              送信
            </button>
            <button
              className={`bg-neutral-300 py-2 px-4 rounded-md text-slate-900 font-bold ${
                disabled === true ? "cursor-default" : "cursor-pointer"
              }`}
              type="button"
              disabled={disabled}
              onClick={handleClear}
            >
              クリア
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
