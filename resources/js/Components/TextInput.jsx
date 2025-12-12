import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        // Ganti class focus:ring-indigo-500 jadi focus:ring-yellow-500
        <input
            {...props}
            type={type}
            className={
                'border-gray-300 focus:border-yellow-500 focus:ring-yellow-500 rounded-md shadow-sm ' +
                className
            }
            ref={localRef}
        />                                                  
    );
});
