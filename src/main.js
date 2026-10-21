import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';
import './styles/layout.css';

import { createRouter } from './app/router.js';
import { createShell } from './app/shell.js';
import { routes } from './app/routes.js';

const shell = createShell(document.querySelector('#app'));
const router = createRouter({
  routes,
  onChange: (match) => shell.render(match, router.navigate),
});
router.start();
