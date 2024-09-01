import React from 'react';
import { Link } from 'react-router-dom';
import arabicicon from '../../Components/Icons/StudentIcons/supject/ArabicIcon';
import mathicon from '../../Components/Icons/StudentIcons/supject/mathIcon';
import Socialicon from '../../Components/Icons/StudentIcons/supject/SocialstudiesIcon';
import Sciencesicon from '../../Components/Icons/StudentIcons/supject/Sciencesicon';
import Frenchicon from '../../Components/Icons/StudentIcons/supject/Frenchicon';
import Englishicon from '../../Components/Icons/StudentIcons/supject/Englishicon';
import technologyicon from '../../Components/Icons/StudentIcons/supject/technologyicon';
import Skillsicon from '../../Components/Icons/StudentIcons/supject/Skillsicon';

const subjects = [
  { id: 1, name: "الرياضيات", icon: mathicon },
  { id: 2, name: "عربي", icon: arabicicon },
  { id: 3, name: "دراسات", icon: Socialicon },
  { id: 4, name: "علوم", icon: Sciencesicon },
  { id: 5, name: "اللغة الفرنسية", icon: Frenchicon },
  { id: 6, name: "اللغة الإنجليزية", icon: Englishicon },
  { id: 7, name: "التكنولوجيا", icon: technologyicon },
  { id: 8, name: "المهارات", icon: Skillsicon }
];

const Curricula = () => {
  return (
    <div className="grid grid-cols-2 gap-4 my-5 mx-4">
      {subjects.map((subject) => (
        <Link
          key={subject.id}
          to={`/subject/${subject.id}`}
          className="bg-gray-100 border-2 border-red-600 rounded-lg p-4 text-red-600 text-center text-base flex flex-col items-center hover:bg-red-600 hover:text-white transition-colors"
        >
          <subject.icon className="w-10 h-10 mb-2" />
          <h3 className="mb-2 font-bold text-xl">{subject.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default Curricula;
