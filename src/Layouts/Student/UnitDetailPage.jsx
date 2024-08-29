import React from 'react';
import { useParams } from 'react-router-dom';

// يمكن نقل هذه البيانات إلى ملف منفصل إذا كانت كبيرة أو ديناميكية
const subjects = [
  { id: 1, name: "الرياضيات", icon: mathicon, units: ['الجبر', 'الهندسة', 'الرياضيات التطبيقية'] },
  { id: 2, name: "عربي", icon: arabicicon, units: ['النحو', 'الصرف', 'الأدب'] },
  { id: 3, name: "دراسات", icon: Socialicon, units: ['التاريخ', 'الجغرافيا', 'الاقتصاد'] },
  { id: 4, name: "علوم", icon: Sciencesicon, units: ['الأحياء', 'الفيزياء', 'الكيمياء'] },
  { id: 5, name: "اللغة الفرنسية", icon: Frenchicon, units: ['المحادثة', 'القواعد', 'الأدب'] },
  { id: 6, name: "اللغة الإنجليزية", icon: Englishicon, units: ['القراءة', 'الكتابة', 'الاستماع'] },
  { id: 7, name: "التكنولوجيا", icon: technologyicon, units: ['البرمجة', 'الأنظمة', 'الأجهزة'] },
  { id: 8, name: "المهارات", icon: Skillsicon, units: ['إدارة الوقت', 'التفكير النقدي', 'القيادة'] }
];

const UnitDetailPage = () => {
  const { subjectId } = useParams();
  // العثور على المادة بناءً على subjectId
  const subject = subjects.find(sub => sub.id === parseInt(subjectId));

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{subject ? subject.name : "مادة غير موجودة"}</h1>
      {subject ? (
        <ul className="list-disc list-inside">
          {subject.units.map((unit, index) => (
            <li key={index} className="mb-2">
              {unit}
            </li>
          ))}
        </ul>
      ) : (
        <p>لا توجد تفاصيل للمادة المحددة.</p>
      )}
    </div>
  );
};

export default UnitDetailPage;