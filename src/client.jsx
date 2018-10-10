import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';

const renderApp = () => {
    console.log('-------- renderApp --------');
    ReactDOM.hydrate(
        <BrowserRouter>
            <App />
        </BrowserRouter>,
        document.getElementById('root')
    );
};

// ReactDOM.hydrate(
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>,
//     document.getElementById('root')
// );
renderApp();
if (module.hot) {
    console.log('----------------- module.hot -------------------');

    module.hot.accept(<App />, () => renderApp());
} else {
    console.log('----------------- !! NOT !! module.hot -------------------');
}
