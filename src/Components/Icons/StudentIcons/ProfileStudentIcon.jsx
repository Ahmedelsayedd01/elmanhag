import React from 'react'

const ProfileStudentIcon = ({ Width = "32", Height = "32", isActive = "#fff" }) => {
       return (
              <svg width={Width} height={Height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <g clipPath="url(#clip0_523_856)">
                            <g clipPath="url(#clip1_523_856)">
                                   <path d="M15.9999 18.6667C19.6818 18.6667 22.6666 15.085 22.6666 10.6667C22.6666 6.24841 19.6818 2.66669 15.9999 2.66669C12.318 2.66669 9.33325 6.24841 9.33325 10.6667C9.33325 15.085 12.318 18.6667 15.9999 18.6667Z" fill={isActive ? '#D01025' : '#fff'} />
                                   <path d="M29.0666 25.4667C27.8666 23.0667 25.6 21.0667 22.6666 19.8667C21.8666 19.6 20.9333 19.6 20.2666 20C18.9333 20.8 17.6 21.2 16 21.2C14.4 21.2 13.0666 20.8 11.7333 20C11.0666 19.7334 10.1333 19.6 9.3333 20C6.39996 21.2 4.1333 23.2 2.9333 25.6C1.99996 27.3334 3.46663 29.3334 5.46663 29.3334H26.5333C28.5333 29.3334 30 27.3334 29.0666 25.4667Z" fill={isActive ? '#D01025' : '#fff'} />
                            </g>
                     </g>
                     <defs>
                            <clipPath id="clip0_523_856">
                                   <rect width={Width} height={Height} fill={isActive ? '#D01025' : '#fff'} />
                            </clipPath>
                            <clipPath id="clip1_523_856">
                                   <rect width={Width} height={Height} fill={isActive ? '#D01025' : '#fff'} />
                            </clipPath>
                     </defs>
              </svg>

       )
}

export default ProfileStudentIcon