import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (navRef.current && navRef.current.contains(target)) return;
      if (menuRef.current && menuRef.current.contains(target)) return;
      setOpen(false);
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <nav ref={navRef} className="relative bg-blue-900 text-white rounded-b-lg shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: desktop logo */}
          <div className="hidden md:flex items-center w-1/3">
            <img src="/src/YIMS-LOGO.png" alt="Logo" className="h-8 w-auto rounded-full" />
            <h1 className="ml-2 text-xl font-bold">Yogeshwara Institute</h1>
          </div>

          {/* Center: links on desktop, logo on mobile */}
          <div className="flex-1 flex justify-center items-center">
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="bg-white text-blue-900 px-4 py-2 rounded-full shadow-sm hover:shadow-md text-sm">Home</Link>
              <Link to="/about" className="bg-white text-blue-900 px-4 py-2 rounded-full shadow-sm hover:shadow-md text-sm">About</Link>
              <Link to="/courses" className="bg-white text-blue-900 px-4 py-2 rounded-full shadow-sm hover:shadow-md text-sm">Courses</Link>
              <Link to="/admissions" className="bg-white text-blue-900 px-4 py-2 rounded-full shadow-sm hover:shadow-md text-sm">Admissions</Link>
              <Link to="/contact" className="bg-white text-blue-900 px-4 py-2 rounded-full shadow-sm hover:shadow-md text-sm">Contact</Link>
            </div>

            <div className="md:hidden flex items-center justify-center">
              <div className="flex flex-col items-center">
                <img src="/src/YIMS-LOGO.png" alt="Logo" className="h-8 w-8 rounded-full" />
                
              </div>
              <h1 className="ml-2 text-xl font-bold">Yogeshwara Institute</h1>
            </div>
          </div>

          {/* Right: login on desktop, hamburger on mobile */}
          <div className="flex items-center justify-end w-1/3">
            <div className="hidden md:block">
              <Link to="/login" className="bg-white text-blue-900 px-4 py-2 rounded-full inline-block shadow-sm hover:shadow-md">Login</Link>
            </div>

            <div className="md:hidden ml-2">
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="relative p-2 inline-flex items-center justify-center rounded-md hover:bg-blue-800 transition-colors"
              >
                <svg className={`h-6 w-6 absolute transform transition-opacity duration-200 ${open ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg className={`h-6 w-6 absolute transform transition-opacity duration-200 ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref={menuRef} className={`md:hidden absolute left-0 right-0 top-full flex justify-center px-4 pb-4 overflow-hidden transition-[max-height,opacity,padding] duration-300 ease-in-out ${open ? 'max-h-96 opacity-100 py-4 pointer-events-auto' : 'max-h-0 opacity-0 py-0 pointer-events-none'}`} style={{ zIndex: 9999 }}>
        <div className={`w-full bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 ${open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`} aria-hidden={!open}>
          <div className="relative py-4 px-4 sm:px-6">
            {/* Decorative corner edges */}
            <span className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-sm transform rotate-12 shadow-md" aria-hidden />
            <span className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-bl from-blue-600 to-blue-400 rounded-sm transform -rotate-12 shadow-md" aria-hidden />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src="/src/YIMS-LOGO.png" alt="Logo" className="h-8 w-auto rounded-full mr-3" />
                <span className="font-roman text-base text-blue-900 font-semibold">YIMS</span>
              </div>
            </div>

            <nav className="mt-2" role="menu">
              <Link to="/" onClick={() => setOpen(false)} role="menuitem" className="block">
                <div className="flex items-center gap-4 py-2 px-4 rounded-full bg-gray-50 border border-gray-100 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200">
                  <span className="w-1 h-6 rounded bg-transparent group-hover:bg-blue-500 transition-colors" />
                  <span className="text-lg font-arial text-blue-900">Home</span>
                </div>
              </Link>

              <Link to="/about" onClick={() => setOpen(false)} role="menuitem" className="block">
                <div className="flex items-center gap-4 py-2 px-4 rounded-full bg-gray-50 border border-gray-100 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200">
                  <span className="w-1 h-6 rounded bg-transparent group-hover:bg-blue-500 transition-colors" />
                  <span className="text-lg font-arial text-blue-900">About</span>
                </div>
              </Link>

              <Link to="/courses" onClick={() => setOpen(false)} role="menuitem" className="block">
                <div className="flex items-center gap-4 py-2 px-4 rounded-full bg-gray-50 border border-gray-100 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200">
                  <span className="w-1 h-6 rounded bg-transparent group-hover:bg-blue-500 transition-colors" />
                  <span className="text-lg font-arial text-blue-900">Courses</span>
                </div>
              </Link>

              <Link to="/admissions" onClick={() => setOpen(false)} role="menuitem" className="block">
                <div className="flex items-center gap-4 py-2 px-4 rounded-full bg-gray-50 border border-gray-100 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200">
                  <span className="w-1 h-6 rounded bg-transparent group-hover:bg-blue-500 transition-colors" />
                  <span className="text-lg font-arial text-blue-900">Admissions</span>
                </div>
              </Link>

              <Link to="/contact" onClick={() => setOpen(false)} role="menuitem" className="block">
                <div className="flex items-center gap-4 py-2 px-4 rounded-full bg-gray-50 border border-gray-100 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200">
                  <span className="w-1 h-6 rounded bg-transparent group-hover:bg-blue-500 transition-colors" />
                  <span className="text-lg font-arial text-blue-900">Contact</span>
                </div>
              </Link>
            </nav>

            <div className="mt-2">
              <Link to="/login" onClick={() => setOpen(false)} className="block w-full text-center bg-gradient-to-r from-blue-700 to-blue-500 text-white py-2 rounded-full shadow-sm">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
