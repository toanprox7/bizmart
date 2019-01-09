import Dropzone from 'react-dropzone'
import React from 'react'
import request from "superagent"
import {connect} from "react-redux"
import {addDataImageLocal} from "../../actions";
import ReactLoading from 'react-loading';
import axios from "axios";
const Loading = () => (
  <ReactLoading type="spin" color="green" height="5%" width="5%" />
  );
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

class DropzoneWithPreview extends React.Component {
  constructor() {
    super()
    this.state = {
      files: [],
      filesChangedName:[],
      isLoadding:false,
    };
  }


  onDrop(acceptedFiles, rejectedFiles) {

    // console.log(acceptedFiles[0]);

// console.log(rejectedFiles,acceptedFiles,"reject");
if(rejectedFiles.length ===0){
if(acceptedFiles.length <= 6){
  this.setState({
    isLoadding:true,
  });
  const req = request.post('/files/uploadHandler');
  var self = this;
  acceptedFiles.forEach(file => {
    req.attach("file", file);
});
req.end((err,response) => {
  if(err) console.log(err);
  if(response) {

    console.log(response,"response");
    var filesChangedName=[];
    response.body.files.map(item => {
      var stringPath = item.fd;
      var start= stringPath.indexOf("upload/");
      var end = stringPath.length;
      var fileNameImage = stringPath.slice(start+7, end);
      filesChangedName.push(fileNameImage);
    })
    self.setState({
      filesChangedName,
      isLoadding:false,
      files: acceptedFiles.map(file => ({
        ...file,
        preview: URL.createObjectURL(file)
      }))
    });
  }
})

}else{
alert("Bạn không được phép upload quá 6 ảnh");
}
}

  }
componentWillUpdate(nextProps, nextState) {
  // this.props.handleImg(nextState.filesChangedName)
  if(nextState.filesChangedName.length >0){
    this.props.addDataImage(nextState.filesChangedName);
    console.log(nextState.filesChangedName,"log data");
    // axios.post()

  }
}

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    const {files} = this.state;
    for (let i = files.length; i >= 0; i--) {
      const file = files[0];
    }
  }

  render() {
    const {files} = this.state;

    const thumbs = files.map((file,index) => (
      <div key={index} style={thumb}>
        <div style={thumbInner}>
          <img
            src={file.preview}
            style={img}
          />
        </div>
      </div>
    ));

    return (
      <section>
        <div className="dropzone">
          <Dropzone
            accept="image/jpeg,image/png,image/jpg"
            onDrop={this.onDrop.bind(this)}
            maxSize={4000000}
            name="file"
          >
          <label htmlFor="file"><img src="/images/upload.png" /><span>Tải ảnh lên</span></label>
          </Dropzone>
        </div>
        {this.state.isLoadding === true?(<div><span>Đang upload ảnh, vui lòng chờ</span> <Loading /></div>):null}
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
      </section>
    );
  }
}

<DropzoneWithPreview />
const mapDispatchToProps = (dispatch) => ({
  addDataImage: getDataImageLocal => dispatch(addDataImageLocal(getDataImageLocal))
})
export default connect(null, mapDispatchToProps)(DropzoneWithPreview)
