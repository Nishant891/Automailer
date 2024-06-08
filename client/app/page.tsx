"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import googleButton from "@/public/google_signin_buttons/web/1x/btn_google_signin_dark_pressed_web.png";
import Image from "next/image";
import Cookies from "js-cookie";

export default function Home() {
  //const [apikey, setApikey] = useState<string>("");
  const router = useRouter();

  //Check if access_token is present
  useEffect(() => {
    const checkCookies = async () => {
      const accessToken = await Cookies.get("access_token");
      if (accessToken) {
        router.push("/dashboard");
      }
    };
    checkCookies();
  }, []);

  //Function to hit googleapi for signin
  async function auth() {
    //localStorage.setItem("apikey", apikey);
    const response = await fetch("http://127.0.0.1:5000/request", {
      method: "post",
    });
    const data = await response.json();
    //redirect to the consent page
    router.push(data.url);
  }

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-gray-50">
        <div className="h-[30rem] max-w-[24rem] flex flex-col justify-center items-center text-center gap-4 p-2 border border-gray-900 rounded-md">
          <h1 className="text-3xl font-bold">Welcome to Email Classifier!</h1>
          <p className="text-md font-semibold">
            We help you classify your emails therefore making it easy for you to
            delete, save and unsuscribe emails accordingly.
          </p>
          <button
            //disabled={apikey.length === 0}
            type="button"
            onClick={() => auth()}
          >
            <Image className="" src={googleButton} alt="google sign in" />
          </button>
        </div>
      </div>
    </>
  );
}
