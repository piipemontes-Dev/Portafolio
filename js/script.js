// ============================================
// SCRIPT PRINCIPAL - FIX SERVICES PORTFOLIO
// ============================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fix Services Portfolio - Script cargado correctamente');
    
    // Inicializar pantalla de carga primero
    initLoadingScreen();
    
    // Inicializar todas las funcionalidades después de la carga
    setTimeout(() => {
        initNavigation();
        initContactForm();
        initScrollEffects();
        initAnimations();
    }, 3000); // Esperar 3 segundos antes de inicializar el resto
});

// ============================================
// PANTALLA DE CARGA INICIAL
// ============================================

function initLoadingScreen() {
    console.log('Iniciando pantalla de carga...');
    
    // Obtener elementos de la pantalla de carga
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    if (!loadingScreen || !mainContent) {
        console.error('Elementos de carga no encontrados');
        return;
    }
    
    // Mostrar el contenido principal después de 3 segundos
    setTimeout(() => {
        console.log('Ocultando pantalla de carga...');
        
        // Agregar clase de fade-out a la pantalla de carga
        loadingScreen.classList.add('fade-out');
        
        // Mostrar el contenido principal
        mainContent.classList.remove('hidden');
        mainContent.classList.add('show');
        
        // Remover la pantalla de carga del DOM después de la transición
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            console.log('Pantalla de carga removida');
        }, 800); // Esperar a que termine la transición CSS (0.8s)
        
    }, 3000); // 3 segundos de duración
    
    // Efecto de typing en el título de carga
    const loadingTitle = document.querySelector('.loading-title');
    if (loadingTitle) {
        const originalText = loadingTitle.textContent;
        loadingTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                loadingTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 150); // Velocidad de escritura
            }
        };
        
        // Iniciar efecto de typing después de un pequeño delay
        setTimeout(typeWriter, 500);
    }
    
    // Efecto de progreso visual (opcional)
    createProgressBar();
}

// Función para crear una barra de progreso visual
function createProgressBar() {
    const loadingContainer = document.querySelector('.loading-container');
    if (!loadingContainer) return;
    
    // Crear barra de progreso
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = `
        <div class="progress-fill"></div>
    `;
    
    // Agregar estilos
    progressBar.style.cssText = `
        width: 200px;
        height: 4px;
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 2px;
        margin: 20px auto 0;
        overflow: hidden;
    `;
    
    const progressFill = progressBar.querySelector('.progress-fill');
    progressFill.style.cssText = `
        height: 100%;
        background: linear-gradient(90deg, var(--accent-color), #fff);
        width: 0%;
        transition: width 0.1s ease;
        border-radius: 2px;
    `;
    
    loadingContainer.appendChild(progressBar);
    
    // Animar la barra de progreso
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 1;
        progressFill.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 30); // 3 segundos / 100 = 30ms por incremento
}

// ============================================
// NAVEGACIÓN MÓVIL
// ============================================

function initNavigation() {
    // Obtener elementos del menú móvil
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Función para alternar el menú móvil
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    }
    
    // Event listener para el botón hamburguesa
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Cerrar menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Cerrar menú móvil al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Navegación suave entre secciones
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Ajustar por la altura del navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// FORMULARIO DE CONTACTO
// ============================================

function initContactForm() {
    // Obtener el formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Event listener para el envío del formulario
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevenir el envío por defecto
            
            // Obtener los datos del formulario
            const formData = new FormData(contactForm);
            const formObject = {};
            
            // Convertir FormData a objeto
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validar el formulario
            if (validateForm(formObject)) {
                // Mostrar mensaje de éxito
                showSuccessMessage();
                
                // Mostrar datos en consola (requerimiento específico)
                console.log('Formulario enviado correctamente');
                console.log('Datos del formulario:', formObject);
                
                // Limpiar el formulario
                contactForm.reset();
                
                // Simular envío (aquí se podría integrar con un servicio real)
                simulateFormSubmission(formObject);
            }
        });
    }
}

// Función para validar el formulario
function validateForm(data) {
    const errors = [];
    
    // Validar nombre
    if (!data.nombre || data.nombre.trim().length < 2) {
        errors.push('El nombre debe tener al menos 2 caracteres');
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Por favor ingresa un email válido');
    }
    
    // Validar mensaje
    if (!data.mensaje || data.mensaje.trim().length < 10) {
        errors.push('El mensaje debe tener al menos 10 caracteres');
    }
    
    // Mostrar errores si los hay
    if (errors.length > 0) {
        showErrorMessage(errors);
        return false;
    }
    
    return true;
}

