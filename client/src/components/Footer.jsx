import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer container className="border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Logo */}
          <div>
            <Link to="/" className="text-xl font-semibold">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded text-white">
                Sahand's
              </span>{" "}
              Blog
            </Link>
          </div>

          {/* About */}
          <div>
            <h2 className="mb-2 font-semibold">About</h2>
            <ul className="space-y-1 text-sm text-gray-500">
              <li>
                <a href="https://www.100jsprojects.com" target="_blank">
                  100 JS Projects
                </a>
              </li>
              <li>
                <Link to="/about">Sahand's Blog</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="mb-2 font-semibold">Legal</h2>
            <ul className="space-y-1 text-sm text-gray-500">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Sahand's Blog
          </p>

          <div className="flex gap-5 text-xl">
            <BsFacebook />
            <BsInstagram />
            <BsTwitter />
            <BsGithub />
            <BsDribbble />
          </div>
        </div>
      </div>
    </Footer>
  );
}
