import React ,{ Component }  from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import axios from "axios";
import {withRouter} from "react-router-dom";
import {checkAuthenticate} from "../../actions/settings";
import { addDataUserLocal } from "../../actions";
import {connect} from "react-redux";
// import {withRouter} from "react-router-dom";
var jwt = require("jsonwebtoken");
class GoogleLoginButton extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  handleClicked=async ()=>{
    var self=this;
    if(this.state.id){
      let infoApiUserFacebook={
        id:this.state.id,
        username:this.state.username,
        image:this.state.image,
        email:this.state.email,
        status:"active",
        role:"1"
      }
      var tokenUser = jwt.sign(infoApiUserFacebook, 'toanpro');
       localStorage.setItem("tokenUser",tokenUser);
      await axios.post("/usersapi/createGoogleApi",infoApiUserFacebook)
        .then(function(res){
if(res.data === "exits" || res.data === "created"){
  self.handleRedirect(infoApiUserFacebook);
}
        }).catch(function(err){
          throw err
        })
    }
  }
  handleRedirect = (infoData) => {
    this.props.addUserLocal(infoData);
    this.props.isAuthenticate(true);
    this.props.history.push("/");
  }
  responseGoogle =async (response) => {
    // console.log(response.w3);
    await this.setState({
      email:response.w3.U3,
      username:response.w3.ig,
      id:response.w3.Eea,
      image:response.w3.Paa
    });
    await this.handleClicked();
  }
  render() {
    return (
      <React.Fragment>

<GoogleLogin
 render={renderProps => (
  <div onClick={renderProps.onClick} className="button-reg-email">
  <div className="email-circle">
                            <i className="fa fa-google" />
                          </div>
                          <div className="txt-email">
                            <p>Đăng ký bằng Google</p>
                          </div>
                          </div>
  // <button >This is my custom Google button</button>
)}
    clientId="693122386438-qu17agtkooq2i2kisi8l0a3n8l0klo76.apps.googleusercontent.com"
    icon={false}
    autoLoad={false}
    onSuccess={this.responseGoogle}
    onFailure={this.responseGoogle}
  >

    </GoogleLogin>
      </React.Fragment>
    );
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    isAuthenticate: (getIsAuthenticate) => {
      dispatch(checkAuthenticate(getIsAuthenticate))
    },
    addUserLocal: getDataUserLocal => dispatch(addDataUserLocal(getDataUserLocal)),
  }
}
export default connect(null, mapDispatchToProps)(withRouter(GoogleLoginButton))
