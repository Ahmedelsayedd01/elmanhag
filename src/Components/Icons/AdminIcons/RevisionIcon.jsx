import React from 'react'

const RevisionIcon = ({ Width = "24", Height = "24", isActive = false }) => {
       return (
              <svg width={Width} height={Height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <g clip-path="url(#clip0_583_521)">
                            <path d="M19.8892 10.105C19.6731 9.59567 19.4089 9.10813 19.1002 8.649L17.4422 9.768C17.92 10.4783 18.2552 11.2748 18.4292 12.113C18.6064 12.9868 18.6064 13.8872 18.4292 14.761C18.3423 15.1831 18.2137 15.5954 18.0452 15.992C17.8814 16.3817 17.6794 16.7541 17.4422 17.104C16.9682 17.803 16.3655 18.4054 15.6662 18.879C14.9565 19.3566 14.1607 19.6918 13.3232 19.866C12.4499 20.041 11.5505 20.041 10.6772 19.866C9.42024 19.6078 8.26683 18.986 7.36018 18.078C6.76127 17.4787 6.28325 16.7699 5.95218 15.99C5.78513 15.5934 5.65719 15.1815 5.57018 14.76C5.3062 13.4586 5.43928 12.1079 5.95218 10.883C6.28198 10.1033 6.75979 9.39489 7.35918 8.797C7.95829 8.19911 8.66638 7.7215 9.44518 7.39C9.84018 7.223 10.2552 7.094 10.6752 7.008C10.7822 6.986 10.8912 6.976 10.9992 6.959V10L15.9992 6L10.9992 2V4.938C10.7561 4.96491 10.5142 5.00195 10.2742 5.049C9.17833 5.27356 8.13749 5.71191 7.21118 6.339C5.56566 7.44902 4.35671 9.09605 3.79092 10.9986C3.22513 12.9012 3.33762 14.9412 4.10918 16.77C4.53872 17.7882 5.16192 18.7134 5.94418 19.494C6.72537 20.2737 7.64912 20.896 8.66518 21.327C10.2625 22.0028 12.0276 22.1768 13.7262 21.826C15.0858 21.545 16.3569 20.9381 17.4303 20.0574C18.5036 19.1767 19.3471 18.0486 19.8882 16.77C20.1082 16.25 20.2772 15.709 20.3882 15.162C20.62 14.0237 20.62 12.8503 20.3882 11.712C20.2743 11.1614 20.1071 10.6233 19.8892 10.105Z" fill={isActive ? "#D01025" : "#B5B5B5"} />
                     </g>
                     <defs>
                            <clipPath id="clip0_583_521">
                                   <rect width={Width} height={Height} fill="white" />
                            </clipPath>
                     </defs>
              </svg>

       )
}

export default RevisionIcon