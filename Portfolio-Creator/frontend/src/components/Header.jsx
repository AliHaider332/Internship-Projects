import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, } from 'lucide-react';
import { useState, useEffect } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Navigation items (external link handled properly)
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/portfolio-builder', label: 'Portfolio Builder' },
    {
      external: 'https://internship-projects-1gqx.vercel.app/',
      label: 'My Portfolio',
    },
    { path: '/about', label: 'About' },
  ];

  const isActivePath = (path) => {
    if (!path) return false;
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg text-gray-900'
          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            aria-label="Ali Tools Home"
          >
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <Sparkles
                className={`w-7 h-7 transition-colors duration-300 ${
                  isScrolled
                    ? 'text-indigo-600 group-hover:text-purple-600'
                    : 'text-yellow-300 group-hover:text-yellow-200'
                } animate-pulse`}
              />
            </div>
            <h1
              className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${
                isScrolled
                  ? 'text-gray-900 group-hover:text-indigo-600'
                  : 'text-white'
              }`}
            >
              Ali Tools
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <ul className="flex space-x-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        isScrolled
                          ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        isActivePath(item.path)
                          ? isScrolled
                            ? 'text-indigo-600 bg-indigo-50 font-semibold'
                            : 'text-white bg-white/20 font-semibold'
                          : isScrolled
                          ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                      {isActivePath(item.path) && (
                        <span
                          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${
                            isScrolled ? 'bg-indigo-600' : 'bg-yellow-300'
                          }`}
                        />
                      )}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
              isScrolled
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
          }`}
        >
          <nav className="border-t pt-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a
                      href={item.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isScrolled
                          ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isActivePath(item.path)
                          ? isScrolled
                            ? 'text-indigo-600 bg-indigo-50 font-semibold'
                            : 'text-white bg-white/20 font-semibold'
                          : isScrolled
                          ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                          : 'text-white/90 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
