     const modalLinks = [
        { trigger: 'authLink', modal: 'authModal', close: 'closeAuthModal' },
        { trigger: 'aboutLink', modal: 'aboutModal', close: 'closeAboutModal' },
        { trigger: 'contactLink', modal: 'contactModal', close: 'closeContactModal' }
        
      ];
    
      modalLinks.forEach(({ trigger, modal, close }) => {
        const triggerEl = document.getElementById(trigger);
        const modalEl = document.getElementById(modal);
        const closeEl = document.getElementById(close);
    
        if (triggerEl && modalEl) {
          triggerEl.addEventListener('click', (e) => {
            e.preventDefault();
            modalEl.classList.remove('hidden');
            modalEl.classList.add('flex');
          });
        }
        if (closeEl && modalEl) {
          closeEl.addEventListener('click', () => {
            modalEl.classList.remove('flex');
            modalEl.classList.add('hidden');
            
          });
        }
        //Close modal when clicking outside the modal content
        if (modalEl) {
          modalEl.addEventListener('click', (e) => {
            if (e.target === modalEl) {
              modalEl.classList.add('hidden');
            }
          });
        }
      });