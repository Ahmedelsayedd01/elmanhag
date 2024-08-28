import React from 'react'

const TextTitle = ({ text, color = "mainColor", font = "semibold" }) => {
       return (
              <span
                     className={`text-5xl text-${color} font-${font} `}
              >
                     {text}
              </span>
       );
};

export default TextTitle;