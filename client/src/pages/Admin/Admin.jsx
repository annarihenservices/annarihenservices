import React from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import useTranslate from "../../hooks/useTranslate";

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { signoutFailed, signoutSuccess } from '../../redux/admin/adminSlice';
import {  toast } from 'react-toastify';

export default function Admin() {
    const { t } = useTranslate();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const {pathname}=location;

    const handleLogOut = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/annaservice/auth/signout`);
            const data = await res.json();
            if (data.success === false) {
                useDispatch(signoutFailed(data.message))
                toast.error(data.message, {
                    autoClose: 2000,
                })
            }
            else {
                dispatch(signoutSuccess())
            }
        } catch (error) {
            dispatch(signoutFailed(error.message))
            toast.error(error.message, {
                autoClose: 2000,
            })
        }
    }

  return (
    <div className='h-auto z-[-50]'>
        <div className=' lg:grid lg:grid-cols-12 h-auto -mt-32 '>
        <div className=' pt-20 px-1  lg:hidden flex justify-between space-x-5'>
                <button onClick={()=>navigate('/admin')} 
                    className={`  text-black relative h-10 lg:h-14 mb-1 w-full text-center bg-red hover:bg-green rounded-lg text-xl items-center justify-center flex font-bold 
                        ${ pathname==="/admin" && "bg-white border-[1px] hover:text-wite border-black text-black" }
                        `}                     
                    >{t("Accueil")}</button>

                <button onClick={()=>navigate('/admin/services')}
                    className={` text-black w-full h-10 lg:h-14 mb-1 text-center bg-red hover:bg-green hover:text-white rounded-lg text-xl items-center justify-center flex font-bold 
                        ${pathname.includes('services') && 'bg-white border-[1px] hover:text-wite border-black text-black'}
                        `}
                    >{t("Services")}</button>
                <button onClick={handleLogOut}
                    className={`text-white w-full h-10 lg:h-14 mb-1 text-center bg-green hover:bg-red hover:text-white rounded-lg text-xl items-center justify-center flex font-bold
                            `}
                    ><Link to={"/login"}>{t("logout")}</Link></button>
            </div>
            <div className='col-span-2  pt-32 px-1 hidden lg:block '>
                <button onClick={()=>navigate('/admin')} 
                    className={`  text-black relative h-10 lg:h-14 mb-1 w-full text-center bg-red hover:bg-green hover:text-white rounded-lg text-xl items-center justify-center flex font-bold 
                        ${ pathname==="/admin" && "text-black bg-white hover:text-wite border-[1px] border-green " }
                        `}                     
                    >{t("Accueil")}</button>

                <button onClick={()=>navigate('/admin/services')}
                    className={` text-black w-full h-14 mb-1 text-center bg-red hover:bg-green hover:text-white rounded-lg text-xl items-center justify-center flex font-bold 
                        ${pathname.includes('services') && 'text-black bg-white hover:text-wite border-[1px] border-green '}
                        `}
                    >{t("Services")}</button>
                <button onClick={handleLogOut}
                    className={`text-white w-full h-14 mb-1 text-center bg-green hover:bg-red rounded-lg text-xl items-center justify-center flex font-bold
                            `}
                    ><Link to={"/login"}>{t("logout")}</Link></button>
            </div>
            <div className='col-span-10 mt-32  '>
                {<Outlet/>}
            </div>
        </div>
      
      
    </div>
  )
}
