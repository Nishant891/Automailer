"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import Dropdown from "../components/dropdown";
import EmailTable from "../components/email_table";
import { classifyEmail } from "../functions/gemini";
import EmailViewer from "../components/email_viewer";

interface EmailId {
  id: string;
  threadId: string;
}

export interface Email {
  id: string;
  date: string;
  from: string;
  to: string;
  subject: string;
  message: string;
  classification: string;
}

interface User {
  name: string;
  email: string;
  picture: string;
}

const Dashbaord = () => {
  const router = useRouter();

  const [user, setUser] = useState<User>({
    name: "John Doe",
    email: "johndoe@gmail.com",
    picture:
      "https://lh3.googleusercontent.com/a/ACg8ocLYjk_vf1WQLJhTp-Sl5PddSdijIiZ2CpshDzO_G1RlZZnM7w=s96-c",
  });

  //Array of objects of type email
  const [emails, setEmails] = useState<Email[]>([]);

  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  const [toggleEmailViewer, setToggleEmailViewer] = useState<boolean>(false);

  //Current email that will be in view
  const [emailInView, setEmailInView] = useState<Email>({
    id: "",
    date: "",
    from: "",
    to: "",
    subject: "",
    message: "",
    classification: "",
  });

  //Will be used when we retrieve emails helps to limit the number of response
  const [maxResults, setMaxResults] = useState<number>(5);

  //Remove all cookie and redirect to home page
  const handleLogOut = () => {
    Cookies.remove("access_token");
    Cookies.remove("expires_in");
    Cookies.remove("refresh_token");
    router.push("/");
  };

  //Classify the emails classifyEmail is in gemini.ts
  const handleClassification = async () => {
    const classifiedEmailPromises = emails.map(async (email) => {
      const classification = await classifyEmail(email.message);
      return { ...email, classification };
    });
    const classifiedEmails = await Promise.all(classifiedEmailPromises);
    setEmails(classifiedEmails);
  };

  // check cookies for access_token and if present return it
  const checkCookies = () => {
    //Please note we are not checking for expiry.
    const accessToken = Cookies.get("access_token") as string;
    if (!accessToken) {
      router.push("/");
      return;
    }
    return accessToken;
  };

  useEffect(() => {
    // fetch user information
    const fetchData = async () => {
      const access_token = checkCookies() as string;
      const response = await fetch(
        `http://127.0.0.1:5000/getUserData?access_token=${access_token}`,
        {
          method: "post",
        }
      );
      const data = await response.json();
      if (data.success) {
        const { name, email, picture } = data.data;
        setUser({ name, email, picture });
      } else {
        fetchData();
      }
    };

    fetchData();
  }, []);

  //Yet another useEffect to fetch emails of the user
  useEffect(() => {
    const fetchEmailIds = async () => {
      const access_token = checkCookies() as string;
      const response = await fetch(
        `http://127.0.0.1:5000/getUserEmails?access_token=${access_token}&maxResults=${maxResults}`,
        {
          method: "post",
        }
      );
      const data = await response.json();
      const emailIds = data.data.messages;
      const emailPromises = emailIds.map((emailId: EmailId) =>
        fetchEmail(emailId.id, access_token)
      );

      //Returns an array of emails when all promises are fullfield
      const newEmails = await Promise.all(emailPromises);
      setEmails(newEmails);
    };

    const fetchEmail = async (id: string, access_token: string) => {
      const response = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`,
        {
          method: "GET",
          headers: new Headers({ Authorization: `Bearer ${access_token}` }),
        }
      );
      const data = await response.json();
      let email: Email = {
        id: data.id,
        date: "",
        from: "",
        to: "",
        subject: "",
        message: data.snippet,
        classification: "Classify",
      };
      if (data.payload && data.payload.headers) {
        Array.from(data.payload.headers).forEach((header: any) => {
          if (
            header.name == "Date" ||
            header.name == "From" ||
            header.name == "To" ||
            header.name == "Subject"
          ) {
            email = { ...email, [header.name.toLowerCase()]: header.value };
          }
        });
      }
      return email;
    };

    fetchEmailIds();
  }, [maxResults]);

  return (
    <div className="h-screen w-screen flex flex-col gap-2 justify-center items-center bg-gray-50 p-2">
      <div className="h-[3rem] sm:w-[34rem] w-full flex justify-between items-center border border-gray-900 rounded-lg bg-gray-800 p-2">
        <div className="flex gap-3 justify-center items-center">
          <Image
            className="rounded-full"
            width={30}
            height={30}
            src={user.picture}
            alt="Profile Image"
          />
          <div className="flex flex-col text-start text-gray-300">
            <p className="text-[14px]">{user.name}</p>
            <p className="text-[14px]">{user.email}</p>
          </div>
        </div>
        <div>
          <button className="p-2 rounded-md bg-red-500 text-white">
            <p className="text-[12px]" onClick={handleLogOut}>
              LOG OUT
            </p>
          </button>
        </div>
      </div>
      <div className="h-[3rem] sm:w-[34rem] w-full flex justify-between items-center p-2">
        <Dropdown
          toggleDropdown={toggleDropdown}
          setToggleDropdown={setToggleDropdown}
          maxResults={maxResults}
          setMaxResults={setMaxResults}
        />
        <button
          onClick={handleClassification}
          className="p-2 rounded-md bg-green-500 text-white"
        >
          <p className="text-[14px]">Classify</p>
        </button>
      </div>
      <EmailTable
        emails={emails}
        toggleEmailViewer={toggleEmailViewer}
        setToggleEmailViewer={setToggleEmailViewer}
        setEmailInView={setEmailInView}
      />
      {toggleEmailViewer ? (
        <EmailViewer
          emailInView={emailInView}
          toggleEmailViewer={toggleEmailViewer}
          setToggleEmailViewer={setToggleEmailViewer}
        />
      ) : null}
    </div>
  );
};

export default Dashbaord;
