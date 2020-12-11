//该算法时间复杂度是n,按层级深度先分类
const buildWorkspace = (workspace, current, dataKey) => {
  const depth = current.parentIds && current.parentIds.length || 0;

  if (!workspace[depth]) {
    workspace[depth] = {};
  }

  workspace[depth][current[dataKey]] = current;
  return workspace;
}; //从最底层的节点开始遍历，慢慢的把节点挂到他的父节点上


const buildTree = workspace => {
  const depth = workspace.length - 1;

  for (let i = depth; i > 0; --i) {
    Object.keys(workspace[i]).forEach(c => {
      const element = workspace[i][c];

      if (element.parentIds && element.parentIds.length > 0) {
        const parentId = element.parentIds[0];
        const parent = workspace[i - 1][parentId];

        if (parent) {
          if (parent.children) {
            parent.children.push(element);
          } else {
            parent.children = [element];
          }
        }
      }
    });
  } //最后取第一层，就是一个完整的树


  if (workspace && workspace.length > 0) {
    return Object.keys(workspace[0]).map(c => workspace[0][c]);
  } else {
    return [];
  }
};

const tree = {
  transformAllIds: (list, dataKey = 'id') => {
    const workspace = list && list.reduce((prev, c) => {
      if (c && c[dataKey]) {
        prev = buildWorkspace(prev, c, dataKey);
      }

      return prev;
    }, []);
    return buildTree(workspace);
  },
  transformById: (list, dataKey = 'id') => list && list.reduce((prev, c) => {
    if (c && (c === null || c === void 0 ? void 0 : c[dataKey])) {
      prev[c[dataKey]] = c;
    }

    return prev;
  }, {})
};
export default tree;