import React from 'react';
import {createRoot} from 'react-dom/client';
import Newtab from './Newtab';
import './index.css';
import {RootStoreProvider} from '../providers/RootStoreProvider';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
    
const container = document.getElementById('app-container');
if (container) {
    const root = createRoot(container); // createRoot(container!) if you use TypeScript
    root.render(<>
            <RootStoreProvider>
                <Newtab/>
            </RootStoreProvider>
            <ToastContainer/>
        </>
    );
}

