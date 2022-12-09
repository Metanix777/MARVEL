import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoumdary extends Component {
    state = {
        error: false,
    };

    componentDidCatch() {
        this.setState({ error: true });
    }

    render() {
        return <>{this.state.error ? <ErrorMessage /> : this.props.children}</>;
    }
}

export default ErrorBoumdary;
