function walkTheDOM(node, func) {
        func(node); 
        node = node.firstChild; 
        while (node) { 
            walkTheDOM(node, func); 
            node = node.nextSibling; 
        } 
    } 
function countTextNodes() {
   var sum = 0;
   function count (node) {
      if (node.nodeType == 3) // TEXT_NODE
      sum++;
      }
var root = document.documentElement;
    walkTheDOM(root, count);
    alert (sum + " text nodes found");
}
