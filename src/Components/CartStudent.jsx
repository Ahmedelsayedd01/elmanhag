import React from 'react';

const CartStudent = ({ width = 'w-64', name, count }) => {
       return (
              <div className={`${width} min-h-36 overflow-hidden p-3 flex flex-col items-center justify-start bg-mainColor rounded-xl`}>
                     <span className='w-full text-left text-xl text-secoundColor font-medium'>{name}</span>
                     <span className='w-full mt-6 text-center text-5xl text-secoundColor font-medium'>{count}</span>
              </div>
       );
};

export default CartStudent;
