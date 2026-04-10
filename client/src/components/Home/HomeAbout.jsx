import React from 'react'
import logo from '../../assets/logo.png'
import pub from '../../assets/pub.png'
import useTranslate from "../../hooks/useTranslate";
export default function HomeAbout() {
  const { t } = useTranslate();
  
  return (
    <div className='py-14 lg:grid lg:grid-cols-3 w-full items-center justify-center text-center bg-white lg:relative'>
      <div className='col-span-1 text-center pb-6 lg:pb-0'>
        <img src={logo} className="w-[50%] lg:w-[80%] mx-auto"/>
      </div>
  <div className='col-span-2 text-sm font-inter font-extralight text-left px-10 relative lg:static'>

  <img
    src={pub}
    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
    max-h-[400px] opacity-30 w-full object-cover z-0'
  />

  <h1 className='text-3xl font-bold font-inter relative z-10'>
    {t("home_about_title")}
  </h1>
  <br/>

  <p className='relative z-10'>
    {t("home_about_paragraph1")}
    <br/><br/>
    {t("home_about_paragraph2")}
    <br/><br/>
    {t("home_about_paragraph3")}
    <br/><br/>
    {t("home_about_paragraph4")}
  </p>

</div>
    </div>
  )
}
