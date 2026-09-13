document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       CURRENT LANGUAGE
    ========================================================= */

    const savedLanguage = localStorage.getItem("topzak-language");

    let currentLanguage =
        savedLanguage === "am"
            ? "am"
            : "ru";


    /* =========================================================
       CALCULATOR
    ========================================================= */

    const serviceButtons =
        document.querySelectorAll("[data-service]");

    const totalElement =
        document.getElementById("calculatorTotal");

    const selectedCountElement =
        document.getElementById("selectedCount");


    function formatPrice(value) {

        const locale =
            currentLanguage === "am"
                ? "hy-AM"
                : "ru-RU";

        return (
            new Intl.NumberFormat(locale).format(value)
            + " ֏"
        );
    }


    function updateCalculator() {

        let total = 0;
        let count = 0;

        serviceButtons.forEach((button) => {

            if (
                button.classList.contains("is-selected")
            ) {

                total += Number(button.dataset.price);

                count++;
            }

        });


        if (totalElement) {
            totalElement.textContent =
                formatPrice(total);
        }


        if (selectedCountElement) {
            selectedCountElement.textContent =
                count;
        }

    }


    serviceButtons.forEach((button) => {

        button.addEventListener("click", () => {

            button.classList.toggle(
                "is-selected"
            );

            updateCalculator();

        });

    });


    /* =========================================================
       MOBILE MENU
    ========================================================= */

    const mobileMenuToggle =
        document.getElementById(
            "mobileMenuToggle"
        );

    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );

    const mobileMenuInner =
        document.querySelector(
            ".mobile-menu-inner"
        );

    const mobileLinks =
        document.querySelectorAll(
            ".mobile-nav-link"
        );


    let menuScrollPosition = 0;


    function isMobileMenuOpen() {

        return Boolean(
            mobileMenu &&
            mobileMenu.classList.contains(
                "is-open"
            )
        );

    }


    function updateMobileMenuLabel() {

        if (!mobileMenuToggle) {
            return;
        }


        const opened =
            isMobileMenuOpen();


        if (currentLanguage === "am") {

            mobileMenuToggle.setAttribute(
                "aria-label",
                opened
                    ? "Փակել ընտրացանկը"
                    : "Բացել ընտրացանկը"
            );

        }

        else {

            mobileMenuToggle.setAttribute(
                "aria-label",
                opened
                    ? "Закрыть меню"
                    : "Открыть меню"
            );

        }

    }


    function lockPageForMenu() {

        menuScrollPosition =
            window.scrollY ||
            window.pageYOffset ||
            0;


        document.body.style.top =
            `-${menuScrollPosition}px`;


        document.body.classList.add(
            "menu-open"
        );

    }


    function unlockPageFromMenu() {

        document.body.classList.remove(
            "menu-open"
        );


        document.body.style.top = "";


        window.scrollTo(
            0,
            menuScrollPosition
        );

    }


    function openMobileMenu() {

        if (
            !mobileMenu ||
            !mobileMenuToggle ||
            isMobileMenuOpen()
        ) {
            return;
        }


        mobileMenu.classList.add(
            "is-open"
        );


        mobileMenuToggle.classList.add(
            "is-active"
        );


        mobileMenu.setAttribute(
            "aria-hidden",
            "false"
        );


        mobileMenuToggle.setAttribute(
            "aria-expanded",
            "true"
        );


        lockPageForMenu();

        updateMobileMenuLabel();

    }


    function closeMobileMenu(
        {
            restoreFocus = false
        } = {}
    ) {

        if (
            !mobileMenu ||
            !mobileMenuToggle ||
            !isMobileMenuOpen()
        ) {
            return;
        }


        mobileMenu.classList.remove(
            "is-open"
        );


        mobileMenuToggle.classList.remove(
            "is-active"
        );


        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );


        mobileMenuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        unlockPageFromMenu();

        updateMobileMenuLabel();


        if (restoreFocus) {

            requestAnimationFrame(() => {

                mobileMenuToggle.focus({
                    preventScroll: true
                });

            });

        }

    }


    if (
        mobileMenuToggle &&
        mobileMenu
    ) {

        mobileMenuToggle.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                event.stopPropagation();


                if (isMobileMenuOpen()) {

                    closeMobileMenu({
                        restoreFocus: true
                    });

                }

                else {

                    openMobileMenu();

                }

            }
        );


        mobileMenu.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === mobileMenu ||
                    event.target === mobileMenuInner
                ) {

                    closeMobileMenu();

                }

            }
        );

    }


    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                closeMobileMenu();

            }
        );

    });


    function closeMenuOnDesktop() {

        if (
            window.innerWidth > 767 &&
            isMobileMenuOpen()
        ) {

            closeMobileMenu();

        }

    }


    window.addEventListener(
        "resize",
        closeMenuOnDesktop
    );


    window.addEventListener(
        "orientationchange",
        closeMenuOnDesktop
    );


    /* =========================================================
       LANGUAGE
    ========================================================= */

    const languageToggle =
        document.getElementById(
            "languageToggle"
        );

    const languageDropdown =
        document.getElementById(
            "languageDropdown"
        );

    const currentLanguageFlag =
        document.getElementById(
            "currentLanguageFlag"
        );

    const languageButtons =
        document.querySelectorAll(
            "[data-lang]"
        );


    const flagData = {

        ru: {
            src:
                "./img/nav-ico/russian-flag.png",

            alt:
                "Русский язык"
        },

        am: {
            src:
                "./img/nav-ico/armenia-national-flag-in-original-ratio-transparent-free-png.png",

            alt:
                "Հայերեն"
        }

    };


    function openLanguageDropdown() {

        if (
            !languageDropdown ||
            !languageToggle
        ) {
            return;
        }


        languageDropdown.classList.add(
            "is-open"
        );


        languageDropdown.setAttribute(
            "aria-hidden",
            "false"
        );


        languageToggle.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    function closeLanguageDropdown() {

        if (
            !languageDropdown ||
            !languageToggle
        ) {
            return;
        }


        languageDropdown.classList.remove(
            "is-open"
        );


        languageDropdown.setAttribute(
            "aria-hidden",
            "true"
        );


        languageToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    if (
        languageToggle &&
        languageDropdown
    ) {

        languageToggle.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                event.stopPropagation();


                if (
                    languageDropdown.classList.contains(
                        "is-open"
                    )
                ) {

                    closeLanguageDropdown();

                }

                else {

                    openLanguageDropdown();

                }

            }
        );


        languageDropdown.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

            }
        );

    }


    document.addEventListener(
        "click",
        () => {

            closeLanguageDropdown();

        }
    );


    /* =========================================================
       TRANSLATIONS
    ========================================================= */

    const translations = {

        ru: {

            "nav.home":
                "Главная",

            "nav.services":
                "Услуги",

            "nav.portfolio":
                "Портфолио",

            "nav.about":
                "О нас",

            "nav.contacts":
                "Контакты",


            "mobile.navigation":
                "НАВИГАЦИЯ",

            "mobile.language":
                "ЯЗЫК САЙТА",


            "hero.title":
                "РАЗРАБОТКА САЙТОВ<br>И SEO ПРОДВИЖЕНИЕ",

            "hero.text":
                "Мы создаем эффективные сайты, которые расширят бизнес и увеличат продажи в Армении.",

            "hero.order":
                "ЗАКАЗАТЬ",

            "hero.offers":
                "ПРЕДЛОЖЕНИЯ",


            "facts.kicker":
                "Немного фактов",

            "facts.title":
                "Наши",

            "facts.subtitle":
                "компетенции",

            "facts.text":
                "Мы занимаемся разработкой сайтов уже более 10 лет. За нашими плечами знания IT и продвижения, маркетинга, брендинга, дизайна и организации рекламных кампаний.",

            "facts.expNumber":
                "12+ <span>лет</span>",

            "facts.expDesc":
                "Опыт работы с 2008<br>года",

            "facts.projectsDesc":
                "Реализованных<br>проектов",

            "facts.devDesc":
                "Лет в сфере<br>программирования",


            "advantages.title":
                "Наши преимущества",

            "advantages.deadlineTitle":
                "СРОКИ",

            "advantages.deadlineText":
                "Мы всегда предоставляем клиенту реальную оценку сроков и строго следим за её выполнением.",

            "advantages.adaptiveTitle":
                "АДАПТИВНЫЙ ДИЗАЙН",

            "advantages.adaptiveText":
                "Используем адаптивный дизайн, чтобы сайты отлично смотрелись на разных устройствах.",

            "advantages.seoTitle":
                "БАЗОВОЕ SEO",

            "advantages.seoText":
                "Оптимизируем сайты и подготавливаем их к дальнейшему продвижению.",

            "advantages.cmsTitle":
                "СИСТЕМА УПРАВЛЕНИЯ<br>КОНТЕНТОМ",

            "advantages.cmsText":
                "Система администрирования сайта — WordPress или Битрикс.",

            "advantages.supportTitle":
                "ПОДДЕРЖКА",

            "advantages.supportText":
                "Оказываем гарантийное и послегарантийное обслуживание проектов.",

            "advantages.designTitle":
                "ДИЗАЙН",

            "advantages.designText":
                "Используем современную типографику, изображения и визуальные решения.",


            "calc.kicker":
                "Стоимость проекта",

            "calc.title":
                "Соберите <span>свой сайт</span>",

            "calc.text":
                "Выберите необходимые услуги — стоимость проекта рассчитается автоматически.",

            "calc.designTitle":
                "Дизайн сайта",

            "calc.designText":
                "UI/UX, прототип, визуальная концепция и адаптивные экраны.",

            "calc.devTitle":
                "Верстка сайта",

            "calc.devText":
                "Адаптивная разработка, анимации и подготовка к запуску.",

            "calc.seoTitle":
                "SEO-продвижение",

            "calc.seoText":
                "Базовая оптимизация, структура и подготовка сайта к продвижению.",

            "calc.project":
                "Ваш проект",

            "calc.selected":
                "Выбрано услуг:",

            "calc.estimate":
                "Предварительная стоимость",

            "calc.note":
                "Итоговая цена зависит от объёма, количества страниц и сложности проекта.",

            "calc.discuss":
                "ОБСУДИТЬ ПРОЕКТ",

            "calc.free":
                "Бесплатная консультация перед стартом проекта",


            "stand.kicker":
                "Не нужен полный пакет?",

            "stand.title":
                "Услуги можно заказать <strong>отдельно</strong>",

            "stand.seoTitle":
                "SEO",

            "stand.seoText":
                "Оптимизация сайта, технический аудит, структура и продвижение.",

            "stand.devTitle":
                "Верстка сайта",

            "stand.devText":
                "Адаптивная frontend-разработка по вашему готовому дизайну.",

            "stand.designTitle":
                "Дизайн сайта",

            "stand.designText":
                "Современный UI/UX, прототипирование и дизайн адаптивов.",


            "about.title":
                "Креативная<br><span>веб-студия</span> и<br>интернет-агентство<br>полного цикла",

            "about.text":
                "TopZak — это опытная команда профессионалов, которая любит интернет и знает, как заставить его работать на ваш бизнес. Мы оказываем полный спектр услуг по разработке веб-сайтов, их продвижению и поддержке.",


            "team.title":
                "НАША КОМАНДА",

            "team.narek":
                "Нарек",

            "team.sveta":
                "Светлана",

            "team.arman":
                "Арман",

            "team.narekDesc":
                "Стратегия, Управление<br>Ритм Клиента",

            "team.svetaDesc":
                "Интерфейсы, Айдентика,<br>Визуальные Системы",

            "team.armanDesc":
                "Архитектура, Frontend,<br>Интеграции",

            "team.portfolio":
                "ПОРТФОЛИО",


            "contact.kicker":
                "ПЕРЕЙТИ В КОНТАКТЫ",

            "contact.title":
                "СВЯЖИТЕСЬ С<br>НАМИ",

            "contact.subtitle":
                "И НАША КОМАНДА<br>ПОМОЖЕТ РЕАЛИЗОВАТЬ<br>ЛЮБОЙ ПРОЕКТ",

            "contact.text":
                "TopZak — ваш партнер в мире<br>веб-разработки и SEO",

            "contact.name":
                "ИМЯ",

            "contact.email":
                "EMAIL",

            "contact.service":
                "УСЛУГА",

            "contact.comment":
                "КОММЕНТАРИЙ",

            "contact.namePh":
                "Введите ваше имя",

            "contact.emailPh":
                "Введите ваше email",

            "contact.commentPh":
                "Добавьте комментарий",

            "contact.choose":
                "Выберите категорию услуги",

            "contact.fullsite":
                "Создание сайта под ключ",

            "contact.webdesign":
                "Дизайн сайта",

            "contact.frontend":
                "Верстка сайта",

            "contact.seo":
                "SEO-продвижение",

            "contact.other":
                "Другая услуга",

            "contact.submit":
                "СВЯЗАТЬСЯ",

            "contact.success":
                "Заявка успешно отправлена"

        },


        am: {

            "nav.home":
                "Գլխավոր",

            "nav.services":
                "Ծառայություններ",

            "nav.portfolio":
                "Պորտֆոլիո",

            "nav.about":
                "Մեր մասին",

            "nav.contacts":
                "Կապ",


            "mobile.navigation":
                "ՆԱՎԻԳԱՑԻԱ",

            "mobile.language":
                "ԿԱՅՔԻ ԼԵԶՈՒՆ",


            "hero.title":
                "ԿԱՅՔԵՐԻ ՄՇԱԿՈՒՄ<br>ԵՎ SEO ԱՌԱՋԽԱՂԱՑՈՒՄ",

            "hero.text":
                "Ստեղծում ենք արդյունավետ կայքեր, որոնք զարգացնում են բիզնեսը և ավելացնում վաճառքները Հայաստանում։",

            "hero.order":
                "ՊԱՏՎԻՐԵԼ",

            "hero.offers":
                "ԱՌԱՋԱՐԿՆԵՐ",


            "facts.kicker":
                "Մի քանի փաստ",

            "facts.title":
                "Մեր",

            "facts.subtitle":
                "կարողությունները",

            "facts.text":
                "Ավելի քան 10 տարի զբաղվում ենք կայքերի մշակմամբ։ Ունենք փորձ IT-ի, առաջխաղացման, մարքեթինգի, բրենդինգի և դիզայնի ոլորտներում։",

            "facts.expNumber":
                "12+ <span>տարի</span>",

            "facts.expDesc":
                "Աշխատանքային փորձ՝<br>2008 թվականից",

            "facts.projectsDesc":
                "Իրականացված<br>նախագծեր",

            "facts.devDesc":
                "Տարի ծրագրավորման<br>ոլորտում",


            "advantages.title":
                "Մեր առավելությունները",

            "advantages.deadlineTitle":
                "ԺԱՄԿԵՏՆԵՐ",

            "advantages.deadlineText":
                "Միշտ տալիս ենք աշխատանքի ժամկետների իրատեսական գնահատական և հետևում դրանց պահպանմանը։",

            "advantages.adaptiveTitle":
                "ԱԴԱՊՏԻՎ ԴԻԶԱՅՆ",

            "advantages.adaptiveText":
                "Կիրառում ենք ադապտիվ դիզայն, որպեսզի կայքը լավ տեսք ունենա տարբեր սարքերում։",

            "advantages.seoTitle":
                "ԲԱԶԱՅԻՆ SEO",

            "advantages.seoText":
                "Օպտիմալացնում ենք կայքերը և պատրաստում հետագա առաջխաղացման համար։",

            "advantages.cmsTitle":
                "ԲՈՎԱՆԴԱԿՈՒԹՅԱՆ<br>ԿԱՌԱՎԱՐՄԱՆ ՀԱՄԱԿԱՐԳ",

            "advantages.cmsText":
                "Կայքի կառավարման համակարգ՝ WordPress կամ Bitrix։",

            "advantages.supportTitle":
                "ԱՋԱԿՑՈՒԹՅՈՒՆ",

            "advantages.supportText":
                "Տրամադրում ենք նախագծերի երաշխիքային և հետերաշխիքային սպասարկում։",

            "advantages.designTitle":
                "ԴԻԶԱՅՆ",

            "advantages.designText":
                "Օգտագործում ենք ժամանակակից տպագրություն, պատկերներ և տեսողական լուծումներ։",


            "calc.kicker":
                "Նախագծի արժեքը",

            "calc.title":
                "Հավաքեք <span>ձեր կայքը</span>",

            "calc.text":
                "Ընտրեք անհրաժեշտ ծառայությունները՝ արժեքը կհաշվարկվի ավտոմատ։",

            "calc.designTitle":
                "Կայքի դիզայն",

            "calc.designText":
                "UI/UX, պրոտոտիպ, տեսողական կոնցեպտ և ադապտիվ էկրաններ։",

            "calc.devTitle":
                "Կայքի վերստկա",

            "calc.devText":
                "Ադապտիվ մշակում, անիմացիաներ և պատրաստում գործարկման համար։",

            "calc.seoTitle":
                "SEO առաջխաղացում",

            "calc.seoText":
                "Բազային օպտիմալացում, կառուցվածք և պատրաստում առաջխաղացման համար։",

            "calc.project":
                "Ձեր նախագիծը",

            "calc.selected":
                "Ընտրված ծառայություններ՝",

            "calc.estimate":
                "Նախնական արժեք",

            "calc.note":
                "Վերջնական արժեքը կախված է ծավալից, էջերի քանակից և նախագծի բարդությունից։",

            "calc.discuss":
                "ՔՆՆԱՐԿԵԼ ՆԱԽԱԳԻԾԸ",

            "calc.free":
                "Անվճար խորհրդատվություն՝ նախագիծը սկսելուց առաջ",


            "stand.kicker":
                "Ամբողջական փաթեթ պետք չէ՞",

            "stand.title":
                "Ծառայությունները կարող եք պատվիրել <strong>առանձին</strong>",

            "stand.seoTitle":
                "SEO",

            "stand.seoText":
                "Կայքի օպտիմալացում, տեխնիկական աուդիտ, կառուցվածք և առաջխաղացում։",

            "stand.devTitle":
                "Կայքի վերստկա",

            "stand.devText":
                "Ադապտիվ frontend մշակում՝ ձեր պատրաստի դիզայնով։",

            "stand.designTitle":
                "Կայքի դիզայն",

            "stand.designText":
                "Ժամանակակից UI/UX, պրոտոտիպավորում և ադապտիվ տարբերակների դիզայն։",


            "about.title":
                "Կրեատիվ<br><span>վեբ-ստուդիա</span> և<br>ամբողջական ցիկլի<br>ինտերնետ-գործակալություն",

            "about.text":
                "TopZak-ը փորձառու մասնագետների թիմ է, որը գիտի՝ ինչպես ինտերնետը դարձնել արդյունավետ ձեր բիզնեսի համար։ Մենք առաջարկում ենք կայքերի մշակման, առաջխաղացման և աջակցության ամբողջական ծառայություններ։",


            "team.title":
                "ՄԵՐ ԹԻՄԸ",

            "team.narek":
                "Նարեկ",

            "team.sveta":
                "Սվետլանա",

            "team.arman":
                "Արման",

            "team.narekDesc":
                "Ռազմավարություն, կառավարում,<br>նախագծի կազմակերպում",

            "team.svetaDesc":
                "Ինտերֆեյսներ, ինքնություն,<br>տեսողական համակարգեր",

            "team.armanDesc":
                "Ճարտարապետություն, Frontend,<br>ինտեգրացիաներ",

            "team.portfolio":
                "ՊՈՐՏՖՈԼԻՈ",


            "contact.kicker":
                "ԱՆՑՆԵԼ ԿԱՊԻ ԲԱԺԻՆ",

            "contact.title":
                "ԿԱՊՎԵՔ<br>ՄԵԶ ՀԵՏ",

            "contact.subtitle":
                "ԵՎ ՄԵՐ ԹԻՄԸ<br>ԿՕԳՆԻ ԻՐԱԿԱՆԱՑՆԵԼ<br>ՑԱՆԿԱՑԱԾ ՆԱԽԱԳԻԾ",

            "contact.text":
                "TopZak — ձեր գործընկերը<br>վեբ-մշակման և SEO-ի աշխարհում",

            "contact.name":
                "ԱՆՈՒՆ",

            "contact.email":
                "EMAIL",

            "contact.service":
                "ԾԱՌԱՅՈՒԹՅՈՒՆ",

            "contact.comment":
                "ՄԵԿՆԱԲԱՆՈՒԹՅՈՒՆ",

            "contact.namePh":
                "Մուտքագրեք ձեր անունը",

            "contact.emailPh":
                "Մուտքագրեք ձեր email-ը",

            "contact.commentPh":
                "Ավելացրեք մեկնաբանություն",

            "contact.choose":
                "Ընտրեք ծառայության կատեգորիան",

            "contact.fullsite":
                "Կայքի ստեղծում ամբողջությամբ",

            "contact.webdesign":
                "Կայքի դիզայն",

            "contact.frontend":
                "Կայքի վերստկա",

            "contact.seo":
                "SEO առաջխաղացում",

            "contact.other":
                "Այլ ծառայություն",

            "contact.submit":
                "ԿԱՊՎԵԼ",

            "contact.success":
                "Հայտը հաջողությամբ ուղարկվել է"

        }

    };


    /* =========================================================
       APPLY TRANSLATIONS
    ========================================================= */

    function applyTranslations(language) {

        const dict =
            translations[language] ||
            translations.ru;


        document
            .querySelectorAll(
                "[data-i18n]"
            )
            .forEach((element) => {

                const key =
                    element.dataset.i18n;


                if (
                    dict[key] !== undefined
                ) {

                    element.textContent =
                        dict[key];

                }

            });


        document
            .querySelectorAll(
                "[data-i18n-html]"
            )
            .forEach((element) => {

                const key =
                    element.dataset.i18nHtml;


                if (
                    dict[key] !== undefined
                ) {

                    element.innerHTML =
                        dict[key];

                }

            });


        document
            .querySelectorAll(
                "[data-i18n-placeholder]"
            )
            .forEach((element) => {

                const key =
                    element.dataset.i18nPlaceholder;


                if (
                    dict[key] !== undefined
                ) {

                    element.placeholder =
                        dict[key];

                }

            });

    }


    /* =========================================================
       SET LANGUAGE
    ========================================================= */

    function setLanguage(language) {

        currentLanguage =
            language === "am"
                ? "am"
                : "ru";


        applyTranslations(
            currentLanguage
        );


        languageButtons.forEach(
            (button) => {

                const active =
                    button.dataset.lang ===
                    currentLanguage;


                button.classList.toggle(
                    "is-active",
                    active
                );


                button.setAttribute(
                    "aria-pressed",
                    String(active)
                );

            }
        );


        if (currentLanguageFlag) {

            currentLanguageFlag.src =
                flagData[
                    currentLanguage
                ].src;


            currentLanguageFlag.alt =
                flagData[
                    currentLanguage
                ].alt;

        }


        document.documentElement.lang =
            currentLanguage === "am"
                ? "hy"
                : "ru";


        localStorage.setItem(
            "topzak-language",
            currentLanguage
        );


        if (languageToggle) {

            languageToggle.setAttribute(
                "aria-label",

                currentLanguage === "am"
                    ? "Փոխել լեզուն"
                    : "Сменить язык"
            );

        }


        updateMobileMenuLabel();

        updateCalculator();

    }


    languageButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                () => {

                    setLanguage(
                        button.dataset.lang
                    );

                    closeLanguageDropdown();

                }
            );

        }
    );


    /* =========================================================
       CONTACT FORM
       ЗАЯВКИ ПРИХОДЯТ НА:
       narekzakaryan100@gmail.com
    ========================================================= */

    const contactForm =
        document.getElementById(
            "contactForm"
        );

    const contactFormStatus =
        document.getElementById(
            "contactFormStatus"
        );


    const CONTACT_FORM_ENDPOINT =
        "https://formsubmit.co/ajax/narekzakaryan100@gmail.com";


    /* =========================================================
       POPUP STYLES
    ========================================================= */

    const popupStyle =
        document.createElement(
            "style"
        );


    popupStyle.textContent = `

        .topzak-form-popup {
            position: fixed;

            z-index: 999999;

            inset: 0;

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 20px;

            background:
                rgba(0, 0, 0, 0.78);

            backdrop-filter:
                blur(14px);

            -webkit-backdrop-filter:
                blur(14px);

            opacity: 0;

            visibility: hidden;

            pointer-events: none;

            transition:
                opacity 0.3s ease,
                visibility 0.3s ease;
        }


        .topzak-form-popup.is-open {
            opacity: 1;

            visibility: visible;

            pointer-events: auto;
        }


        .topzak-form-popup-card {
            position: relative;

            width: 100%;

            max-width: 470px;

            padding:
                48px 35px 35px;

            overflow: hidden;

            border:
                1px solid
                rgba(169, 91, 255, 0.65);

            border-radius: 24px;

            background:
                linear-gradient(
                    145deg,
                    #171321,
                    #07070c
                );

            box-shadow:
                0 30px 100px
                rgba(0, 0, 0, 0.75),

                0 0 50px
                rgba(150, 75, 255, 0.16);

            text-align: center;

            transform:
                translateY(25px)
                scale(0.96);

            transition:
                transform 0.3s ease;
        }


        .topzak-form-popup.is-open
        .topzak-form-popup-card {
            transform:
                translateY(0)
                scale(1);
        }


        .topzak-form-popup-card::before {
            content: "";

            position: absolute;

            width: 230px;

            height: 230px;

            top: -155px;

            right: -90px;

            border-radius: 50%;

            background:
                radial-gradient(
                    circle,
                    rgba(151, 77, 255, 0.45),
                    transparent 70%
                );

            pointer-events: none;
        }


        .topzak-form-popup-card::after {
            content: "";

            position: absolute;

            width: 210px;

            height: 210px;

            left: -135px;

            bottom: -140px;

            border-radius: 50%;

            background:
                radial-gradient(
                    circle,
                    rgba(255, 41, 208, 0.22),
                    transparent 70%
                );

            pointer-events: none;
        }


        .topzak-popup-icon {
            position: relative;

            z-index: 2;

            width: 74px;

            height: 74px;

            display: flex;

            align-items: center;

            justify-content: center;

            margin:
                0 auto 25px;

            border:
                1px solid
                rgba(181, 105, 255, 0.75);

            border-radius: 50%;

            background:
                linear-gradient(
                    145deg,
                    rgba(255, 42, 208, 0.18),
                    rgba(107, 71, 255, 0.23)
                );

            box-shadow:
                0 0 35px
                rgba(169, 81, 255, 0.18);

            color: #ffffff;

            font-family:
                Arial,
                sans-serif;

            font-size: 34px;

            font-weight: 700;
        }


        .topzak-form-popup.is-error
        .topzak-popup-icon {
            border-color:
                rgba(255, 74, 120, 0.7);

            background:
                rgba(255, 50, 90, 0.12);
        }


        .topzak-popup-title {
            position: relative;

            z-index: 2;

            margin-bottom: 14px;

            color: #ffffff;

            font-family:
                "Roboto",
                Arial,
                sans-serif;

            font-size: 26px;

            font-weight: 800;

            line-height: 1.2;
        }


        .topzak-popup-text {
            position: relative;

            z-index: 2;

            max-width: 350px;

            margin:
                0 auto 28px;

            color:
                rgba(255, 255, 255, 0.62);

            font-family:
                "Roboto",
                Arial,
                sans-serif;

            font-size: 14px;

            line-height: 1.55;
        }


        .topzak-popup-button {
            position: relative;

            z-index: 2;

            width: 100%;

            height: 56px;

            border: 0;

            border-radius: 12px;

            background:
                linear-gradient(
                    90deg,
                    #8d59e6,
                    #bb84ff
                );

            color: #ffffff;

            font-family:
                "Roboto",
                Arial,
                sans-serif;

            font-size: 15px;

            font-weight: 800;

            cursor: pointer;

            transition:
                transform 0.25s ease,
                box-shadow 0.25s ease;
        }


        .topzak-popup-button:hover {
            transform:
                translateY(-2px);

            box-shadow:
                0 10px 30px
                rgba(161, 89, 255, 0.3);
        }


        .topzak-popup-close {
            position: absolute;

            z-index: 10;

            top: 15px;

            right: 15px;

            width: 36px;

            height: 36px;

            display: flex;

            align-items: center;

            justify-content: center;

            border:
                1px solid
                rgba(255, 255, 255, 0.12);

            border-radius: 50%;

            background:
                rgba(255, 255, 255, 0.05);

            color:
                rgba(255, 255, 255, 0.8);

            font-size: 21px;

            cursor: pointer;
        }


        .topzak-popup-close:hover {
            border-color:
                rgba(173, 88, 255, 0.7);

            color: #ffffff;
        }


        @media (max-width: 500px) {

            .topzak-form-popup {
                padding: 16px;
            }


            .topzak-form-popup-card {
                padding:
                    42px 22px 25px;

                border-radius: 18px;
            }


            .topzak-popup-icon {
                width: 64px;

                height: 64px;

                font-size: 29px;
            }


            .topzak-popup-title {
                font-size: 22px;
            }


            .topzak-popup-text {
                font-size: 13px;
            }

        }

    `;


    document.head.appendChild(
        popupStyle
    );


    /* =========================================================
       CREATE POPUP
    ========================================================= */

    const formPopup =
        document.createElement(
            "div"
        );


    formPopup.className =
        "topzak-form-popup";


    formPopup.setAttribute(
        "aria-hidden",
        "true"
    );


    formPopup.innerHTML = `

        <div class="topzak-form-popup-card">

            <button
                type="button"
                class="topzak-popup-close"
                aria-label="Закрыть"
            >
                ×
            </button>


            <div class="topzak-popup-icon">
                ✓
            </div>


            <div class="topzak-popup-title">
                Заявка успешно отправлена
            </div>


            <div class="topzak-popup-text">
                Спасибо! Мы получили вашу заявку
                и свяжемся с вами в ближайшее время.
            </div>


            <button
                type="button"
                class="topzak-popup-button"
            >
                ГОТОВО
            </button>

        </div>

    `;


    document.body.appendChild(
        formPopup
    );


    const popupIcon =
        formPopup.querySelector(
            ".topzak-popup-icon"
        );

    const popupTitle =
        formPopup.querySelector(
            ".topzak-popup-title"
        );

    const popupText =
        formPopup.querySelector(
            ".topzak-popup-text"
        );

    const popupButton =
        formPopup.querySelector(
            ".topzak-popup-button"
        );

    const popupClose =
        formPopup.querySelector(
            ".topzak-popup-close"
        );


    /* =========================================================
       SHOW POPUP
    ========================================================= */

    function showFormPopup(
        type = "success"
    ) {

        const isError =
            type === "error";


        formPopup.classList.toggle(
            "is-error",
            isError
        );


        if (isError) {

            popupIcon.textContent =
                "!";


            if (
                currentLanguage === "am"
            ) {

                popupTitle.textContent =
                    "Չհաջողվեց ուղարկել";

                popupText.textContent =
                    "Չհաջողվեց ուղարկել հայտը։ Խնդրում ենք փորձել ևս մեկ անգամ։";

                popupButton.textContent =
                    "ՓԱԿԵԼ";

                popupClose.setAttribute(
                    "aria-label",
                    "Փակել"
                );

            }

            else {

                popupTitle.textContent =
                    "Не удалось отправить";

                popupText.textContent =
                    "Заявку не удалось отправить. Попробуйте ещё раз.";

                popupButton.textContent =
                    "ЗАКРЫТЬ";

                popupClose.setAttribute(
                    "aria-label",
                    "Закрыть"
                );

            }

        }

        else {

            popupIcon.textContent =
                "✓";


            if (
                currentLanguage === "am"
            ) {

                popupTitle.textContent =
                    "Հայտը հաջողությամբ ուղարկվել է";

                popupText.textContent =
                    "Շնորհակալություն։ Մենք ստացել ենք ձեր հայտը և հնարավորինս շուտ կկապվենք ձեզ հետ։";

                popupButton.textContent =
                    "ՊԱՏՐԱՍՏ Է";

                popupClose.setAttribute(
                    "aria-label",
                    "Փակել"
                );

            }

            else {

                popupTitle.textContent =
                    "Заявка успешно отправлена";

                popupText.textContent =
                    "Спасибо! Мы получили вашу заявку и свяжемся с вами в ближайшее время.";

                popupButton.textContent =
                    "ГОТОВО";

                popupClose.setAttribute(
                    "aria-label",
                    "Закрыть"
                );

            }

        }


        formPopup.classList.add(
            "is-open"
        );


        formPopup.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    }


    /* =========================================================
       CLOSE POPUP
    ========================================================= */

    function closeFormPopup() {

        formPopup.classList.remove(
            "is-open"
        );


        formPopup.setAttribute(
            "aria-hidden",
            "true"
        );


        if (
            !document.body.classList.contains(
                "menu-open"
            )
        ) {

            document.body.style.overflow =
                "";

        }

    }


    popupButton.addEventListener(
        "click",
        closeFormPopup
    );


    popupClose.addEventListener(
        "click",
        closeFormPopup
    );


    formPopup.addEventListener(
        "click",
        (event) => {

            if (
                event.target === formPopup
            ) {

                closeFormPopup();

            }

        }
    );


    /* =========================================================
       ESC
    ========================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                if (
                    formPopup.classList.contains(
                        "is-open"
                    )
                ) {

                    closeFormPopup();

                }

                else {

                    closeMobileMenu({
                        restoreFocus: true
                    });

                    closeLanguageDropdown();

                }

            }

        }
    );


    /* =========================================================
       REAL FORM SUBMISSION
    ========================================================= */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();


                if (
                    !contactForm.checkValidity()
                ) {

                    contactForm.reportValidity();

                    return;

                }


                const submitButton =
                    contactForm.querySelector(
                        ".contact-submit"
                    );


                const submitText =
                    submitButton
                        ?.querySelector(
                            "span:first-child"
                        );


                if (
                    !submitButton ||
                    !submitText
                ) {
                    return;
                }


                const normalButtonText =
                    translations[
                        currentLanguage
                    ]["contact.submit"];


                submitButton.disabled =
                    true;


                submitText.textContent =
                    currentLanguage === "am"
                        ? "ՈՒՂԱՐԿՎՈՒՄ Է..."
                        : "ОТПРАВЛЯЕМ...";


                if (contactFormStatus) {

                    contactFormStatus.textContent =
                        currentLanguage === "am"
                            ? "Հայտն ուղարկվում է..."
                            : "Отправляем заявку...";

                }


                const formData =
                    new FormData(
                        contactForm
                    );


                const name =
                    String(
                        formData.get("name") || ""
                    ).trim();


                const email =
                    String(
                        formData.get("email") || ""
                    ).trim();


                const comment =
                    String(
                        formData.get("comment") || ""
                    ).trim();


                const serviceSelect =
                    contactForm.querySelector(
                        'select[name="service"]'
                    );


                const selectedService =
                    serviceSelect
                        ?.options[
                            serviceSelect.selectedIndex
                        ]
                        ?.textContent
                        ?.trim()
                    ||
                    String(
                        formData.get("service") || ""
                    );


                const payload = {

                    name:
                        name,

                    email:
                        email,

                    service:
                        selectedService,

                    comment:
                        comment || "—",

                    language:
                        currentLanguage === "am"
                            ? "Հայերեն"
                            : "Русский",

                    page:
                        window.location.href,

                    date:
                        new Date()
                            .toLocaleString(
                                currentLanguage === "am"
                                    ? "hy-AM"
                                    : "ru-RU"
                            ),

                    _subject:
                        `Новая заявка TopZak — ${selectedService}`,

                    _template:
                        "table",

                    _captcha:
                        "false",

                    _replyto:
                        email

                };


                try {

                    const response =
                        await fetch(
                            CONTACT_FORM_ENDPOINT,
                            {

                                method:
                                    "POST",

                                headers: {

                                    "Content-Type":
                                        "application/json",

                                    "Accept":
                                        "application/json"

                                },

                                body:
                                    JSON.stringify(
                                        payload
                                    )

                            }
                        );


                    let result = null;


                    try {

                        result =
                            await response.json();

                    }

                    catch (error) {

                        result = null;

                    }


                    if (!response.ok) {

                        throw new Error(
                            result?.message ||
                            "Ошибка отправки"
                        );

                    }


                    contactForm.reset();


                    if (contactFormStatus) {

                        contactFormStatus.textContent =
                            "";

                    }


                    showFormPopup(
                        "success"
                    );

                }

                catch (error) {

                    console.error(
                        "Ошибка отправки TopZak:",
                        error
                    );


                    if (contactFormStatus) {

                        contactFormStatus.textContent =
                            currentLanguage === "am"
                                ? "Չհաջողվեց ուղարկել հայտը։"
                                : "Не удалось отправить заявку.";

                    }


                    showFormPopup(
                        "error"
                    );

                }

                finally {

                    submitButton.disabled =
                        false;


                    submitText.textContent =
                        normalButtonText;

                }

            }
        );

    }


    /* =========================================================
       START
    ========================================================= */

    setLanguage(
        currentLanguage
    );


    updateCalculator();

});

/* =========================================================
   FOOTER LANGUAGE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const footerTranslatedElements =
        document.querySelectorAll(
            "[data-footer-ru][data-footer-am]"
        );


    function translateFooter() {

        const currentLang =
            document.documentElement.lang === "hy"
                ? "am"
                : "ru";


        footerTranslatedElements.forEach(
            (element) => {

                const text =
                    currentLang === "am"
                        ? element.dataset.footerAm
                        : element.dataset.footerRu;


                if (text) {
                    element.textContent = text;
                }

            }
        );

    }


    translateFooter();


    const footerLanguageObserver =
        new MutationObserver(() => {

            translateFooter();

        });


    footerLanguageObserver.observe(
        document.documentElement,
        {
            attributes: true,
            attributeFilter: ["lang"]
        }
    );

});