import React from 'react'

const NoticeBoardIcon = ({ Width = "24", Height = "24", isActive = false }) => {
       return (
              <svg width={Width} height={Height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <g clip-path="url(#clip0_1087_17653)">
                            <g clip-path="url(#clip1_1087_17653)">
                                   <path d="M6.91228 10.1265L3.32184 10.6122C3.22828 10.5424 3.11353 10.4999 2.98828 10.4999C2.67816 10.4999 2.42578 10.7522 2.42578 11.0624C2.42578 11.272 2.54241 11.4531 2.71284 11.5499L3.37697 15.9653C3.39103 16.0581 3.47091 16.1249 3.56222 16.1249C3.57066 16.1249 3.57909 16.1243 3.58772 16.1232L7.71272 15.5607C7.76241 15.5539 7.80741 15.5275 7.83741 15.4874C7.86741 15.4472 7.88034 15.397 7.87284 15.3473L7.12284 10.2848C7.10784 10.1835 7.01428 10.1136 6.91228 10.1265ZM2.98828 10.8749C3.09178 10.8749 3.17578 10.9589 3.17578 11.0624C3.17578 11.1659 3.09178 11.2499 2.98828 11.2499C2.88478 11.2499 2.80078 11.1659 2.80078 11.0624C2.80078 10.9589 2.88478 10.8749 2.98828 10.8749ZM3.72028 15.7266L3.10172 11.6132C3.35766 11.5605 3.55059 11.3335 3.55059 11.0624C3.55059 11.0277 3.54647 10.9939 3.54028 10.9611L6.77878 10.5229L7.47384 15.2145L3.72028 15.7266Z" fill={isActive ? "#D01025" : "#B5B5B5"} stroke={isActive ? "#D01025" : "#B5B5B5"} stroke-width="0.2" />
                                   <path d="M13.125 7.49989C12.9996 7.49989 12.8849 7.54245 12.7913 7.6122L9.20086 7.12658C9.09905 7.11345 9.0053 7.18358 8.9903 7.28502L8.2403 12.3475C8.23299 12.3972 8.24573 12.4475 8.27573 12.4876C8.30573 12.5277 8.35073 12.554 8.40042 12.5609L12.5254 13.1234C12.5342 13.1243 12.5427 13.1249 12.5509 13.1249C12.6422 13.1249 12.7221 13.0581 12.7362 12.9651L13.4003 8.54989C13.5709 8.45333 13.6875 8.2722 13.6875 8.06239C13.6875 7.75227 13.4352 7.49989 13.125 7.49989ZM13.3125 8.06239C13.3125 8.16589 13.2285 8.24989 13.125 8.24989C13.0215 8.24989 12.9375 8.16589 12.9375 8.06239C12.9375 7.95889 13.0215 7.87489 13.125 7.87489C13.2285 7.87489 13.3125 7.95889 13.3125 8.06239ZM12.393 12.7266L8.63911 12.2148L9.33417 7.52314L12.5727 7.96133C12.5667 7.99414 12.5625 8.0277 12.5625 8.06239C12.5625 8.3337 12.7555 8.56058 13.0114 8.61327L12.393 12.7266Z" fill={isActive ? "#D01025" : "#B5B5B5"} stroke={isActive ? "#D01025" : "#B5B5B5"} stroke-width="0.2" />
                                   <path d="M23.8125 4.125C23.8125 4.10063 23.8076 4.07625 23.7981 4.05338C23.7791 4.00744 23.7426 3.97087 23.6966 3.95194C23.6737 3.94237 23.6494 3.9375 23.625 3.9375H0.375C0.350625 3.9375 0.32625 3.94237 0.303375 3.95194C0.257438 3.97087 0.220875 4.00744 0.201938 4.05338C0.192375 4.07625 0.1875 4.10063 0.1875 4.125V19.875C0.1875 19.8994 0.192375 19.9238 0.201938 19.9466C0.220875 19.9926 0.257438 20.0291 0.303375 20.0481C0.32625 20.0576 0.350625 20.0625 0.375 20.0625H23.625C23.6494 20.0625 23.6737 20.0576 23.6966 20.0481C23.7426 20.0291 23.7791 19.9926 23.7981 19.9466C23.8076 19.9238 23.8125 19.8994 23.8125 19.875V4.125ZM1.5 5.25H22.5V18.75H1.5V5.25ZM22.6099 4.875H1.39013L0.827625 4.3125H23.1724L22.6099 4.875ZM1.125 5.14012V18.8599L0.5625 19.4224V4.57762L1.125 5.14012ZM1.39013 19.125H22.6099L23.1724 19.6875H0.827625L1.39013 19.125ZM22.875 18.8599V5.14012L23.4375 4.57762V19.4224L22.875 18.8599Z" fill={isActive ? "#D01025" : "#B5B5B5"} stroke={isActive ? "#D01025" : "#B5B5B5"} stroke-width="0.2" />
                                   <path d="M21.375 6.375C21.2094 6.375 21.0619 6.44831 20.9587 6.5625H15.2288C15.1258 6.44831 14.9781 6.375 14.8125 6.375C14.5024 6.375 14.25 6.62738 14.25 6.9375C14.25 7.10306 14.3233 7.25063 14.4375 7.35375V16.5C14.4375 16.6037 14.5213 16.6875 14.625 16.6875H21.5625C21.6662 16.6875 21.75 16.6037 21.75 16.5V7.35375C21.8642 7.25081 21.9375 7.10306 21.9375 6.9375C21.9375 6.62738 21.6851 6.375 21.375 6.375ZM21.375 6.75C21.4785 6.75 21.5625 6.834 21.5625 6.9375C21.5625 7.041 21.4785 7.125 21.375 7.125C21.2715 7.125 21.1875 7.041 21.1875 6.9375C21.1875 6.834 21.2715 6.75 21.375 6.75ZM14.8125 6.75C14.916 6.75 15 6.834 15 6.9375C15 7.041 14.916 7.125 14.8125 7.125C14.709 7.125 14.625 7.041 14.625 6.9375C14.625 6.834 14.709 6.75 14.8125 6.75ZM21.375 16.3125H14.8125V7.5C15.1226 7.5 15.375 7.24762 15.375 6.9375H20.8125C20.8125 7.24762 21.0649 7.5 21.375 7.5V16.3125Z" fill={isActive ? "#D01025" : "#B5B5B5"} stroke={isActive ? "#D01025" : "#B5B5B5"} stroke-width="0.2" />
                                   <path d="M20.8125 8.8125H15.375C15.2713 8.8125 15.1875 8.89631 15.1875 9C15.1875 9.10369 15.2713 9.1875 15.375 9.1875H20.8125C20.9162 9.1875 21 9.10369 21 9C21 8.89631 20.9162 8.8125 20.8125 8.8125Z" fill={isActive ? "#D01025" : "#B5B5B5"} stroke={isActive ? "#D01025" : "#B5B5B5"} stroke-width="0.2" />
                                   <path d="M20.8125 9.75H15.375C15.2713 9.75 15.1875 9.83381 15.1875 9.9375C15.1875 10.0412 15.2713 10.125 15.375 10.125H20.8125C20.9162 10.125 21 10.0412 21 9.9375C21 9.83381 20.9162 9.75 20.8125 9.75Z" fill={isActive ? "#D01025" : "#B5B5B5"} stroke={isActive ? "#D01025" : "#B5B5B5"} stroke-width="0.2" />
                                   <path d="M20.8125 10.6875H15.375C15.2713 10.6875 15.1875 10.7713 15.1875 10.875C15.1875 10.9787 15.2713 11.0625 15.375 11.0625H20.8125C20.9162 11.0625 21 10.9787 21 10.875C21 10.7713 20.9162 10.6875 20.8125 10.6875Z" fill={isActive ? "#D01025" : "#B5B5B5"} stroke={isActive ? "#D01025" : "#B5B5B5"} stroke-width="0.2" />
                                   <path d="M20.8125 11.625H15.375C15.2713 11.625 15.1875 11.7088 15.1875 11.8125C15.1875 11.9162 15.2713 12 15.375 12H20.8125C20.9162 12 21 11.9162 21 11.8125C21 11.7088 20.9162 11.625 20.8125 11.625Z" fill={isActive ? "#D01025" : "#B5B5B5"} stroke={isActive ? "#D01025" : "#B5B5B5"} stroke-width="0.2" />
                                   <path d="M20.8125 12.5625H15.375C15.2713 12.5625 15.1875 12.6463 15.1875 12.75C15.1875 12.8537 15.2713 12.9375 15.375 12.9375H20.8125C20.9162 12.9375 21 12.8537 21 12.75C21 12.6463 20.9162 12.5625 20.8125 12.5625Z" fill={isActive ? "#D01025" : "#B5B5B5"} stroke={isActive ? "#D01025" : "#B5B5B5"} stroke-width="0.2" />
                                   <path d="M20.8125 13.5H15.375C15.2713 13.5 15.1875 13.5838 15.1875 13.6875C15.1875 13.7912 15.2713 13.875 15.375 13.875H20.8125C20.9162 13.875 21 13.7912 21 13.6875C21 13.5838 20.9162 13.5 20.8125 13.5Z" fill={isActive ? "#D01025" : "#B5B5B5"} stroke={isActive ? "#D01025" : "#B5B5B5"} stroke-width="0.2" />
                            </g>
                     </g>
                     <defs>
                            <clipPath id="clip0_1087_17653">
                                   <rect width={Width} height={Height} fill="white" />
                            </clipPath>
                            <clipPath id="clip1_1087_17653">
                                   <rect width={Width} height={Height} fill="white" />
                            </clipPath>
                     </defs>
              </svg>

       )
}

export default NoticeBoardIcon