// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // Initial call
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Apply animations to elements
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    const fadeElements = document.querySelectorAll('.section-header, .project-card, .skill-category, .contact-item');
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    const leftElements = document.querySelectorAll('.about-text, .contact-info');
    leftElements.forEach(element => {
        element.classList.add('slide-in-left');
        observer.observe(element);
    });

    const rightElements = document.querySelectorAll('.about-stats, .contact-form');
    rightElements.forEach(element => {
        element.classList.add('slide-in-right');
        observer.observe(element);
    });
});

// Skills progress bar animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Trigger skill bar animation when skills section is visible
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateSkillBars, 500);
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// Project details toggle functionality
function toggleProjectDetails(button) {
    const projectCard = button.closest('.project-card');
    const details = projectCard.querySelector('.project-details');
    const icon = button.querySelector('i');
    
    details.classList.toggle('show');
    button.classList.toggle('expanded');
    
    // Update button text
    const span = button.querySelector('span');
    if (details.classList.contains('show')) {
        span.textContent = 'Hide Details';
    } else {
        span.textContent = 'View Details';
    }
}

// Contact form functionality
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:2000.srijeetray@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Thank you for your message! Your email client should open now.');
    
    // Reset form
    this.reset();
});

// Download resume functionality
function downloadResume() {
    // Create a simple resume content
    const resumeContent = `
SRIJEET RAY
SAP Integration Specialist
Email: 2000.srijeetray@gmail.com
LinkedIn: https://www.linkedin.com/in/srijeetray/

SKILLS:
• SAP Cloud Platform Integration (CPI)
• SAP CPI-DS (Data Services)
• SAP API Management
• Event-Driven Architecture (SAP Event Mesh, Advanced Event Mesh - Solace)
• SAP Integrated Business Planning (IBP)
• Groovy Scripting
• XSLT Mapping
• Integration Design Patterns
• OData APIs (V2 & V4)
• BTP (SAP Business Technology Platform)
• Prompt Engineering & Advanced Prompt Engineering
• Generative AI Tools Integration in CPI
• End-to-End iFlow Development

FEATURED PROJECTS:

1. AI-Powered Instagram Store Support Bot
   - Intelligent customer support system using AIML API
   - Automated order processing and routing
   - Technologies: SAP CPI, AIML API, Groovy, Google Sheets

2. Loan Eligibility API
   - Automated credit assessment system
   - RESTful API for banks and fintech platforms
   - Technologies: SAP CPI, REST API, Groovy, JSON Processing

3. Automated PO Creation System
   - Integration between Google Sheets and Salesforce
   - Automated Purchase Order generation
   - Technologies: SAP CPI, Google Sheets API, Salesforce, XML/CSV

4. Event-Driven Kudos Messaging
   - Publisher-Subscriber pattern implementation
   - Asynchronous messaging using SAP Event Mesh
   - Technologies: SAP Event Mesh, Solace, Mail Integration

5. Order & Review Summary Flow
   - E-commerce analytics integration
   - Automated business intelligence reporting
   - Technologies: SAP CPI, HTTP Adapters, Groovy Analytics

CONTACT:
Email: 2000.srijeetray@gmail.com
LinkedIn: https://www.linkedin.com/in/srijeetray/
Location: India
    `;
    
    // Create and download the resume file
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Srijeet_Ray_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show download message
    alert('Resume downloaded successfully!');
}

// Typing effect for hero section
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', function() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 100);
        }, 1000);
    }
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.getElementById('scrollToTop');
    if (scrollButton) {
        if (window.scrollY > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading states
function showLoading(element) {
    element.classList.add('loading');
}

function hideLoading(element) {
    element.classList.remove('loading');
}

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add page transition effects
function addPageTransitions() {
    // Fade in effect on page load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
}

// Initialize page transitions
addPageTransitions();

// Error handling for external resources
window.addEventListener('error', function(e) {
    console.warn('Resource failed to load:', e.target.src || e.target.href);
});

// Analytics tracking (placeholder for future implementation)
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        const buttonText = e.target.textContent.trim();
        trackEvent('Button', 'Click', buttonText);
    }
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Focus management for accessibility
function manageFocus() {
    const focusableElements = document.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.classList.add('focus-visible');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('focus-visible');
        });
    });
}

// Initialize focus management
document.addEventListener('DOMContentLoaded', manageFocus);

// Service Worker registration for PWA capabilities (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when implementing service worker
        // navigator.serviceWorker.register('/service-worker.js')
        //     .then(registration => console.log('SW registered: ', registration))
        //     .catch(registrationError => console.log('SW registration failed: ', registrationError));
    });
}

// Dark mode toggle (optional feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Initialize dark mode from localStorage
document.addEventListener('DOMContentLoaded', function() {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
    }
});

// Print styles handler
function optimizeForPrint() {
    // Hide unnecessary elements when printing
    const elementsToHide = ['.navbar', '.hero-buttons', '.hamburger'];
    
    elementsToHide.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.display = 'none';
        });
    });
}

// Handle print events
window.addEventListener('beforeprint', function() {
    console.log('Preparing for print...');
    // Add any print-specific optimizations here
});

window.addEventListener('afterprint', function() {
    console.log('Print dialog closed');
    // Restore any changes made for print
});
