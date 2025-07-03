import ModalManager from '../classes/ModalManager.js';

const modalLinks = [
  { trigger: 'authLink', modal: 'authModal', close: 'closeAuthModal' },
  { trigger: 'aboutLink', modal: 'aboutModal', close: 'closeAboutModal' },
  { trigger: 'contactLink', modal: 'contactModal', close: 'closeContactModal' }
];

new ModalManager(modalLinks);
