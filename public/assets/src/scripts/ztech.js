const React = require('react');
const { render } = require('react-dom');
const Wrapper = require('./modules/ztech-main-wrapper-view.jsx');
// first some basic notes and or assumptions.
// The main assumption here is that older browser support for styling and
// functionality is minimal to non-existent (within reason of course).

// And away we go....... loading app into parent container
render(
    <Wrapper />,
    document.querySelector('.js__content-target')
);
