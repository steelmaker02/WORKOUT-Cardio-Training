/* 1. Daten und Konfiguration */
// Trainer-Datenobjekt
const trainerData = {
    samantha: {
        name: 'Samantha William',
        specialty: 'Yoga & Flexibilität Expertin',
        description: 'Samantha ist eine zertifizierte Yoga-Lehrerin mit über 8 Jahren Erfahrung. Sie spezialisiert sich auf Vinyasa Flow, Yin Yoga und therapeutisches Yoga. Ihre Klassen sind bekannt für ihre beruhigende Atmosphäre und ihren Fokus auf Achtsamkeit.',
        experience: '8+ Jahre',
        clients: '500+',
        certifications: '12',
        bio: 'Nach ihrem Studium der Sportwissenschaft reiste Samantha nach Indien, um ihre Yoga-Ausbildung zu vertiefen. Sie kombiniert traditionelle Yoga-Philosophie mit modernen Trainingsmethoden und hilft ihren Klienten, innere Balance und körperliche Stärke zu finden.'
    },
    karen: {
        name: 'Karen Summer',
        specialty: 'HIIT & Functional Training Spezialistin',
        description: 'Karen ist eine dynamische Trainerin, die sich auf hochintensives Intervalltraining und funktionelle Fitness spezialisiert hat. Mit 6 Jahren Erfahrung motiviert sie ihre Klienten, ihre Grenzen zu überschreiten und ihre Fitnessziele zu erreichen.',
        experience: '6+ Jahre',
        clients: '350+',
        certifications: '8',
        bio: 'Karen war früher Leistungssportlerin und bringt diese Leidenschaft in jedes Training ein. Sie glaubt daran, dass Fitness Spaß machen sollte und gestaltet ihre Workouts abwechslungsreich und herausfordernd. Ihr Motto: "Stark ist das neue Schön".'
    },
    jonathan: {
        name: 'Jonathan Wise',
        specialty: 'Personal Training & Kraftaufbau',
        description: 'Jonathan ist unser Head Personal Trainer mit über 10 Jahren Erfahrung im Kraft- und Konditionstraining. Er hat mit Profisportlern und Fitness-Enthusiasten gleichermaßen gearbeitet und entwickelt individuelle Trainingsprogramme für optimale Ergebnisse.',
        experience: '10+ Jahre',
        clients: '800+',
        certifications: '15',
        bio: 'Mit einem Master-Abschluss in Sportwissenschaft und Zertifizierungen in Ernährung kombiniert Jonathan wissenschaftliche Erkenntnisse mit praktischer Erfahrung. Er ist bekannt für seine strukturierten Trainingspläne und seinen ganzheitlichen Ansatz zur Fitness.'
    }
};

/* 2. Hilfsfunktionen */
// Debounce-Funktion für Performance
const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

// Hilfsfunktion für Nachrichtenanzeige
const showMessage = (message, type) => {
    const messageEl = document.createElement('div');
    messageEl.textContent = message;
    messageEl.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--color-primary)' : 'var(--color-secondary)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(messageEl);

    setTimeout(() => {
        messageEl.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => messageEl.remove(), 300);
    }, 3000);
};

// CSS-Animationen dynamisch hinzufügen
const addAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
};

/* 3. Navigation und Header */
/* Hamburger Menü */
const initHamburgerMenu = () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const logo = document.querySelector('.logo'); // Находим логотип

    if (!hamburger || !navMenu) return;

    // Menü beim Klick umschalten
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Scrollen des Body verhindern, wenn Menü offen ist
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Funktion zum Schließen des Menüs
    const closeMenu = () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Menü schließen, wenn ein Link geklickt wird
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Menü auch schließen, wenn auf das Logo geklickt wird
    if (logo) {
        logo.addEventListener('click', closeMenu);
    }

    // Menü schließen beim Klick außerhalb
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && e.target !== logo) {
            closeMenu();
        }
    });
};
// Weiches Scrollen
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

/* 4. Interaktive UI-Komponenten */

// Hover-Effekte für Übungskarten
const initExerciseCardEffects = () => {
    const exerciseCards = document.querySelectorAll('.exercise-card');

    exerciseCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const duration = card.getAttribute('data-duration');
            if (duration) {
                card.style.boxShadow = '0 12px 40px rgba(63, 212, 125, 0.3)';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });
};

