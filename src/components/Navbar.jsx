import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Home, TrendingUp, Wallet, User, LogOut, 
  CreditCard, LayoutDashboard, MessageCircle, Globe 
} from 'lucide-react';
import { toast } from 'react-toastify';
import { LanguageContext } from '../context/LanguageContext';

const Navbar = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useContext(LanguageContext);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const navLinks = isAuthenticated ? [
    { path: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { path: '/market', label: t('market'), icon: TrendingUp },
    { path: '/invest', label: t('invest'), icon: TrendingUp },
    { path: '/withdraw', label: t('withdraw'), icon: Wallet },
    { path: '/profile', label: t('profile'), icon: User },
    { 
      path: 'https://wa.me/555189396823', 
      label: t('support'), 
      icon: MessageCircle, 
      external: true 
    },
  ] : [
    { path: '/', label: t('home'), icon: Home },
    { path: '/market', label: t('market'), icon: TrendingUp },
    { path: '/login', label: t('login'), icon: User },
    { path: '/register', label: t('register'), icon: CreditCard },
    { 
      path: 'https://wa.me/555189396823', 
      label: t('support'), 
      icon: MessageCircle, 
      external: true 
    },
  ];

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      toast.success(t('logout_success'));
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || t('logout_failed'));
    }
  };

  const toggleLanguage = (lang) => {
    setLanguage(lang);
    setShowLangDropdown(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">ARK</span>
              <span className="text-sm text-gray-500">invest</span>
            </Link>
            
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                if (link.external) {
                  return (
                    <a
                      key={link.path}
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-blue-600"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </a>
                  );
                }
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-1 text-sm font-medium transition-colors
                      ${location.pathname === link.path 
                        ? 'text-blue-600' 
                        : 'text-gray-600 hover:text-blue-600'}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language.toUpperCase()}</span>
                </button>
                {showLangDropdown && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                    <button
                      onClick={() => toggleLanguage('pt')}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${language === 'pt' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
                    >
                      Português
                    </button>
                    <button
                      onClick={() => toggleLanguage('en')}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${language === 'en' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
                    >
                      English
                    </button>
                  </div>
                )}
              </div>

              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t('logout')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
        <div className="px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-1">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">ARK</span>
          </Link>
          
          <div className="flex items-center space-x-3">
            {/* Mobile Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Globe className="w-5 h-5 text-gray-600" />
              </button>
              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  <button
                    onClick={() => toggleLanguage('pt')}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${language === 'pt' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
                  >
                    Português
                  </button>
                  <button
                    onClick={() => toggleLanguage('en')}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${language === 'en' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
                  >
                    English
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                if (link.external) {
                  return (
                    <a
                      key={link.path}
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                    </a>
                  );
                }
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors
                      ${location.pathname === link.path 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'hover:bg-gray-50'}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">{t('logout')}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Bottom Navigation */}
      {isAuthenticated && (
        <div className="md:hidden fixed bottom-0 w-full bg-white border-t z-40">
          <div className="flex justify-around items-center py-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              if (link.external) {
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center p-2 text-gray-600"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs mt-1">{link.label}</span>
                  </a>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex flex-col items-center p-2 transition-colors
                    ${location.pathname === link.path 
                      ? 'text-blue-600' 
                      : 'text-gray-600'}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs mt-1">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;