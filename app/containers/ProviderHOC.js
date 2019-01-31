import {withRouter} from "react-router-dom";
import React from "react";
const ProviderHOC = (NotFoundRoute) => {
    const RouteProvider = (props) => {
        if(props.location && props.location.state && props.location.noMatch) {
           return  <NotFoundRoute {...props} />
        }
        return props.children;
    }
    return withRouter(RouteProvider)

}

export default ProviderHOC;