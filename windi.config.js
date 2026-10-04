import { defineConfig } from 'windicss/helpers';
import { fontSize } from './windi/fontSize';
import { colors } from './windi/colors';
import { screens } from './windi/screens';

export default defineConfig({
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        rfdevi: ['RFDevi'],
        gilroy: ['Gilroy'],
      },
      fontSize,
      colors,
      screens,
    },
  },
  scan: {
    dirs: ['src'],
    exclude: ['node_modules', '.git', 'public/**/*', '*.template.html', 'index.html'],
    include: [],
  },
  transformCSS: 'pre',
});
