// src/scripts/main.ts
import { setupDrag } from './drag.ts';
import { imexLoop } from './imexsys.ts';
import { Search } from './search.ts';
import { setupFitty } from './textfit.ts';

setupDrag();
imexLoop();
Search();
setupFitty();
