import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import App from './App';
import store from './core/store';

import About from './routes/About';
import ErrorPage from './routes/ErrorPage';
import Home from './routes/Home';
import Visual from './routes/Visual';
import Culinary from './routes/Culinary';
import Literary from './routes/Literary';
import Technology from './routes/Technology';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />} errorElement={<ErrorPage />}>
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="visual" element={<Visual />} />
    <Route path="culinary" element={<Culinary />} />
    <Route path="literary" element={<Literary />} />
    <Route path="technology" element={<Technology />} />
  </Route>
));

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);