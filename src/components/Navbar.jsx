// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, X, Home, TrendingUp, Wallet, User, LogOut, 
  CreditCard, LayoutDashboard, MessageCircle, Globe, ChevronDown 
} from 'lucide-react';
import { toast } from 'react-toastify';

const Navbar = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const location = useLocation();

  // --- Helper to open Smartsupp chat ---
  const openSupportChat = () => {
    if (window.smartsupp) {
      window.smartsupp('open');
    } else {
      toast.info('Chat carregando, tente novamente em alguns segundos.');
    }
  };

  // Build nav links based on auth status
  const navLinks = isAuthenticated ? [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/market', label: 'Mercado', icon: TrendingUp },
    { path: '/invest', label: 'Investir', icon: TrendingUp },
    { path: '/withdraw', label: 'Sacar', icon: Wallet },
    { path: '/profile', label: 'Perfil', icon: User },
    { 
      label: 'Suporte', 
      icon: MessageCircle,
      action: openSupportChat  // ← replaces WhatsApp link
    },
  ] : [
    { path: '/', label: 'Início', icon: Home },
    { path: '/market', label: 'Mercado', icon: TrendingUp },
    { path: '/login', label: 'Entrar', icon: User },
    { path: '/register', label: 'Cadastrar', icon: CreditCard },
    { 
      label: 'Suporte', 
      icon: MessageCircle,
      action: openSupportChat  // ← replaces WhatsApp link
    },
  ];

  // Logout
  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      toast.success("Logout realizado com sucesso");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Falha ao sair");
    }
  };

  // Google Translate initialization
  const initializeGoogleTranslate = () => {
    // ... (keep existing function) ...
  };
  useEffect(() => {
    if (showLangDropdown) {
      setTimeout(initializeGoogleTranslate, 100);
    }
  }, [showLangDropdown]);

  const switchLanguage = (langCode) => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
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
                // Handle action buttons (e.g., Support chat)
                if (link.action) {
                  return (
                    <button
                      key={link.label}
                      onClick={link.action}
                      className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </button>
                  );
                }
                // External links (none remaining, but keep as fallback)
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
                // Regular internal links
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
                  <span>Idioma</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {showLangDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    <div id="google_translate_element" className="px-3 py-1"></div>
                    <div className="border-t my-1"></div>
                    <div className="px-3 py-1">
                      <p className="text-xs text-gray-500 mb-1">Idiomas rápidos:</p>
                      <div className="flex flex-wrap gap-1">
                        {['pt', 'en', 'es', 'fr', 'de', 'it'].map((code) => (
                          <button
                            key={code}
                            onClick={() => switchLanguage(code)}
                            className="px-2 py-0.5 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                          >
                            {code.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
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
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Globe className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="bg-white border-t max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-2 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                // Action button (Support)
                if (link.action) {
                  return (
                    <button
                      key={link.label}
                      onClick={() => { link.action(); setIsOpen(false); }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 w-full text-left"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                    </button>
                  );
                }
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
              
              {/* Mobile Translate Widget */}
              <div className="p-3 border-t">
                <p className="text-xs text-gray-500 mb-2">Traduzir:</p>
                <div id="google_translate_element_mobile" className="translate-widget-mobile"></div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {['pt', 'en', 'es', 'fr', 'de', 'it'].map((code) => (
                    <button
                      key={code}
                      onClick={() => switchLanguage(code)}
                      className="px-2 py-0.5 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                    >
                      {code.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sair</span>
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
              if (link.action) {
                return (
                  <button
                    key={link.label}
                    onClick={link.action}
                    className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs mt-1">{link.label}</span>
                  </button>
                );
              }
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