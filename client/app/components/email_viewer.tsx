import React from "react";
import { Email } from "../dashboard/page";

interface EmailViewerProps {
  toggleEmailViewer: boolean;
  setToggleEmailViewer: Function;
  emailInView: Email;
}

const EmailViewer = ({
  emailInView,
  toggleEmailViewer,
  setToggleEmailViewer,
}: EmailViewerProps) => {
  return (
    <div className="fixed right-0 w-1/2 h-full block overflow-y-scroll bg-gray-900 rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
      <span className="absolute inset-x-0 bottom-0 h-2"></span>

      <button
        onClick={() => {
          setToggleEmailViewer(!toggleEmailViewer);
        }}
        className="absolute top-2 left-2 rounded-md px-[0.6rem] py-[0.2rem] text-gray-50 text-center border border-gray-50 bg-red-600"
      >
        X
      </button>

      <div className="mt-14">
        <p className="text-pretty text-xl text-gray-50">
          <span className="font-bold text-gray-50">FROM : </span>
          {emailInView.from}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-pretty text-md text-gray-100">
          <span className="font-bold text-gray-50">SUBJECT : </span>
          {emailInView.subject}
        </p>
      </div>

      <div className="mt-4">
        <p className="text-pretty text-sm text-gray-200">
          <span className="font-bold text-gray-50">MESSAGE : </span>
          {emailInView.message}
        </p>
      </div>

      <dl className="mt-6 flex gap-4 sm:gap-6">
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-500">
            <span className="font-bold text-gray-50">CLASSIFICATION : </span>
            {emailInView.classification}
          </dt>
          <dd className="text-sm text-gray-400">
            <span className="font-bold text-gray-50">DATE : </span>
            {emailInView.date}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default EmailViewer;
