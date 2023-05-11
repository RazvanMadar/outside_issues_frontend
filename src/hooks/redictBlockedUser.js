import React from 'react';
import { Navigate } from 'react-router-dom';

const withBlockRedirect = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            const isBlocked = localStorage.getItem('isBlocked') === 'true';
            if (isBlocked) {
                return <Navigate to="/blocked" />;
            }
            return <WrappedComponent {...this.props} />;
        }
    };
};

export default withBlockRedirect;