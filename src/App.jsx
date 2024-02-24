import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Movie from './Pages/Movie'
import Header from './Components/Header'
import Movies from './Pages/Movies'
import './App.css'
import Genre from './Pages/Genre'

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/movie/:id' element={<Movie />}></Route>
          <Route path='/movies/:type' element={<Movies />}></Route>
          <Route path='/genre' element={<Genre />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App