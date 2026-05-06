import React from 'react'
import Navbar from './Navbar/Navbar'
import Hero from './Herosection/Hero'
import About from './About/About'
import Service from './Services/Service'
import Training from './Training Section/Training'
import Trainers from './Trainers Section/Trainers'
import Pricing from './Plans/Pricing'
import WhyChooseUs from './WhyChooseUs/WhyChooseUs'
import Transformations from './Transformations/Transformations'
import Testimonials from './Testimonialssection/Testimonials '
import Footer from './Footer/Footer'
import Video from './Video/Video'
import Dietplanadd from './AdminDIetplan/Dietplanadd'

export default function Home() {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <About/>
        <WhyChooseUs/>
        <Service/>
        <Training/>
        <Trainers/>
        <Video/>
        <Dietplanadd/>
        <Pricing/>
        <Transformations/>
        <Testimonials/>
        <Footer/>
        
    </div>
  )
}
