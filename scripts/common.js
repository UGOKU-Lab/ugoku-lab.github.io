(function () {
    /**
     * common.js - Shared components loader and breadcrumb generator
     */

    async function loadComponents() {
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');

        if (headerPlaceholder) {
            try {
                const response = await fetch('components/header.html');
                const html = await response.text();
                headerPlaceholder.innerHTML = html;
                generateBreadcrumb(headerPlaceholder);
            } catch (error) {
                console.error('Failed to load header:', error);
            }
        }

        if (footerPlaceholder) {
            try {
                const response = await fetch('components/footer.html');
                const html = await response.text();
                footerPlaceholder.innerHTML = html;
            } catch (error) {
                console.error('Failed to load footer:', error);
            }
        }

        // Apply translations after components are loaded
        if (window.initI18n) {
            window.initI18n();
        }
    }

    function generateBreadcrumb(headerElement) {
        const path = window.location.pathname;
        const fileName = path.split('/').pop() || 'index.html';

        if (fileName === 'index.html') return;

        const breadcrumbData = {
            'ugokuone.html': [{ label: 'ホーム', href: 'index.html' }, { label: 'UGOKU One' }],
            'ugokuone_manual.html': [
                { label: 'ホーム', href: 'index.html' },
                { label: 'UGOKU One', href: 'ugokuone.html' },
                { label: 'ユーザーガイド' }
            ],
            'ugokupad.html': [{ label: 'ホーム', href: 'index.html' }, { label: 'UGOKU Pad' }],
            'ugokupro.html': [{ label: 'ホーム', href: 'index.html' }, { label: 'UGOKU Pro' }],
            'feelgyro.html': [{ label: 'ホーム', href: 'index.html' }, { label: 'ジャイロ効果を感じるやつ' }],
            'policy.html': [{ label: 'ホーム', href: 'index.html' }, { label: 'サイトポリシー' }],
            'site-policy.html': [{ label: 'ホーム', href: 'index.html' }, { label: 'サイトポリシー' }],
            'UGOKU-Pad_Terms.html': [{ label: 'ホーム', href: 'index.html' }, { label: 'UGOKU Pad 利用規約' }],
            'ugoku-one_dc-motor.html': [
                { label: 'ホーム', href: 'index.html' },
                { label: 'UGOKU One', href: 'ugokuone.html' },
                { label: 'DCモータ' }
            ],
            'ugoku-one_fet.html': [
                { label: 'ホーム', href: 'index.html' },
                { label: 'UGOKU One', href: 'ugokuone.html' },
                { label: 'FET出力' }
            ]
        };

        const breadcrumbs = breadcrumbData[fileName];
        if (!breadcrumbs) return;

        const nav = document.createElement('nav');
        nav.className = 'breadcrumb content-container';
        nav.setAttribute('aria-label', 'パンクズリスト');

        const ol = document.createElement('ol');
        ol.className = 'p-0 m-0';
        ol.style.listStyle = 'none';
        ol.style.display = 'flex';
        ol.style.flexWrap = 'wrap';
        ol.style.alignItems = 'center';
        ol.style.fontSize = '0.9rem';
        ol.style.color = 'var(--text-sub)';

        breadcrumbs.forEach((crumb, index) => {
            const li = document.createElement('li');
            if (crumb.href) {
                const a = document.createElement('a');
                a.href = crumb.href;
                a.textContent = crumb.label;
                a.style.color = 'inherit';
                a.style.textDecoration = 'none';
                li.appendChild(a);

                const separator = document.createElement('span');
                separator.textContent = ' > ';
                separator.style.margin = '0 8px';
                li.appendChild(separator);
            } else {
                li.textContent = crumb.label;
                li.style.fontWeight = 'bold';
                li.style.color = 'var(--text-color)';
            }
            ol.appendChild(li);
        });

        nav.appendChild(ol);
        headerElement.after(nav);
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadComponents);
    } else {
        loadComponents();
    }
})();
