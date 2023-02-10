import { useState } from "react";


function Folder({ handleInsertNode = () => { }, handleNodeDelete = () => { }, explorer }) {
  // console.log(explorer)
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer._id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div onClick={() => setExpand(!expand)} className="folder">
          <span>📁 {explorer.name}</span>
          <div style={{ display: "flex" }}>
            <button onClick={(e) => handleNewFolder(e, true)} className="btn btn-primary" style={{ marginRight: "2px" }}>Folder +</button>
            <button onClick={(e) => handleNewFolder(e, false)} className="btn btn-primary">File +</button>
            <button style={{ display: explorer.items.length === 0 ? "none" : "block", margin: "0 2px 0 2px" }} onClick={(e) => handleNodeDelete(explorer._id)} className="btn btn-danger">Empty Folder</button>
          </div>
        </div>

        <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                type="text"
                className="inputContainer__input"
                autoFocus
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}

          {explorer.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                handleNodeDelete={handleNodeDelete}
                key={exp._id}
                explorer={exp}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name} </span>;
  }
}

export default Folder;


// import { useState } from "react";
// import axios from "axios";
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';


// function Folder({ handleInsertNode = () => { }, handleNodeDelete = () => { }, explorer }) {
//   // console.log(explorer)
//   const [expand, setExpand] = useState(false);
//   const [showInput, setShowInput] = useState({
//     visible: false,
//     isFolder: false
//   });
//   const [upload, setUpload] = useState(false);
//   //================================================
//   const [file, setFile] = useState("");
//   const [fname, setFName] = useState("");

//   const setdata = (e) => {
//     setFName(e.target.value)
//   }

//   const setimgfile = (e) => {
//     setFile(e.target.files[0])

//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       }
//     }

//   }


//   const addUserData = async (e) => {
//     e.preventDefault();
//     var formData = new FormData();
//     formData.append("photo", file)
//     formData.append("fname", fname);
//     fotmData.append("finalTree",)

//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       }
//     }
    
//     const res = await axios.post("http://localhost:3004/api/fileUpload/register", formData, config).catch((error) => console.log(error));
//     if (res) {
//       // navigation 
//       console.log(res);
//       console.log("success");
//     } else {
//       console.log("error")
//     }
//   }
//   //=================================

//   const handleNewFolder = (e, isFolder) => {
//     e.stopPropagation();
//     setExpand(true);
//     setShowInput({
//       visible: true,
//       isFolder
//     });
//   };

//   const onAddFolder = (e) => {
//     if (e.keyCode === 13 && e.target.value) {
//       handleInsertNode(explorer._id, e.target.value, showInput.isFolder);
//       setShowInput({ ...showInput, visible: false });
//     }
//   };

//   if (upload) {
//     return (
//       <>
//         <div className='container mt-3'>
//           <h3>Upload File</h3>

//           <Form>
//             <Form.Group className="mb-3" controlId="formBasicEmail">
//               <Form.Label>UserName</Form.Label>
//               <Form.Control type="text" name='fname' onChange={setdata} />
//             </Form.Group>

//             <Form.Group className="mb-3" controlId="formBasicPassword">
//               <Form.Label>Select Your Image</Form.Label>
//               <Form.Control type="file" name='photo' onChange={setimgfile} />
//             </Form.Group>
//             <Button variant="primary" type="submit" onClick={addUserData}>
//               Submit
//             </Button>
//             <button className="btn btn-success" onClick={() => setUpload(false)}>Close</button>
//           </Form>
//         </div>
//       </>
//     )
//   }

//   if (explorer.isFolder) {
//     return (
//       <div style={{ marginTop: 5 }}>
//         <div onClick={() => setExpand(!expand)} className="folder">
//           <span>📁 {explorer.name}</span>
//           <div style={{ display: "flex" }}>
//             <button onClick={(e) => handleNewFolder(e, true)} className="btn btn-primary" style={{ marginRight: "2px" }}>Folder +</button>
//             <button onClick={() => setUpload(!upload)} className="btn btn-primary">File +</button>
//             <button style={{ display: explorer.items.length === 0 ? "none" : "block", margin: "0 2px 0 2px" }} onClick={(e) => handleNodeDelete(explorer._id)} className="btn btn-danger">Empty Folder</button>
//           </div>
//         </div>

//         <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
//           {showInput.visible && (
//             <div className="inputContainer">
//               <span>{showInput.isFolder ? "📁" : "📄"}</span>
//               <input
//                 type="text"
//                 className="inputContainer__input"
//                 autoFocus
//                 onKeyDown={onAddFolder}
//                 onBlur={() => setShowInput({ ...showInput, visible: false })}
//               />
//             </div>
//           )}

//           {explorer.items.map((exp) => {
//             return (
//               <Folder
//                 handleInsertNode={handleInsertNode}
//                 handleNodeDelete={handleNodeDelete}
//                 key={exp._id}
//                 explorer={exp}
//               />
//             );
//           })}
//         </div>
//       </div>
//     );
//   } else {
//     return <span className="file">📄 {explorer.name} </span>;
//   }
// }

// export default Folder;
