// R is a Rect in document coordinates

import go from "gojs";

// NODE is the Node being moved -- ignore when looking for Parts intersecting the Rect
const isUnoccupied = (r: any, node: any) => {
  var diagram = node.diagram;

  // nested function used by Layer.findObjectsIn, below
  // only consider Parts, and ignore the given Node, any Links, and Group members
  function navig(obj: any) {
    var part = obj.part;
    if (part === node) return null;
    if (part instanceof go.Link) return null;
    if (part.isMemberOf(node)) return null;
    if (node.isMemberOf(part)) return null;
    return part;
  }

  // only consider non-temporary Layers
  var lit = diagram.layers;
  while (lit.next()) {
    var lay = lit.value;
    if (lay.isTemporary) continue;
    if (lay.findObjectsIn(r, navig, null, true).count > 0) return false;
  }
  return true;
};

export default isUnoccupied;
