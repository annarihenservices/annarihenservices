import React from 'react'
import useTranslate from "../../hooks/useTranslate";

export default function HomeHeader() {
  const { t } = useTranslate();
  return (
    <div className="relative h-[80vh] font-sans rounded-xl mx-2 overflow-hidden pb-4">

  {/* Video */}
  <img
    src={'https://res.cloudinary.com/dbeqyl7n6/image/upload/v1779026271/font-1_wacrzc.jpg'}
    className="absolute inset-0 w-full h-full object-cover z-0"
  />

  {/* Dark overlay */}
    
  <div className="absolute inset-0 bg-black/20 z-10 pb-2">

  </div>

  {/* Headline */}
  <div className="absolute inset-0 flex flex-col items-center justify-end z-40 space-y-1 text-center px-4">
  <h2 className="text-white sm:text-xl text-lg p-1 font-bold">
    {t("hook")}
  </h2>
  <h3 className="text-white sm:text-lg text-md p-1 font-bold">
    {t("hook_1")}
  </h3>

  <a
    href="/Consultation"
    className="bg-red hover:bg-green text-white text-md font-medium px-2 py-1 rounded-2xl transition-colors"
  >
    {t("Consultation")}
  </a>
</div>

</div>
    
  )
}
