import React, { Component } from 'react';
import Layout from './Layout';
import Constant from './Constant';

class ViewClient extends Component {
    render() {
        return (
           <Layout>
               <Constant/>
           </Layout>
        );
    }
}

export default ViewClient;