
import React, { useState, useEffect } from "react";
import axios from "axios"
import FlashMessage from "./FlashMsg"
// import DragAndDrop from './DragAndDrop'




const UploadImage = () => {

    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState({
        type: '',
        text: ''
      });

      onChangeHandler = e => {
        let fileList = files;
        for (var i = 0; i < e.target.files.length; i++) {
            if (!e.target.files[i]) return
          fileList.push(e.target.files[i])
          }
        
          setFiles(fileList)
    }

    onClickHandler = e => {
        e.preventDefault();
        const files = files;
        const data = new FormData();
        for (const key of Object.keys(files)) {
            data.append('file', files[key])
        }
        axios
            .post("/image-slider/", data)
            .then(res => {
                setMessage(
                       {type: 'success',
                        text: 'Files uploaded with success',
                        isVisible: true }
                , () => files)
            })
            
            .catch(error => {
                setMessage(
                    {type: 'error',
                     text: 'Error, try again'}   
                , () => this.state)
            });
    };

    reset = () => {
        window.location.reload();
    }

    handleDrop = (files) => {
        let fileList = files
        for (var i = 0; i < files.length; i++) {
          if (!files[i]) return
          fileList.push(files[i])
        }
        setFiles(fileList, () => console.log(this.state))
    }


    return (
        <>
            <div className="row">
                <FlashMessage
                    duration={10000}
                    persistOnHover={true}
                    type={message.type}
                    message={message.text}
                    close={() => reset()} />
            </div>
            <div className="row">
                <div className="col-12 text-center my-3">
                    <h1 className="">Upload your Files here</h1>
                </div>
            </div>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-upload mx-1"></i></span>
                </div>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" name="file" multiple onChange={onChangeHandler} />
                    <label className="custom-file-label">Choose file</label>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-block my-4 blue"
                    onClick={onClickHandler}>
                    Upload
                </button>
            </div>
            {/* <div>
                <DragAndDrop handleDrop={this.handleDrop}>
                    <div className="content-dd"></div>
                </DragAndDrop>
            </div> */}
            <div>
                <div className="row">
                    <ul>
                        {files && files.map((file,i) =>  <li key={i}>{file.name}</li>)}
                    </ul>
                </div>
            </div> 
        </>
    )
}


export default UploadImage