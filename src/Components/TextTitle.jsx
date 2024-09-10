import React from 'react'

const TextTitle = ({ width = 'text-5xl', text, color = "mainColor", font = "semibold" }) => {
       return (
              <span
                     className={`${width} text-${color} font-${font} `}
              >
                     {text}
              </span>
       );
};

export default TextTitle;