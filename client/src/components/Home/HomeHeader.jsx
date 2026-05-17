import React from 'react'
import useTranslate from "../../hooks/useTranslate";

export default function HomeHeader() {
  const { t } = useTranslate();
  return (
    <div className="relative h-[80vh] font-sans rounded-xl mx-2 overflow-hidden">

  {/* Video */}
  <img
    src={'https://res.cloudinary.com/dbeqyl7n6/image/upload/v1779026271/font-1_wacrzc.jpg'}
    className="absolute inset-0 w-full h-full object-cover z-0"
  />

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/40 z-10"></div>

  {/* Headline */}
  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 space-y-6 text-center px-4">
  <h1 className="text-white sm:text-5xl text-3xl p-1 font-bold">
    {t("hook")}
  </h1>

  <a
    href="/Consultation"
    className="bg-red hover:bg-green text-white text-lg font-medium px-6 py-3 rounded-2xl transition-colors"
  >
    {t("Consultation")}
  </a>
</div>

</div>
    
  )
}
