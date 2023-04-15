const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const node = new Node(data);

    if (!this._root) {
      this._root = node;
      return;
    }

    let current = this._root;
    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = node;
          return;
        }
        current = current.left;
      } else if (data > current.data) {
        if (!current.right) {
          current.right = node;
          return;
        }
        current = current.right;
      } else {
        return;
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let current = this._root;
    while (current) {
      if (data === current.data) {
        return current;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  remove(data) {
    let current = this._root;
    let parent = null;

    while (current) {
      if (data === current.data) {
        if (!current.left && !current.right) {
          if (!parent) {
            this._root = null;
          } else if (current === parent.left) {
            parent.left = null;
          } else {
            parent.right = null;
          }
        } else if (!current.left) {
          if (!parent) {
            this._root = current.right;
          } else if (current === parent.left) {
            parent.left = current.right;
          } else {
            parent.right = current.right;
          }
        } else if (!current.right) {
          if (!parent) {
            this._root = current.left;
          } else if (current === parent.left) {
            parent.left = current.left;
          } else {
            parent.right = current.left;
          }
        } else {
          let temp = current.right;
          let tempParent = current;
          while (temp.left) {
            tempParent = temp;
            temp = temp.left;
          }
          current.data = temp.data;
          if (tempParent.left === temp) {
            tempParent.left = temp.right;
          } else {
            tempParent.right = temp.right;
          }
        }
        break;
      } else if (data < current.data) {
        parent = current;
        current = current.left;
      } else {
        parent = current;
        current = current.right;
      }
    }
  }

  min() {
    let current = this._root;
    while (current && current.left) {
      current = current.left;
    }
    return current ? current.data : null;
  }

  max() {
    let current = this._root;
    while (current && current.right) {
      current = current.right;
    }
    return current ? current.data : null;
  }
}

module.exports = {
  BinarySearchTree
};