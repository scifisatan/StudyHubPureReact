import { Link, useLocation } from "react-router-dom";
import React from "react";
const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const capitalizeFirstLetter = (word: string) => {
    try {
      if (!word) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    } catch (error) {
      console.error("Error capitalizing word:", error);
      return word;
    }
  };

  return (
    <nav className="pb-4">
      <ol className="flex space-x-2">
        <li>
          <Link to="/">Home</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <React.Fragment key={to}>
              <span className="mx-2">/</span> {/* Separator */}
              {isLast ? (
                <li className="text-gray-500">
                  {capitalizeFirstLetter(value)}
                </li>
              ) : (
                <li>
                  <Link to={to}>{capitalizeFirstLetter(value)}</Link>
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;