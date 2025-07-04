import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

/* import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound' 
import AppLayout from './pages/AppLayout' */

import CityList from './components/CityList'
import City from './components/City'
import CountryList from './components/CountryList'
import Form from './components/Form'
import { CitiesProvider } from './context/CitiesContext'
import { AuthProvider } from './context/FakeAuthContext'
import ProtectedRoute from './pages/ProtectedRoute'
import SpinnerFullPage from './components/SpinnerFullPage'

const Homepage = lazy(() => import("./pages/Homepage"))
const Product = lazy(() => import("./pages/Product"))
const Pricing = lazy(() => import("./pages/Pricing"))
const Login = lazy(() => import("./pages/Login"))
const PageNotFound = lazy(() => import("./pages/PageNotFound"))
const AppLayout = lazy(() => import("./pages/AppLayout"))



/* dist/assets/index-91588379.css   30.44 kB │ gzip:   5.27 kB
dist/assets/index-a908d31c.js   510.67 kB │ gzip: 148.86 kB */




function App() {



  return (

    <AuthProvider>
      <CitiesProvider>
        <div>

          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>

              <Routes>
                <Route index element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="login" element={<Login />} />

                <Route path="app" element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                } >
                  <Route index element={<Navigate replace to='cities' />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path='cities/:id' element={<City />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                  <Route path='*' element={<PageNotFound />} />
                </Route>


              </Routes>
            </Suspense>
          </BrowserRouter>
        </div>
      </CitiesProvider>
    </AuthProvider>


  )
}

export default App
