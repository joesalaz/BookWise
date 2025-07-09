document.addEventListener('DOMContentLoaded', function() {
    const allDropdowns = [];
    
    if (document.getElementById('profileDropdownBtn') && document.getElementById('profileDropdownMenu')) {
        const profileDropdown = new Dropdown('profileDropdownBtn', 'profileDropdownMenu');
        allDropdowns.push(profileDropdown);
        window.profileDropdown = profileDropdown;
    }
    
    if (document.getElementById('notificationsDropdownBtn') && document.getElementById('notificationsDropdownMenu')) {
        const notificationsDropdown = new Dropdown('notificationsDropdownBtn', 'notificationsDropdownMenu');
        allDropdowns.push(notificationsDropdown);
        window.notificationsDropdown = notificationsDropdown;
        
        setupNotificationsDropdown(notificationsDropdown);
    }
    
    if (document.getElementById('menuBtn') && document.getElementById('mobileNav')) {
        const mobileDropdown = DropdownUtils.createCustomDropdown(
            'menuBtn', 
            'mobileNav',
            ['opacity-100', 'visible', 'max-h-96'],
            ['opacity-0', 'invisible', 'max-h-0']
        );
        allDropdowns.push(mobileDropdown);
        window.mobileDropdown = mobileDropdown;
    }
    
    if (allDropdowns.length > 0) {
        const dropdownManager = DropdownUtils.createManager(allDropdowns);
        window.dropdownManager = dropdownManager;
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                dropdownManager.closeAll();
            }
        });
    }
    
    function setupNotificationsDropdown(notificationsDropdown) {
        const notificationItems = document.querySelectorAll('#notificationsDropdownMenu .hover\\:bg-blue-50\\/50');
        notificationItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const dot = this.querySelector('div > div');
                if (dot && !dot.classList.contains('bg-gray-300')) {
                    dot.classList.remove('bg-blue-500', 'bg-green-500', 'bg-yellow-500');
                    dot.classList.add('bg-gray-300');
                    updateNotificationsBadge();
                }
            });
        });
        
        function updateNotificationsBadge() {
            const badge = document.querySelector('#notificationsDropdownBtn .bg-red-500');
            const unreadDots = document.querySelectorAll('#notificationsDropdownMenu .bg-blue-500, #notificationsDropdownMenu .bg-green-500, #notificationsDropdownMenu .bg-yellow-500');
            
            if (badge) {
                const count = unreadDots.length;
                if (count > 0) {
                    badge.textContent = count;
                    badge.classList.remove('hidden');
                } else {
                    badge.classList.add('hidden');
                }
            }
        }
        
        updateNotificationsBadge();
    }
});
