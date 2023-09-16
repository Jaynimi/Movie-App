import React from 'react'
import { FaFacebookSquare, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

export default function Footer() {
  return (
    <>
        <div className='flex justify-center items-center flex-col gap-6'>
            <div className="flex justify-center gap-8">
                <FaFacebookSquare className="text-2xl"/>
                <FaInstagram className="text-2xl"/>
                <FaTwitter className="text-2xl"/>
                <FaYoutube className="text-2xl"/>
            </div>
            <div className='flex gap-10 text-black-400 font-bold'>
                <a href='/'>Conditions of use</a>
                <a href='/'>Privacy & Policy</a>
                <a href='/'>Press Room</a>
            </div>
            <div>
                <p className='text-slate-500 font-medium mb-6'>© 2021 MovieBox by Adriana Eka Prayudha</p>
            </div>
        </div>
    </>
  )
}
