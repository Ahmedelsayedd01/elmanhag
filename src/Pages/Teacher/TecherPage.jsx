import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { DiAndroid, DiApple } from 'react-icons/di'
import { NavLink } from 'react-router-dom'
import Loading from '../../Components/Loading';
import { useAuth } from '../../Context/Auth';
import axios from 'axios';

const TecherPage = () => {
       const navigate = useNavigate();
       const auth = useAuth();
       const [isLoading, setIsLoading] = useState(false);
       const [teacherSubject, setTeacherSubject] = useState([]);


       const fetchData = async () => {
              setIsLoading(true);
              try {
                     const response = await axios.get('https://bcknd.elmanhag.com/teacher/live/view', {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            console.log(response.data)
                            setTeacherSubject(response.data.sessions)
                     }
              } catch (error) {
                     console.error('Error fetching data:', error);
              } finally {
                     setIsLoading(false);
              }
       };
       useEffect(() => {
              fetchData();
       }, []);

       const handleNavigate = (subject) => {
              console.log(subject)
              navigate(`subject/${subjectId}`, { state: { live: subject } });  // Navigate to the correct path under "curricula"
       };

       return (
              <>
                     <div className="p-4 md:p-8 lg:p-12">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                   {teacherSubject.map((subject) => (
                                          <div
                                                 key={subject.id}
                                                 className="subject-box p-3 flex flex-col justify-center items-center bg-white rounded-xl shadow-lg hover:cursor-pointer transition-transform transform hover:scale-105"
                                                 style={{ boxShadow: '0px 0px 8px rgba(208, 16, 37, 0.12)' }}
                                                 onClick={() => handleNavigate(subject)}
                                          >
                                                 <span className="text-mainColor text-lg md:text-xl lg:text-2xl font-bold mb-3">
                                                        {subject.name}
                                                 </span>
                                                 <img
                                                        src={subject.thumbnail_url}
                                                        alt={subject.name}
                                                 // className="w-32 h-32"
                                                 />
                                          </div>
                                   ))}
                            </div>
                     </div>
              </>
       )
}

export default TecherPage