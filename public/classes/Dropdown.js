class Dropdown {
    constructor(buttonId, menuId) {
        this.button = document.getElementById(buttonId);
        this.menu = document.getElementById(menuId);
        this.isOpen = false;
        
        if (this.button && this.menu) {
            this.setupEvents();
            this.close();
        }
    }
    
    setupEvents() {
        this.button.onclick = (e) => {
            e.stopPropagation();
            this.toggle();
        };
        
        document.onclick = (e) => {
            if (!this.button.contains(e.target) && !this.menu.contains(e.target)) {
                this.close();
            }
        };
        
        document.onkeydown = (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        };
        
        const links = this.menu.querySelectorAll('a');
        links.forEach(link => {
            link.onclick = () => this.close();
        });
    }
    
    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }
    
    open() {
        this.isOpen = true;
        this.menu.classList.remove('opacity-0', 'invisible', 'translate-y-2');
        this.menu.classList.add('opacity-100', 'visible', 'translate-y-0');
        
        const chevron = this.button.querySelector('svg:last-child');
        if (chevron) {
            chevron.classList.add('rotate-180');
        }
    }
    
    close() {
        this.isOpen = false;
        this.menu.classList.add('opacity-0', 'invisible', 'translate-y-2');
        this.menu.classList.remove('opacity-100', 'visible', 'translate-y-0');
        
        const chevron = this.button.querySelector('svg:last-child');
        if (chevron) {
            chevron.classList.remove('rotate-180');
        }
    }
}
