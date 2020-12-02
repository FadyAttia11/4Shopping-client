import React, { Component } from "react";
import { withRouter } from "react-router-dom";

//just used to scroll to the topof the page when we navigate to different route with react-router

class ScrollToTop extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0);
		}
	}

	render() {
		return <React.Fragment />
	}
}

export default withRouter(ScrollToTop)