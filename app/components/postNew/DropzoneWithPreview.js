import Dropzone from 'react-dropzone'
import React from 'react'
import request from "superagent"
import {connect} from "react-redux"
import {addDataImageLocal} from "../../actions";
import axios from "axios";
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
      filesChangedName:[]
    };
  }


  onDrop(acceptedFiles, rejectedFiles) {
    // console.log(acceptedFiles[0]);
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
          filesChangedName
        });
      }
    });
    this.setState({
      files: acceptedFiles.map(file => ({
        ...file,
        preview: URL.createObjectURL(file)
      }))
    });
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
