# HierarchyNode

The `HierarchyNode` class represents a node in a hierarchical structure.

## Installation

```bash
npm i hierarchical-node-structure
```

## Usage

```javascript
const { HierarchyNode } = require('hierarchy-node');

// Create a root node
const rootNode = new HierarchyNode('Root');

// Add child nodes
const child1 = new HierarchyNode('Child 1');
const child2 = new HierarchyNode('Child 2');
rootNode.addNode(child1);
rootNode.addNode(child2);
```
## API
## Constructor
Creates an instance of `HierarchyNode`.

```javascript
new HierarchyNode(metadata?: T)
```
- `metadata` (T, optional): The metadata associated with the node.