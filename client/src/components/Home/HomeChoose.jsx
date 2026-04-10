import React from 'react'
import pub from '../../assets/pub.png'
import choose from '../../assets/choose.png'
import useTranslate from "../../hooks/useTranslate";

export default function HomeChoose() {
  const { t } = useTranslate();
  return (
    <div className='py-14 lg:grid lg:grid-cols-3 w-full items-center justify-center text-center bg-white lg:relative'>
      <div className='col-span-1 text-center pb-6 lg:pb-0'>
        <img src={choose} className="w-[50%] lg:w-[80%] mx-auto rounded-lg"/>
      </div>
  <div className='col-span-2 text-sm font-inter font-extralight text-left px-10 relative lg:static'>

  <img
    src={pub}
    className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
    max-h-[400px] opacity-30 w-full object-cover z-0'
  />

  <h1 className='text-3xl font-bold font-inter relative z-10'>
    {t("home_choose_t")}
  </h1>
  <br/>

  <p className='relative z-10'>
    {t("home_choose_d")}
</p>
  <br/><br/>

  <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      <div class="bg-green p-6 rounded-xl shadow hover:shadow-lg ">
        <h3 class="font-semibold text-lg mb-3">
          {t("home_choose_t1")}
        </h3>
        <p class="text-lack text-sm">
          {t("home_choose_d1")}
        </p>
      </div>

      <div class="bg-green p-6 rounded-xl shadow hover:shadow-lg ">
        <h3 class="font-semibold text-lg mb-3">
          {t("home_choose_t2")}
        </h3>
        <p class="text-lack text-sm">
          {t("home_choose_d2")}
        </p>
      </div>

      <div class="bg-green p-6 rounded-xl shadow hover:shadow-lg ">
        <h3 class="font-semibold text-lg mb-3">
          {t("home_choose_t3")}
        </h3>
        <p class="text-lack text-sm">
          {t("home_choose_d3")}
        </p>
      </div>

      <div class="bg-green p-6 rounded-xl shadow hover:shadow-lg ">
        <h3 class="font-semibold text-lg mb-3">
          {t("home_choose_t4")}
        </h3>
        <p class="text-lack text-sm">
          {t("home_choose_d4")}
        </p>
      </div>

    </div>

</div>
    </div>
  )
}
