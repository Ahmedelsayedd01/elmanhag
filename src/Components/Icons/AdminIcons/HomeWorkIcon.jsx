import React from 'react'

const HomeWorkIcon = ({ Width = "24", Height = "24", isActive = false }) => {
       return (
              <svg width={Width} height={Height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <g clipPath="url(#clip0_1087_17660)">
                            <g clipPath="url(#clip1_1087_17660)">
                                   <g clipPath="url(#clip2_1087_17660)">
                                          <path fillRule="evenodd" clipRule="evenodd" d="M22 20C22.2212 20 22.4 19.8208 22.4 19.6V5.2C22.4 4.9792 22.2212 4.8 22 4.8C21.7788 4.8 21.6 4.9792 21.6 5.2V19.6C21.6 19.8208 21.7788 20 22 20ZM23.2 22V21.6H22C21.7788 21.6 21.6 21.4208 21.6 21.2C21.6 20.9792 21.7788 20.8 22 20.8H23.2V4H22C21.7788 4 21.6 3.8208 21.6 3.6C21.6 3.3792 21.7788 3.2 22 3.2H22.9528L22 1.2944L20.8 3.6944V22C20.8 22.6616 21.3384 23.2 22 23.2C22.6616 23.2 23.2 22.6616 23.2 22ZM24.008 3.6C24.008 3.6272 24.0052 3.654 24 3.68V22C24 23.1028 23.1028 24 22 24C20.8972 24 20 23.1028 20 22V3.6C20 3.538 20.0144 3.4764 20.042 3.4212L21.642 0.2212C21.778 -0.05 22.222 -0.05 22.358 0.2212L23.9256 3.3568C23.9772 3.4244 24.008 3.5084 24.008 3.6ZM12.4 12H8.4C8.1788 12 8 12.1792 8 12.4C8 12.6208 8.1788 12.8 8.4 12.8H12.4C12.6212 12.8 12.8 12.6208 12.8 12.4C12.8 12.1792 12.6212 12 12.4 12ZM8.4 11.2H10.8C11.0212 11.2 11.2 11.0208 11.2 10.8C11.2 10.5792 11.0212 10.4 10.8 10.4H8.4C8.1788 10.4 8 10.5792 8 10.8C8 11.0208 8.1788 11.2 8.4 11.2ZM6.4 14.4H14.4V8.8H6.4V14.4ZM5.6 14.8V8.4C5.6 8.1792 5.7788 8 6 8H14.8C15.0212 8 15.2 8.1792 15.2 8.4V14.8C15.2 15.0208 15.0212 15.2 14.8 15.2H6C5.7788 15.2 5.6 15.0208 5.6 14.8ZM0.8 3.6348V22C0.8 22.6392 1.3608 23.2 2 23.2H17.2C17.8392 23.2 18.4 22.6392 18.4 22V4H2C1.6708 4 1.2012 3.9052 0.8 3.6348ZM18.8 0.8H1.6C1.1588 0.8 0.8 1.1588 0.8 1.6V2C0.8 3.1292 1.8016 3.1976 2.0024 3.2H18.8C19.0212 3.2 19.2 3.3792 19.2 3.6V22C19.2 23.084 18.284 24 17.2 24H2C0.916 24 0 23.084 0 22V1.6C0 0.7176 0.7176 0 1.6 0H18.8C19.0212 0 19.2 0.1792 19.2 0.4C19.2 0.6208 19.0212 0.8 18.8 0.8ZM2 22.4C2.2212 22.4 2.4 22.2208 2.4 22V5.2C2.4 4.9792 2.2212 4.8 2 4.8C1.7788 4.8 1.6 4.9792 1.6 5.2V22C1.6 22.2208 1.7788 22.4 2 22.4ZM18 1.6C18.2212 1.6 18.4 1.7792 18.4 2C18.4 2.2208 18.2212 2.4 18 2.4H2C1.7788 2.4 1.6 2.2208 1.6 2C1.6 1.7792 1.7788 1.6 2 1.6H18Z" fill={isActive ? "#D01025" : "#B5B5B5"} />
                                   </g>
                            </g>
                     </g>
                     <defs>
                            <clipPath id="clip0_1087_17660">
                                   <rect width={Width} height={Height} fill="white" />
                            </clipPath>
                            <clipPath id="clip1_1087_17660">
                                   <rect width={Width} height={Height} fill="white" />
                            </clipPath>
                            <clipPath id="clip2_1087_17660">
                                   <rect width={Width} height={Height} fill="white" />
                            </clipPath>
                     </defs>
              </svg>

       )
}

export default HomeWorkIcon