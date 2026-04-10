import React from 'react';
import a1 from '../assets/a1.jpg';
import a2 from '../assets/a2.jpg';
import b1 from '../assets/b1.jpg';
import b2 from '../assets/b2.jpg';
import flag from '../assets/flag.png';
import useTranslate from "../hooks/useTranslate";

export default function CoursesPage() {
  const { t } = useTranslate();
  const courses = [
    {
      img: a1,
      title: t("home_level1"),
      description: t("level1_desc")
    },
    {
      img: a2,
      title: t("home_level2"),
      description: t("level2_desc")
    },
    {
      img: b1,
      title: t("home_level3"),
      description: t("level3_desc")
    },
    {
      img: b2,
      title: t("home_level4"),
      description: t("level4_desc")
    }
  ];

  return (
    <div className="w-full bg-white py-14 px-6 lg:px-20 font-inter">

      <div className="relative mb-14 text-left ">
        <h1 className="text-4xl font-bold relative z-10 mb-6">{t("cours_italien")}</h1>
        <p className="relative z-10 font-extralight text-lg">
          {t("courses_description")}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {courses.map((course, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-gray-400 duration-300">
            <div className="relative overflow-hidden cursor-pointer">
              <img
                src={course.img}
                alt={course.title}
                className="w-full max-h-[250px] object-cover rounded-t-lg hover:scale-105 duration-300"
              />
            </div>
            <div className="p-6 text-left">
              <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
              <p className="font-extralight text-gray-700">{course.description}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}