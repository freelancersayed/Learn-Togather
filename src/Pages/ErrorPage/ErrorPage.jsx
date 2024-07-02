

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-500">404</h1>
        <p className="text-2xl md:text-3xl font-medium mt-4">Oops! Page not found</p>
        <p className="text-gray-600 mt-2">Sorry, the page you're looking for doesn't exist.</p>
        <a href="/" className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-300">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;