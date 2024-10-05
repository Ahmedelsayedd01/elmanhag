import React from 'react'

const TitleHeader = ({ text, spaceBottom = 0, size = "5xl" }) => {
       return (
              <div className={`py-2 mb-${spaceBottom}`}>
                     <span className={`text-${size} text-mainColor font-medium`}>{text}</span>
              </div>
       );
};

export default TitleHeader;

