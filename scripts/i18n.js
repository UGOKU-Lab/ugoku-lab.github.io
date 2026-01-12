(function () {
    /**
     * i18n.js - Lightweight client-side localization for UGOKU Lab
     */

    const TRANSLATIONS_PATH = 'translations.json';

    async function initI18n() {
        // 1. Detect language (priority: URL param ?lang=en > localStorage > browser setting)
        const urlParams = new URLSearchParams(window.location.search);
        let lang = urlParams.get('lang') || localStorage.getItem('preferred_lang');

        if (!lang) {
            const browserLang = navigator.language || navigator.userLanguage;
            lang = browserLang.startsWith('en') ? 'en' : 'ja';
        }

        // 2. Fetch translations
        try {
            const response = await fetch(TRANSLATIONS_PATH);
            const translations = await response.json();

            // 3. Apply translations if lang is not default (ja)
            if (lang !== 'ja') {
                applyTranslations(translations, lang);
            }

            // 4. Update <html> lang attribute
            document.documentElement.lang = lang;

            // 5. Save preference (only if explicitly set in URL or previously in localStorage)
            if (urlParams.has('lang')) {
                localStorage.setItem('preferred_lang', lang);
            }
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }

    function applyTranslations(translations, lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = translations[lang] && translations[lang][key];

            if (translation) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.placeholder) el.placeholder = translation;
                } else if (el.tagName === 'IMG') {
                    if (el.alt) el.alt = translation;
                } else {
                    el.innerHTML = translation;
                }
            }
        });
    }

    // Run on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initI18n);
    } else {
        initI18n();
    }
})();
