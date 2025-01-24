import go from "gojs";
import { isUnoccupied } from "../isUnoccupied";

// This function prevent any object overlab on nodes
const avoidNodeOverlap = (node: any, pt: any, gridpt: any) => {
  if (node.diagram instanceof go.Palette) return gridpt;
  // this assumes each node is fully rectangular
  var bnds = node.actualBounds;
  var loc = node.location;
  // use PT instead of GRIDPT if you want to ignore any grid snapping behavior
  // see if the area at the proposed location is unoccupied
  var r = new go.Rect(
    gridpt.x - (loc.x - bnds.x),
    gridpt.y - (loc.y - bnds.y),
    bnds.width,
    bnds.height
  );
  // maybe inflate R if you want some space between the node and any other nodes
  r.inflate(-0.5, -0.5); // by default, deflate to avoid edge overlaps with "exact" fits
  // when dragging a node from another Diagram, choose an unoccupied area
  if (
    !(node.diagram.currentTool instanceof go.DraggingTool) &&
    (!node._temp || !node.layer.isTemporary)
  ) {
    // in Temporary Layer during external drag-and-drop
    node._temp = true; // flag to avoid repeated searches during external drag-and-drop
    while (!isUnoccupied(r, node)) {
      r.x += 10; // note that this is an unimaginative search algorithm --
      r.y += 2; // you can improve the search here to be more appropriate for your app
    }
    r.inflate(0.5, 0.5); // restore to actual size
    // return the proposed new location point
    return new go.Point(r.x - (loc.x - bnds.x), r.y - (loc.y - bnds.y));
  }
  if (isUnoccupied(r, node)) return gridpt; // OK
  return loc; // give up -- don't allow the node to be moved to the new location
};

export default avoidNodeOverlap;
