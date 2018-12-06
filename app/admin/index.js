import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { Admin, Resource,ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
class AdminTemplate extends Component {

    render() {
        return (
           <h2>Xin chao</h2>
        );
    }
}

export default AdminTemplate;
