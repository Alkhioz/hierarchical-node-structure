/**
 * Represents a node in a hierarchical structure.
 *
 * @template T - The type of metadata associated with the node.
 * @template B - The type of metadata associated with the children nodes.
 */
export declare class HierarchyNode<T, B = T> {
    /**
     * The internal identifier of the node.
     *
     * @type {string}
     */
    internalId: string;
    /**
     * The identifier of the parent node.
     *
     * @type {string|null}
     */
    parentId: string | null;
    /**
     * The children nodes of the current node.
     *
     * @type {CartNode<B>[]}
     */
    children: HierarchyNode<B>[];
    /**
     * The metadata associated with the node.
     *
     * @type {T|null}
     */
    metadata: T | null;
    /**
     * Creates an instance of HierarchyNode.
     *
     * @param {T} [metadata] - The metadata associated with the node.
     */
    constructor(metadata?: T);
    /**
     * Generates a unique identifier.
     *
     * @private
     * @returns {string} - The generated unique identifier.
     */
    private generateUniqueID;
    /**
     * Adds a child node to the current node.
     *
     * @param {CartNode<B>} node - The child node to add.
     */
    addNode(node: HierarchyNode<B>): void;
    /**
     * Finds a node by its internal identifier.
     *
     * @param {string} targetId - The internal identifier of the node to find.
     * @returns {CartNode|null} - The found node or null if not found.
     */
    getNodeById(targetId: string): HierarchyNode<any> | null;
    /**
     * Removes a node by its internal identifier.
     *
     * @param {string} targetId - The internal identifier of the node to remove.
     * @returns {boolean} - True if the node was removed, false otherwise.
     */
    removeNodeById(targetId: string): boolean;
    /**
     * Adds a child node to a specific parent node.
     *
     * @param {string} targetId - The internal identifier of the parent node.
     * @param {CartNode<C>} child - The child node to add.
     * @returns {boolean} - True if the child node was added successfully, false otherwise.
     */
    addNodeToNode<C>(targetId: string, child: HierarchyNode<C>): boolean;
    /**
     * Runs a custom function on the current node.
     *
     * @template P - The type of parameters for the callback function.
     * @template R - The return type of the callback function.
     * @param {(node: CartNode<T>, params: P) => R} callback - The custom callback function to run.
     * @param {P} params - The parameters to pass to the callback function.
     * @returns {R} - The result of the callback function.
     */
    runCustomFunction<P, R>(callback: (node: HierarchyNode<T>, params: P) => R, params: P): R;
    /**
     * Runs a function on a specific node.
     *
     * @template C - The type of metadata associated with the target node.
     * @template P - The type of parameters for the callback function.
     * @template R - The return type of the callback function.
     * @param {string} targetId - The internal identifier of the target node.
     * @param {(node: HierarchyNode<C>, params: P) => R} callback - The callback function to run on the target node.
     * @param {P} params - The parameters to pass to the callback function.
     * @returns {boolean} - True if the function was executed successfully, false otherwise.
     */
    runFunctionOnNode<C, P, R>(targetId: string, callback: (node: HierarchyNode<C>, params: P) => R, params: P): boolean;
    /**
     * Retrieves the parent node's internal identifier for a given target node.
     *
     * @param {string} targetId - The internal identifier of the target node.
     * @returns {string|null} - The internal identifier of the parent node, or null if not found.
     */
    getParentNodeId(targetId: string): string | null;
    /**
     * Traverses the nodes in the hierarchy and performs an action on each node.
     *
     * @template R - The type of the reduced value.
     * @param {(accumulator: R, node: HierarchyNode<any>) => R} action - The action to perform on each node.
     * @param {R} initialValue - The initial value of the accumulator.
     * @returns {R} - The accumulated value.
     */
    traverse<R>(reducer: (accumulator: R, node: HierarchyNode<any>) => R, initialValue: R): R;
}