// Función para mostrar mensaje de éxito
function showSuccessMessage() {
    // Crear elemento de mensaje de éxito
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="message-content">
            <i class="fas fa-check-circle"></i>
            <h3>¡Mensaje enviado correctamente!</h3>
            <p>Gracias por contactarme. Te responderé pronto.</p>
        </div>
    `;
    
    // Agregar estilos al mensaje
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        animation: slideInDown 0.5s ease-out;
    `;
    
    // Agregar al DOM
    document.body.appendChild(successMessage);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        successMessage.style.animation = 'slideOutUp 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 500);
    }, 3000);
}

// Función para mostrar mensaje de error
function showErrorMessage(errors) {
    // Crear elemento de mensaje de error
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `
        <div class="message-content">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Por favor corrige los siguientes errores:</h3>
            <ul>
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        </div>
    `;
    
    // Agregar estilos al mensaje
    errorMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #f44336, #d32f2f);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        text-align: center;
        animation: slideInDown 0.5s ease-out;
        max-width: 400px;
    `;
    
    // Agregar al DOM
    document.body.appendChild(errorMessage);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        errorMessage.style.animation = 'slideOutUp 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(errorMessage);
        }, 500);
    }, 5000);
}

// Función para simular el envío del formulario
function simulateFormSubmission(data) {
    // Simular delay de envío
    setTimeout(() => {
        console.log('Simulando envío de datos a servidor...');
        console.log('Datos que se enviarían:', data);
        
        // Aquí se podría integrar con un servicio real como:
        // - EmailJS
        // - Formspree
        // - Netlify Forms
        // - Un backend personalizado
    }, 1000);
}

// ============================================
// EFECTOS DE SCROLL
// ============================================

function initScrollEffects() {
    // Efecto de navbar al hacer scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(23, 59, 69, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#173B45';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // Animaciones al hacer scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .about-content, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// ANIMACIONES Y EFECTOS VISUALES
// ============================================

function initAnimations() {
    // Efecto de hover en las tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto de hover en las tarjetas de proyectos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('.project-image img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.project-image img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
    
    // Efecto de typing en el título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Iniciar efecto después de un delay
        setTimeout(typeWriter, 1000);
    }
    
    // Contador animado para estadísticas (si se agregan en el futuro)
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Iniciar contador cuando sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// ============================================
// FUNCIONES UTILITARIAS
// ============================================

// Función para hacer scroll suave a una sección
function smoothScrollTo(elementId) {
    const element = document.querySelector(elementId);
    if (element) {
        const offsetTop = element.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Función para mostrar/ocultar elementos
function toggleElement(elementId) {
    const element = document.querySelector(elementId);
    if (element) {
        element.classList.toggle('hidden');
    }
}

// Función para agregar clase CSS
function addClass(elementId, className) {
    const element = document.querySelector(elementId);
    if (element) {
        element.classList.add(className);
    }
}

// Función para remover clase CSS
function removeClass(elementId, className) {
    const element = document.querySelector(elementId);
    if (element) {
        element.classList.remove(className);
    }
}

// ============================================
// MANEJO DE ERRORES
// ============================================

// Función para manejar errores de JavaScript
window.addEventListener('error', function(e) {
    console.error('Error en JavaScript:', e.error);
    console.error('Archivo:', e.filename);
    console.error('Línea:', e.lineno);
});

// Función para manejar errores de recursos no cargados
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promesa rechazada:', e.reason);
});

// ============================================
// INICIALIZACIÓN ADICIONAL
// ============================================

// Agregar estilos CSS para las animaciones de mensajes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
    }
    
    @keyframes slideOutUp {
        from {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
    }
    
    .success-message .message-content i {
        font-size: 3rem;
        margin-bottom: 1rem;
        display: block;
    }
    
    .error-message .message-content i {
        font-size: 3rem;
        margin-bottom: 1rem;
        display: block;
    }
    
    .error-message ul {
        list-style: none;
        padding: 0;
        margin: 1rem 0 0 0;
    }
    
    .error-message li {
        margin-bottom: 0.5rem;
        padding-left: 1rem;
        position: relative;
    }
    
    .error-message li::before {
        content: '•';
        position: absolute;
        left: 0;
        color: #ffeb3b;
    }
`;

document.head.appendChild(style);

// ============================================
// CONSOLA DE DESARROLLO
// ============================================

// Mensaje de bienvenida en la consola
console.log('%c🚀 Fix Services Portfolio', 'color: #FF8225; font-size: 20px; font-weight: bold;');
console.log('%cDesarrollado por Andrés Montes', 'color: #173B45; font-size: 14px;');
console.log('%cTecnólogo en Mecatrónica y Técnico en Sistemas', 'color: #666; font-size: 12px;');
console.log('=====================================');
console.log('Funciones disponibles:');
console.log('- smoothScrollTo(elementId)');
console.log('- toggleElement(elementId)');
console.log('- addClass(elementId, className)');
console.log('- removeClass(elementId, className)');
console.log('=====================================');
