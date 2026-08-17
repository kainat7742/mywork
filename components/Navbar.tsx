import Link from "next/link"
import React from "react"

export default function Navbar(){
  return (
    <div>
        <nav className='text-blue-600 flex justify-between px-20 pt-12 fixed top-0 left-0 w-full bg-white z-50 '>
        
        <div className=" text[20px] text-black font-bold ">KNOWLEDGE<span className="text-blue-600">HUB</span>
          </div>
        <ul className=' flex gap-12 '>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/blogs">Blogs</Link></li>
        </ul>
        <Link
            href="/register" 
            className="flex gap-3 rounded-xl bg-blue-600 px-6 py-3   text-white hover:bg-blue-700 hover:bg-white hover:text-blue-700"
          >
            Register
          </Link>
</nav>
    </div>
  )  
}

