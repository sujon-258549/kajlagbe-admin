import { Link } from "react-router";
import CustomButton from "../../Components/ui/Button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      {/* Visual Element */}
      <div className="relative mb-8">
        <h1 className="text-[150px] font-black text-gray-100 leading-none select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/images/logo/logo.png"
            alt="Kajlagbe"
            className="h-16 object-contain opacity-20 grayscale"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md space-y-4">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Page Not Found
        </h2>
        <p className="text-gray-500 text-lg leading-relaxed">
          Oops! The page you are looking for might have been removed, had its
          name changed, or is temporarily unavailable.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
        <Link to="/">
          <CustomButton variant="primary" size="lg" icon={<Home size={18} />}>
            Back to Home
          </CustomButton>
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-primary font-semibold transition-colors group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
