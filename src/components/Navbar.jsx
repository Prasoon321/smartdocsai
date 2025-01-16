import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";
import { useAuth0 } from "@auth0/auth0-react";
import AlterComponent from "../components/AlterComponent";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [isauthenticated, setIsauthenticated] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };
  useEffect(() => {
    if (isAuthenticated && user) {
      // Storing relevant user details in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: user.email,
          name: user.name,
          picture: user.picture,
          authToken: true,
        })
      );
    }
  }, [isAuthenticated, user, navigate]);
  const userLogIn = () => {
    if (!isAuthenticated) {
      setShowAlert(true); // Show the alert if not authenticated
    } else {
      setIsauthenticated(true);
      navigate(`/dashboard`); // Redirect to dashboard if authenticated
    }
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      {showAlert && <AlterComponent />}
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src={logo} alt="Logo" />
            <span className="text-xl tracking-tight">VirtualR</span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <a
              className="py-2 px-3 border rounded-md"
              onClick={() => userLogIn()}
            >
              Sign In
            </a>

            <a
              className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
              onClick={() => loginWithRedirect()}
            >
              Create an account
            </a>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <a href="#" className="py-2 px-3 border rounded-md">
                Sign In
              </a>
              <a
                href="#"
                className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
              >
                Create an account
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
