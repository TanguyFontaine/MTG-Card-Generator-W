export function TextLine({ children, isEmpty = false, ...props }) 
{
    return (
        <span 
            style={{ 
                display: 'block', 
                height: isEmpty ? '0.4em' : 'auto',
                ...props.style 
            }} 
            {...props}
        >
            {children}
        </span>
    );
}