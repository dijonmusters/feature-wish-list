import { FormEventHandler } from "react";
import type { NextPage } from "next";
import supabase from "../lib/supabase";

const Login: NextPage = () => {
  const signIn: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) return;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log({ data, error });
  };

  return (
    <form onSubmit={signIn}>
      <input
        type="text"
        name="email"
        placeholder="jon@example.com"
        className="border border-1 block"
      />
      <input
        type="password"
        name="password"
        placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
        className="border border-1 block"
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Login;
