import React, { useEffect, useState} from 'react';
import Header from '../../components/Header/Header';
import MovieList from '../../components/MovieList/MovieList';
import Footer from '../../components/Footer/Footer';


export default function Home() {
  return (
    <div className='bg-slate-100'>
        <Header />
        <MovieList />
        <Footer />
    </div>
  )
}
