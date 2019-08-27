import React from "react";

class NotefulError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      console.log("error");
      return <h2>Sorry, this part of Noteful has failed.</h2>;
    }
    return this.props.children ? this.props.children : <></>;
  }
}

export default NotefulError;
