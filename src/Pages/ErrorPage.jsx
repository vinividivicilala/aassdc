import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <>
      <main className="grid min-h-screen place-items-center bg-gradient-to-r from-gray-100 to-gray-300 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="mb-4 text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 lg:text-9xl">
            404
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-800 sm:text-6xl">
            Oops! Page not found.
          </h1>
          <p className="mt-6 text-lg leading-7 text-gray-700">
            Sorry, we couldn’t find the page you’re looking for. Maybe the link is broken or the page has been removed.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-y-4 sm:gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform transform hover:scale-105 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go Back Home
            </Link>
            <Link
              to="/contact"
              className="rounded-md border border-indigo-600 px-5 py-3 text-sm font-semibold text-indigo-600 shadow-lg transition-transform transform hover:scale-105 hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default ErrorPage;
