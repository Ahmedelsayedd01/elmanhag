import React from 'react';
import arabicicon from '../../Components/Icons/StudentIcons/supject/ArabicIcon';
import mathicon from '../../Components/Icons/StudentIcons/supject/mathIcon';

import styled from "styled-components";

const SubjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 20px 0;
`;

const SubjectButton = styled.button`
  background-color: #f9f9f9;
  border: 2px solid #d32f2f;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  font-size: 1.2rem;
  color: #d32f2f;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    background-color: #d32f2f;
    color: #fff;
  }

  svg {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
  }
`;

const subjects = [
  { name: "الرياضيات", icon: mathicon },
  { name: "عربي", icon: arabicicon },
  { name: "دراسات", icon: Socialicon },
  { name: "علوم", icon: arabicicon },
  { name: "اللغة الفرنسية", icon: arabicicon },
  { name: "اللغة الإنجليزية", icon: arabicicon },
  { name: "التكنولوجيا", icon: arabicicon },
  { name: "المهارات", icon: arabicicon }
];

const Curricula = () => {
  return (
    <SubjectsGrid>
      {subjects.map((subject, index) => (
        <SubjectButton key={index}>
          <subject.icon />
          {subject.name}
        </SubjectButton>
      ))}
    </SubjectsGrid>
  );
};

export default Curricula;
