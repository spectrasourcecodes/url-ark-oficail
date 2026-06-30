import React, { useEffect, useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('pt');

  useEffect(() => {
    // Load Google Translate script
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.head.appendChild(script);

      window.googleTranslateElementInit = function() {
        try {
          new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,fr,de,es,it,pt,hi,ar,pl,sv',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
          }, 'google_translate_element');
        } catch (e) {
          console.error('Google Translate init error:', e);
        }
      };
    }
  }, []);

  const changeLanguage = (lang) => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event('change'));
      setCurrentLang(lang);
      setIsOpen(false);
    }
  };

  const languages = [
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>{languages.find(l => l.code === currentLang)?.flag}</span>
        <span>{currentLang.toUpperCase()}</span>
        <ChevronDown className="w-3 h-3" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors
                ${currentLang === lang.code ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-700'}`}
            >
              <span className="mr-2">{lang.flag}</span>
              {lang.label}
            </button>
          ))}
          <div className="border-t my-1"></div>
          <div id="google_translate_element" className="px-3 py-2 hidden"></div>
        </div>
      )}

      {/* Hide Google Translate Banner */}
      <style>{`
        .goog-te-banner-frame { display: none !important; }
        body { top: 0 !important; }
        #google_translate_element .goog-te-gadget-simple {
          border: none !important;
          background: transparent !important;
          padding: 0 !important;
        }
        #google_translate_element .goog-te-gadget-simple .goog-te-menu-value {
          font-size: 13px !important;
          color: #374151 !important;
        }
        #google_translate_element .goog-te-gadget-simple .goog-te-menu-value span {
          text-decoration: none !important;
        }
        .goog-te-menu-value .goog-te-menu-value-skeleton {
          display: none !important;
        }
      `}</style>
    </div>
  );
};

export default LanguageSwitcher;