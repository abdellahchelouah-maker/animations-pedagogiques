if (document.getElementById) {

var tree = new WebFXTree('PLATINE_SET_DT','visu1000000000.html');

tree.setBehavior('classic');
var a1 = new WebFXTreeItem('Sommaire','visu1.html');
tree.add(a1);
document.write(tree);
}