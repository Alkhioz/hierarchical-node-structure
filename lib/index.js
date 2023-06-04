"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HierarchyNode = void 0;
/**
 * Represents a node in a hierarchical structure.
 *
 * @template T - The type of metadata associated with the node.
 * @template B - The type of metadata associated with the children nodes.
 */
var HierarchyNode = /** @class */ (function () {
    /**
     * Creates an instance of HierarchyNode.
     *
     * @param {T} [metadata] - The metadata associated with the node.
     */
    function HierarchyNode(metadata) {
        this.internalId = this.generateUniqueID();
        this.parentId = null;
        this.children = [];
        this.metadata = metadata !== null && metadata !== void 0 ? metadata : null;
    }
    /**
     * Generates a unique identifier.
     *
     * @private
     * @returns {string} - The generated unique identifier.
     */
    HierarchyNode.prototype.generateUniqueID = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    /**
     * Adds a child node to the current node.
     *
     * @param {CartNode<B>} node - The child node to add.
     */
    HierarchyNode.prototype.addNode = function (node) {
        node.parentId = this.internalId;
        this.children.push(node);
    };
    /**
     * Finds a node by its internal identifier.
     *
     * @param {string} targetId - The internal identifier of the node to find.
     * @returns {CartNode|null} - The found node or null if not found.
     */
    HierarchyNode.prototype.getNodeById = function (targetId) {
        if (this.internalId === targetId)
            return this;
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            var result = child.getNodeById(targetId);
            if (result)
                return result;
        }
        return null;
    };
    /**
     * Removes a node by its internal identifier.
     *
     * @param {string} targetId - The internal identifier of the node to remove.
     * @returns {boolean} - True if the node was removed, false otherwise.
     */
    HierarchyNode.prototype.removeNodeById = function (targetId) {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].internalId === targetId) {
                this.children.splice(i, 1);
                return true;
            }
            else if (this.children[i].removeNodeById(targetId)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Adds a child node to a specific parent node.
     *
     * @param {string} targetId - The internal identifier of the parent node.
     * @param {CartNode<C>} child - The child node to add.
     * @returns {boolean} - True if the child node was added successfully, false otherwise.
     */
    HierarchyNode.prototype.addNodeToNode = function (targetId, child) {
        var parent = this.getNodeById(targetId);
        if (parent !== null) {
            parent.addNode(child);
            return true;
        }
        return false;
    };
    /**
     * Runs a custom function on the current node.
     *
     * @template P - The type of parameters for the callback function.
     * @template R - The return type of the callback function.
     * @param {(node: CartNode<T>, params: P) => R} callback - The custom callback function to run.
     * @param {P} params - The parameters to pass to the callback function.
     * @returns {R} - The result of the callback function.
     */
    HierarchyNode.prototype.runCustomFunction = function (callback, params) {
        return callback(this, params);
    };
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
    HierarchyNode.prototype.runFunctionOnNode = function (targetId, callback, params) {
        var target = this.getNodeById(targetId);
        if (target !== null) {
            target.runCustomFunction(callback, params);
            return true;
        }
        return false;
    };
    /**
     * Retrieves the parent node's internal identifier for a given target node.
     *
     * @param {string} targetId - The internal identifier of the target node.
     * @returns {string|null} - The internal identifier of the parent node, or null if not found.
     */
    HierarchyNode.prototype.getParentNodeId = function (targetId) {
        var target = this.getNodeById(targetId);
        return (target && target.parentId) ? target.parentId : null;
    };
    /**
     * Traverses the nodes in the hierarchy and performs an action on each node.
     *
     * @template R - The type of the reduced value.
     * @param {(accumulator: R, node: HierarchyNode<any>) => R} action - The action to perform on each node.
     * @param {R} initialValue - The initial value of the accumulator.
     * @returns {R} - The accumulated value.
     */
    HierarchyNode.prototype.traverse = function (reducer, initialValue) {
        var accumulator = initialValue;
        accumulator = reducer(accumulator, this);
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            accumulator = child.traverse(reducer, accumulator);
        }
        return accumulator;
    };
    return HierarchyNode;
}());
exports.HierarchyNode = HierarchyNode;
