import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-700">
          YourSchool
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <NavLink to="/" className="hover:text-blue-600">Home</NavLink>
          <NavLink to="/about" className="hover:text-blue-600">About</NavLink>
          <NavLink to="/courses" className="hover:text-blue-600">Courses</NavLink>
          <NavLink to="/gallery" className="hover:text-blue-600">Gallery</NavLink>
          <NavLink to="/notice" className="hover:text-blue-600">Notice</NavLink>
          <NavLink to="/contact" className="hover:text-blue-600">Contact</NavLink>
        </div>

        {/* Desktop login buttons */}
        <div className="hidden md:flex gap-3">
          <Link to="/login" className="px-3 py-1 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white">Admin</Link>
          <Link to="/student-login" className="px-3 py-1 border border-green-600 rounded-lg hover:bg-green-600 hover:text-white">Student</Link>
          <Link to="/teacher-login" className="px-3 py-1 border border-purple-600 rounded-lg hover:bg-purple-600 hover:text-white">Teacher</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white shadow-inner px-5 py-4 space-y-4">

          <NavLink onClick={() => setOpen(false)} to="/" className="block">Home</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/about" className="block">About</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/courses" className="block">Courses</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/gallery" className="block">Gallery</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/notice" className="block">Notice</NavLink>
          <NavLink onClick={() => setOpen(false)} to="/contact" className="block">Contact</NavLink>

          <div className="pt-3 flex flex-col gap-2">
            <Link to="/admin-login" className="border px-3 py-2 rounded">Admin Login</Link>
            <Link to="/student-login" className="border px-3 py-2 rounded">Student Login</Link>
            <Link to="/teacher-login" className="border px-3 py-2 rounded">Teacher Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
