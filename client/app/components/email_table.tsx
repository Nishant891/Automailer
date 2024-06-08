import React from "react";
import { Email } from "../dashboard/page";

interface EmailTableProps {
  emails: Email[];
  toggleEmailViewer: boolean;
  setToggleEmailViewer: Function;
  setEmailInView: Function;
}

const EmailTable = ({
  emails,
  toggleEmailViewer,
  setToggleEmailViewer,
  setEmailInView,
}: EmailTableProps) => {

  //Whenever user clicks an email toggle the email view and set the emailInView that has the data of current email
  const handleEmailClick = (id: string) => {
    const currentEmail = emails.find((email) => {
      return email.id == id;
    });
    setEmailInView(currentEmail);
    setToggleEmailViewer(!toggleEmailViewer);
  };
  return (
    <>
      <section className="container px-4 mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="border border-gray-200 dark:border-gray-700">
                <div className="overflow-y-scroll h-[74vh]">
                  <table className="w-full">
                    <thead className="bg-gray-800">
                      <tr>
                        <th className="w-1/6 px-6 py-3 text-xs font-medium text-start text-gray-300 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="w-1/6 px-6 py-3 text-xs font-medium text-start text-gray-300 uppercase tracking-wider">
                          From
                        </th>
                        <th className="w-1/6 px-6 py-3 text-xs font-medium text-start text-gray-300 uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="w-2/6 px-6 py-3 text-xs font-medium text-start text-gray-300 uppercase tracking-wider">
                          Message
                        </th>
                        <th className="w-1/6 px-6 py-3 text-xs font-medium text-start text-gray-300 uppercase tracking-wider">
                          Classification
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-gray-900">
                      {emails.map((email) => (
                        <tr
                          key={email.id}
                          onClick={() => {
                            handleEmailClick(email.id);
                          }}
                          className="cursor-pointer"
                        >
                          <td className="w-1/6 px-6 py-4 text-sm text-gray-100 overflow-hidden">
                            {email.date}
                          </td>
                          <td className="w-1/6 px-6 py-4 text-sm text-gray-100 overflow-hidden">
                            {email.from}
                          </td>
                          <td className="w-1/6 px-6 py-4 text-sm text-gray-100 overflow-hidden">
                            {email.subject.length > 30
                              ? `${email.subject.substring(0, 30)}...`
                              : email.subject}
                          </td>
                          <td className="w-2/6 px-6 py-4 text-sm text-gray-100 overflow-hidden">
                            {email.message.length > 100
                              ? `${email.message.substring(0, 100)}...`
                              : email.message}
                            <a
                              className="text-blue-500"
                              target="blank"
                              href={`https://mail.google.com/mail/u/0/#inbox/${email.id}`}
                            >
                              {" "}
                              Link
                            </a>
                          </td>
                          <td className="w-1/6 px-6 py-4 text-sm text-gray-100 overflow-hidden">
                            {(() => {
                              const trimmedClassification = email.classification
                                .trim()
                                .toLowerCase();
                              if (trimmedClassification === "important") {
                                return (
                                  <div
                                    className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-600 bg-emerald-200`}
                                  >
                                    <h2 className="text-sm font-normal">
                                      {email.classification}
                                    </h2>
                                  </div>
                                );
                              } else if (trimmedClassification === "social") {
                                return (
                                  <div
                                    className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-blue-600 bg-blue-200`}
                                  >
                                    <h2 className="text-sm font-normal">
                                      {email.classification}
                                    </h2>
                                  </div>
                                );
                              } else if (trimmedClassification === "spam") {
                                return (
                                  <div
                                    className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-600 bg-red-200`}
                                  >
                                    <h2 className="text-sm font-normal">
                                      {email.classification}
                                    </h2>
                                  </div>
                                );
                              } else if (
                                trimmedClassification === "promotional"
                              ) {
                                return (
                                  <div
                                    className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-blue-600 bg-blue-200`}
                                  >
                                    <h2 className="text-sm font-normal">
                                      {email.classification}
                                    </h2>
                                  </div>
                                );
                              } else if (
                                trimmedClassification === "marketing"
                              ) {
                                return (
                                  <div
                                    className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-yellow-600 bg-yellow-200`}
                                  >
                                    <h2 className="text-sm font-normal">
                                      {email.classification}
                                    </h2>
                                  </div>
                                );
                              } else if (trimmedClassification === "classify") {
                                return (
                                  <div
                                    className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-gray-300 bg-gray-700`}
                                  >
                                    <h2 className="text-sm font-normal">
                                      {email.classification}
                                    </h2>
                                  </div>
                                );
                              }
                            })()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EmailTable;
