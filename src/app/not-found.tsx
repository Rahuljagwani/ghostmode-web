import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-2xl p-5 sm:p-10 border border-gray-200 shadow-sm">
          <p className="text-sm font-medium text-sky-500 mb-3">404</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Page not found
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors text-sm shadow-sm"
            >
              Back to Home
            </Link>
            <Link
              href="/download"
              className="border border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-medium transition-colors text-sm"
            >
              Download
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