// Trainer Modal System
const initTrainerModal = () => {
    const modal = document.getElementById('trainerModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const trainerCards = document.querySelectorAll('[data-trainer]');

    if (!modal || !modalBody || !modalClose) return;

    // Modal öffnen und Daten füllen
    const openModal = (trainerId) => {
        const trainer = trainerData[trainerId];
        if (!trainer) return;

        modalBody.innerHTML = `
            <h3>${trainer.name}</h3>
            <div class="trainer-specialty">${trainer.specialty}</div>
            <p><strong>Über ${trainer.name.split(' ')[0]}:</strong></p>
            <p>${trainer.description}</p>
            <p>${trainer.bio}</p>
            <div class="trainer-stats">
                <div class="stat">
                    <div class="stat-number">${trainer.experience}</div>
                    <div class="stat-label">Erfahrung</div>
                </div>
                <div class="stat">
                    <div class="stat-number">${trainer.clients}</div>
                    <div class="stat-label">Klienten</div>
                </div>
                <div class="stat">
                    <div class="stat-number">${trainer.certifications}</div>
                    <div class="stat-label">Zertifikate</div>
                </div>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Modal schließen
    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Events für Trainerkarten
    trainerCards.forEach(card => {
        card.addEventListener('click', () => {
            const trainerId = card.getAttribute('data-trainer');
            openModal(trainerId);
        });
    });

    // Schließen-Button
    modalClose.addEventListener('click', closeModal);

    // Klick auf Overlay schließt Modal
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    // Escape-Taste schließt Modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
};

// Akkordeon Funktionalität
const initAccordion = () => {
    const accordionItems = document.querySelectorAll('.accordion-item');

    if (!accordionItems.length) return;

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');

        header.addEventListener('click', () => {
            // Prüfen, ob das Element bereits aktiv ist
            const isActive = item.classList.contains('active');

            // Alle anderen Elemente schließen
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Öffnen, falls es nicht aktiv war
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Optional: Erstes Element standardmäßig öffnen
    if (accordionItems[0]) {
        accordionItems[0].classList.add('active');
    }
};

// Preisumschalter (Monatlich/Jährlich)
const initPricingToggle = () => {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const pricingCards = document.querySelectorAll('.pricing-card');

    if (!toggleButtons.length || !pricingCards.length) return;

    const pricingData = {
        monthly: {
            basic: 25,
            premium: 55,
            pro: 75,
            elite: 105
        },
        yearly: {
            basic: 20,
            premium: 45,
            pro: 60,
            elite: 85
        }
    };

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const period = button.getAttribute('data-period');

            pricingCards.forEach(card => {
                const plan = card.getAttribute('data-plan');
                const amountElement = card.querySelector('.amount');
                const periodElement = card.querySelector('.period');

                if (amountElement && pricingData[period][plan]) {
                    // Animation beim Preiswechsel
                    amountElement.style.transform = 'scale(1.1)';

                    setTimeout(() => {
                        amountElement.textContent = pricingData[period][plan];
                        periodElement.textContent = period === 'yearly' ? '/Monat (jährlich)' : '/Monat';
                        amountElement.style.transform = 'scale(1)';
                    }, 150);
                }
            });
        });
    });
};

/* 5. Formulare und Footer */

// Newsletter Formular
const initNewsletterForm = () => {
    const form = document.getElementById('newsletterForm');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            showMessage('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
            return;
        }

        const submitButton = form.querySelector('button');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Wird gesendet...';
        submitButton.disabled = true;

        setTimeout(() => {
            showMessage('Vielen Dank! Sie haben sich erfolgreich angemeldet.', 'success');
            emailInput.value = '';
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
};

/* 6. Globale Effekte und Events */

// Scroll-Animationen
const initScrollAnimations = () => {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.exercise-card, .pricing-card, .accordion-item');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Globaler Scroll Event Listener
window.addEventListener('scroll', debounce(() => {
    // Platz für weitere scroll-basierte Logik bei Bedarf
}, 10));

/* 7. Initialisierung */

document.addEventListener('DOMContentLoaded', () => {
    // Hilfsstile laden
    addAnimationStyles();

    // Navigation und Struktur
    initHamburgerMenu();
    initSmoothScroll();

    // Komponenten
    initExerciseCardEffects();
    initTrainerModal();
    initAccordion();
    initPricingToggle();
    initNewsletterForm();

    // Globale Effekte
    initScrollAnimations();
});