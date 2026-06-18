import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang] = useState('kr');
    const setLang = () => {};

    // Utility to toggle font styles globally or optionally use state in components
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('ifpdp_lang', lang);
        }

        document.documentElement.lang = lang;

        const krTargetTexts = document.querySelectorAll(".kr-target-text");
        const enOnlyTexts = document.querySelectorAll(".en-only-text");
        const dualTexts = document.querySelectorAll("[data-en][data-kr]");

        dualTexts.forEach(el => {
            el.innerHTML = el.getAttribute(`data-${lang}`);
        });

        if (lang === 'kr') {
            krTargetTexts.forEach(el => {
                el.classList.add('font-normal');
                el.classList.remove('font-light');
            });
            enOnlyTexts.forEach(el => {
                el.style.display = 'none';
            });
        } else {
            krTargetTexts.forEach(el => {
                el.classList.add('font-light');
                el.classList.remove('font-normal');
            });
            enOnlyTexts.forEach(el => {
                el.style.display = 'block';
            });
        }
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
