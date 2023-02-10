const useTraverseTree = () => {
  // Add a file or folder in tree
  // Can be optimised using Dynamic Programming
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree._id === folderId && tree.isFolder) {
      tree.items.unshift({
        _id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: []
      });
      console.log(tree);
      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };

  const deleteNode = (tree, folderId) => {
    console.log(folderId);
    if (tree._id === folderId) {

      tree.items = [];
      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return deleteNode(ob, folderId);

    });

    return { ...tree, items: latestNode };
  }; // Do it Yourself

  const renameNode = () => { }; // Do it Yourself

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;