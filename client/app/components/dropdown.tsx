import React from "react";

interface DropdownProps {
  toggleDropdown: boolean;
  setToggleDropdown: Function;
  maxResults: number;
  setMaxResults: Function;
}

const Dropdown = ({
  toggleDropdown,
  setToggleDropdown,
  maxResults,
  setMaxResults,
}: DropdownProps) => {
  return (
    <>
      <div className="relative">
        <div className="inline-flex items-center overflow-hidden rounded-md border bg-gray-800">
          <a href="#" className="border-e px-4 py-2 text-sm/none text-gray-50">
            {maxResults}
          </a>

          <button
            onClick={() => {
              setToggleDropdown(!toggleDropdown);
            }}
            className="h-full p-2 text-gray-50 bg-gray-800"
          >
            <span className="sr-only">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {toggleDropdown ? (
          <div
            className="absolute end-0 z-10 mt-2 w-24 rounded-md border border-gray-100 bg-gray-800 shadow-lg"
            role="menu"
          >
            <div className="p-2">
              {[5, 10, 15, 20, 50, 100].map((num) => (
                <a
                  key={num}
                  onClick={() => {
                    setMaxResults(num);
                  }}
                  className="block rounded-lg px-4 py-2 text-sm text-gray-50 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
                  role="menuitem"
                >
                  {num}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Dropdown;
