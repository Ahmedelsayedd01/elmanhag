import React from 'react'

const SubscriptionsIcon = ({ Width = "32", Height = "32", isActive= "#fff" }) => {
               
    return(
        <>
        <svg width={Width} height={Height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_4136_297)">
            <g clipPath="url(#clip1_4136_297)">
            <path d="M26.668 10.6667H5.33464V8.00002H26.668V10.6667ZM24.0013 2.66669H8.0013V5.33335H24.0013V2.66669ZM29.3346 16V26.6667C29.3346 28.14 28.1413 29.3334 26.668 29.3334H5.33464C3.8613 29.3334 2.66797 28.14 2.66797 26.6667V16C2.66797 14.5267 3.8613 13.3334 5.33464 13.3334H26.668C28.1413 13.3334 29.3346 14.5267 29.3346 16ZM21.3346 21.3334L13.3346 16.98V25.6867L21.3346 21.3334Z" fill={isActive ? '#D01025' : '#fff'}/>
            </g>
            </g>
            <defs>
            <clipPath id="clip0_4136_297">
            <rect width="32" height="32" fill={isActive ? '#D01025' : '#fff'}/>
            </clipPath>
            <clipPath id="clip1_4136_297">
            <rect width="32" height="32" fill={isActive ? '#D01025' : '#fff'}/>
            </clipPath>
            </defs>
        </svg>
        </>
    )}

export default SubscriptionsIcon