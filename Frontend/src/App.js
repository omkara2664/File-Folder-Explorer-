
import { useEffect, useState } from "react";
import Folder from "./components/Folder";
import useTraverseTree from "./hooks/use-traverse-tree";
import "./styles.css";
// import explorer from "./data/folderData"
import axios from "axios";
import "./App.css"

export default function App() {
  const [explorerData, setExplorerData] = useState();

  const { insertNode, deleteNode } = useTraverseTree();

  const setData = async (finalTree) => {
    await axios.post(`http://localhost:3004/api/set/explorer`, { finalTree })
      .then((response) => {
        // console.log(response.data.data.explorer.status);
        if (response.data.code === 200) {
          setExplorerData(finalTree);
        }
      })
      .catch((error) => (console.log(error)))
  };

  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    setData(finalTree);

  };

  const handleNodeDelete = (folderId) => {
    const finalTree = deleteNode(explorerData, folderId);
    setExplorerData(finalTree);
  }

  useEffect(() => {
    axios.get("http://localhost:3004/api/explorer")
      .then((response) => {
        const data = response.data.data.explorer;
        // console.log(response);
        setExplorerData(data[0]);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])
  // console.log(explorerData);


  return (
    <div className="App">
      {explorerData !== undefined ? <span style={{ cursor: "pointer" }} ><Folder handleInsertNode={handleInsertNode} handleNodeDelete={handleNodeDelete} explorer={explorerData} /></span> : "Loading"}


    </div>

    // <div className="App">
    //   {
    //     explorerData !== undefined ? explorerData.map((explorerDatas) => (
    //       <span style={{ cursor: "pointer" }} ><Folder handleInsertNode={handleInsertNode} explorer={explorerDatas} /></span>
    //     )) : "Loading"
    //   }
    // </div>
  );
}



