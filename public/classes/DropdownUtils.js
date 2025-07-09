class DropdownUtils {
    static createCustomDropdown(buttonId, menuId, openClasses, closeClasses) {
        const dropdown = new Dropdown(buttonId, menuId);
        
        if (dropdown.button && dropdown.menu) {
            dropdown.open = function() {
                this.isOpen = true;
                this.menu.classList.remove(...closeClasses);
                this.menu.classList.add(...openClasses);
            };
            
            dropdown.close = function() {
                this.isOpen = false;
                this.menu.classList.add(...closeClasses);
                this.menu.classList.remove(...openClasses);
            };
        }
        
        return dropdown;
    }
    
    static createManager(dropdowns) {
        dropdowns.forEach(dropdown => {
            const originalOpen = dropdown.open.bind(dropdown);
            dropdown.open = function() {
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.close();
                    }
                });
                originalOpen();
            };
        });
        
        return {
            closeAll: function() {
                dropdowns.forEach(d => d.close());
            }
        };
    }
}
