import React from 'react'
import HomeHeader from '../components/Home/HomeHeader'
import HomeAbout from '../components/Home/HomeAbout'
import HomeServices from '../components/Home/HomeServices'
import HomeCourses from '../components/Home/HomeCourses'
import HomeChoose from '../components/Home/HomeChoose'
export default function Home() {
  return (
    <div className='w-full bg-CustomWhite'>
      <HomeHeader/>
      <HomeAbout/>
      <HomeServices/>
      <HomeCourses/>
      <HomeChoose/>
    </div>
  )
}
