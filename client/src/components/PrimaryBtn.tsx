const PrimaryBtn: React.FC<React.ComponentProps<"button">> = ({ children, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={
                "px-3 py-1 bg-sky-800 text-white hover:cursor-pointer" +
                (className ? " " + className : "")
            }
        >
            {children}
        </button>
    );
};


export default PrimaryBtn