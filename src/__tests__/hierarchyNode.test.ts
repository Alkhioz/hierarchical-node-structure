import { HierarchyNode } from "../index";

test('Find by id', () => {
    const node = new HierarchyNode();
    const childNode = new HierarchyNode();
    node.addNode(childNode);
    expect(node.getNodeById(childNode.internalId)?.internalId).toBe(childNode.internalId);
});