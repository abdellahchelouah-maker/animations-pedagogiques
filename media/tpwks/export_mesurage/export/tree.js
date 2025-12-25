if (document.getElementById) {

var tree = new WebFXTree('MESURAGES_EN_ELECTROTECHNIQUE','visu1000000000.html');

tree.setBehavior('classic');
var a1 = new WebFXTreeItem('Documentation des appareils de mesure','visu1.html');
tree.add(a1);
var a4 = new WebFXTreeItem('Techniques de mesurage','visu4.html');
tree.add(a4);
var a5 = new WebFXTreeItem('Documentation des appareils de réglage','visu5.html');
tree.add(a5);
document.write(tree);
}