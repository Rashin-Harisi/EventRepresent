import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Layout from './components/layout/Layout';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Events from './components/Events';
import EventPage from './components/EventPage';
import UserDetailsForm from './components/UserDetailsForm';
import AdminPage from './components/AdminPage';

const PUBLISHABLE_KEY = "pk_test_aG9seS1rb2RpYWstMjcuY2xlcmsuYWNjb3VudHMuZGV2JA"
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>

        <Layout>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/events' element={<Events />} />
            <Route path='/events/:id' element={<EventPage />} />
            <Route path='/userInfo' element={<UserDetailsForm/>}/>
            <Route path='/admin' element={<AdminPage/>} />
          </Routes>
        </Layout>

    </BrowserRouter>
  </React.StrictMode>
);
