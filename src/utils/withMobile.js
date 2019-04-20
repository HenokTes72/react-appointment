import React, { Component } from 'react';

const withResponsive = WrappedComponent =>
  class MobileResponsive extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isMobileScreen: window.outerWidth <= 970,
        width: window.outerWidth
      };

      this.resize = this.resize.bind(this);
    }

    componentDidMount() {
      window.addEventListener('resize', this.resize);
      this.resize();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.resize);
    }

    resize() {
      this.setState({
        isMobileScreen: window.outerWidth <= 970,
        width: window.outerWidth
      });
    }

    render() {
      const { isMobileScreen, width } = this.state;

      return (
        <WrappedComponent
          isMobileScreen={isMobileScreen}
          width={width}
          {...this.props}
        />
      );
    }
  };

export default withResponsive;
