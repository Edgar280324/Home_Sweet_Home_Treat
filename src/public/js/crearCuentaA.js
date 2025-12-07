// Soft Minimalism Create Account Form JavaScript
class SoftMinimalismCreateAccountForm {
    constructor() {
        this.form = document.getElementById('crearCuentaForm');
        this.nameInput = document.getElementById('name');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.confirmPasswordInput = document.getElementById('passwordConfirm');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.submitButton = this.form.querySelector('.comfort-button');
        this.successMessage = document.getElementById('successMessage');
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupPasswordToggle();
        this.setupGentleEffects();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Validaciones en tiempo real
        this.nameInput.addEventListener('blur', () => this.validateName());
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());
        this.confirmPasswordInput.addEventListener('blur', () => this.validatePasswordConfirm());

        // Clears de error
        this.nameInput.addEventListener('input', () => this.clearError('name'));
        this.emailInput.addEventListener('input', () => this.clearError('email'));
        this.passwordInput.addEventListener('input', () => this.clearError('password'));
        this.confirmPasswordInput.addEventListener('input', () => this.clearError('passwordConfirm'));
    }

    setupPasswordToggle() {
        if (!this.passwordToggle) return;
        
        this.passwordToggle.addEventListener('click', () => {
            const type = this.passwordInput.type === 'password' ? 'text' : 'password';
            this.passwordInput.type = type;
            this.confirmPasswordInput.type = type;

            this.passwordToggle.classList.toggle('toggle-active', type === 'text');
            this.triggerGentleRipple(this.passwordToggle);
        });
    }

    setupGentleEffects() {
        const inputs = [
            this.nameInput,
            this.emailInput,
            this.passwordInput,
            this.confirmPasswordInput
        ];

        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                const container = e.target.closest('.field-container');
                if (container) this.triggerSoftFocus(container);
            });

            input.addEventListener('blur', (e) => {
                const container = e.target.closest('.field-container');
                if (container) this.releaseSoftFocus(container);
            });
        });

        this.addGentleClickEffects();
    }

    triggerSoftFocus(container) {
        container.style.transition = 'all 0.3s ease';
        container.style.transform = 'translateY(-1px)';
    }

    releaseSoftFocus(container) {
        container.style.transform = 'translateY(0)';
    }

    triggerGentleRipple(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 150);
    }

    addGentleClickEffects() {
        const elements = document.querySelectorAll('.comfort-button');
        elements.forEach(element => {
            element.addEventListener('mousedown', () => {
                element.style.transform = 'scale(0.97)';
            });
            element.addEventListener('mouseup', () => {
                element.style.transform = 'scale(1)';
            });
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'scale(1)';
            });
        });
    }

    // ---------------- VALIDACIONES ----------------

    validateName() {
        if (!this.nameInput.value.trim()) {
            this.showError('name', 'Ingresa tu nombre completo');
            return false;
        }
        return true;
    }

    validateEmail() {
        const email = this.emailInput.value.trim();
        if (!email) {
            this.showError('email', 'Ingresa tu correo');
            return false;
        }
        if (!email.includes('@')) {
            this.showError('email', 'Correo no válido');
            return false;
        }
        return true;
    }

    validatePassword() {
        const pass = this.passwordInput.value;
        if (!pass) {
            this.showError('password', 'Ingresa una contraseña');
            return false;
        }
        if (pass.length < 6) {
            this.showError('password', 'Debe tener mínimo 6 caracteres');
            return false;
        }
        return true;
    }

    validatePasswordConfirm() {
        if (this.confirmPasswordInput.value !== this.passwordInput.value) {
            this.showError('passwordConfirm', 'Las contraseñas no coinciden');
            return false;
        }
        return true;
    }

    showError(field, message) {
        const container = document.getElementById(field).closest('.soft-field');
        const errorEl = document.getElementById(`${field}Error`);

        if (container) container.classList.add('error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('show');
        }

        this.triggerGentleShake(container);
    }

    clearError(field) {
        const el = document.getElementById(field);
        if (!el) return;

        const container = el.closest('.soft-field');
        const errorEl = document.getElementById(`${field}Error`);

        if (container) container.classList.remove('error');
        if (errorEl) {
            errorEl.classList.remove('show');
            setTimeout(() => errorEl.textContent = '', 300);
        }
    }

    triggerGentleShake(element) {
        if (!element) return;

        element.style.animation = 'none';
        element.style.transform = 'translateX(2px)';

        setTimeout(() => { element.style.transform = 'translateX(-2px)'; }, 100);
        setTimeout(() => { element.style.transform = 'translateX(0)'; }, 200);
    }

    // ---------------- SUBMIT ----------------

    async handleSubmit(e) {
        e.preventDefault();

        const valid =
            this.validateName() &
            this.validateEmail() &
            this.validatePassword() &
            this.validatePasswordConfirm();

        if (!valid) return;

        this.setLoading(true);

        const payload = {
            nombre: this.nameInput.value.trim(),
            correo: this.emailInput.value.trim(),
            password: this.passwordInput.value
        };

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (!res.ok) {
                this.showError('email', data.error || 'Error al crear cuenta');
                return;
            }

            this.showGentleSuccess();

            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);

        } catch (error) {
            this.showError('email', 'Error del servidor');
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(loading) {
        this.submitButton.classList.toggle('loading', loading);
        this.submitButton.disabled = loading;
    }

    showGentleSuccess() {
        this.form.style.transform = 'scale(0.97)';
        this.form.style.opacity = '0';
        this.form.style.filter = 'blur(1px)';

        setTimeout(() => {
            this.form.style.display = 'none';
            if (this.successMessage) this.successMessage.classList.add('show');
            this.triggerSuccessGlow();
        }, 300);
    }

    triggerSuccessGlow() {
        const card = document.querySelector('.soft-card');
        if (card) {
            card.style.boxShadow = `
                0 20px 40px rgba(240, 206, 170, 0.2),
                0 8px 24px rgba(240, 206, 170, 0.15)
            `;
            setTimeout(() => {
                card.style.boxShadow = '';
            }, 2000);
        }
    }
}

// Inicializar al cargar DOM
document.addEventListener('DOMContentLoaded', () => {
    new SoftMinimalismCreateAccountForm();
});
