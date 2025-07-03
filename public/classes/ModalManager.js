export default class ModalManager {
  constructor(modalConfigs) {
    modalConfigs.forEach(({ trigger, modal, close }) => {
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
      if (modalEl) {
        modalEl.addEventListener('click', (e) => {
          if (e.target === modalEl) {
            modalEl.classList.add('hidden');
            modalEl.classList.remove('flex');
          }
        });
      }
    });
  }
}