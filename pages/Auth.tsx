import React, { useCallback, useState } from "react";
import Input from "@/components/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { BsShieldLockFill } from "react-icons/bs";


const Auth = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [variant, setVariant] = useState<"login" | "register">("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    console.log(email, name, password);
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
    } catch (error) {
      console.log(error);
    }
    login();
  }, [name, email, password, login]);

  return (
    <div className="relative w-full h-full">
      <div className="w-full h-full lg:bg-opacity-60">
        <nav className="px-12 py-5 mb-12 bg-slate-600">
          <div className="flex">
            <BsShieldLockFill className="h-[2rem] w-[2rem] text-slate-200" />
            <p className="mt-[1px] text-lg text-slate-200 font-bold ml-2">
              eVault
            </p>
          </div>
        </nav>

        <div className="flex justify-center">
          <div className=" bg-slate-300 bg-opacity-70 px-12 sm:px-[10rem] lg:px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="mb-8 text-3xl font-bold text-zinc-800 font">
              {variant === "register" ? "Register" : "Sign in"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="name"
                  label="Username"
                  onChange={(e: any) => setName((prev) => e.target.value)}
                  value={name}
                />
              )}

              <Input
                id="email"
                label="Email"
                onChange={(e: any) => setEmail((prev) => e.target.value)}
                type="email"
                value={email}
              />

              <Input
                id="password"
                label="Password"
                onChange={(e: any) => setPassword((prev) => e.target.value)}
                type="password"
                value={password}
              />

              <button
                onClick={variant === "register" ? register : login}
                className="w-full py-3 mt-10 text-white transition rounded-md bg-slate-600 hover:bg-slate-800"
              >
                {variant === "register" ? "Sign up" : "Login"}
              </button>

              <p className="mt-12 text-neutral-500 font">
                {variant === "register"
                  ? "Already have an account?"
                  : "New User?"}
                <span
                  onClick={toggleVariant}
                  className="ml-2 text-black cursor-pointer hover:underline"
                >
                  {variant === "register" ? "Sign in" : "Create an account"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
