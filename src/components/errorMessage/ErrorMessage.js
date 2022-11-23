import img from "./error.gif";

const ErrorMessage = () => {
    return (
        <img
            src={img}
            alt="error"
            style={{
                height: "200px",
                margin: "0 auto",
            }}
        />
    );
};

export default ErrorMessage;
