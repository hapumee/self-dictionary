import { configure } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.css';

// automatically import all files ending in *.stories.js
configure([
    require.context('../src/stories', true, /Notice.stories.js/),
    require.context('../src/components', true, /\.stories\.js$/),
    require.context('../src/stories', true, /\.stories\.js$/)
], module);
