import React, {useId} from "react";

const Input = React.forwardRef(
    function Input({
        labal,
        type= "text",
        className= "",
        ...props
    }, ref) 
        {
            return (
            <div className="w-full">    
                {labal && <labal className='inline-block mb-1 pl-1'
                        htmlFor={id}>
                        {labal}
                    </labal>
                }
                <input
                    type={type}
                    className={`px-3 py-2 rounded-lg bg-whate
                        text-black outline-none focus:bg-gray-50 
                        duration-200 border-gray-200 w-full  
                        ${className}`}
                        ref={ref}
                        {...props}
                    id={id}
                />
                
            </div>
                
        )
    }
)

export default Input