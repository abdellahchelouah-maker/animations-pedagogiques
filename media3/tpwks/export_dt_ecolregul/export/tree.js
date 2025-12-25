if (document.getElementById) {

var tree = new WebFXTree('ECOLREGUL_DT','visu1000000000.html');

tree.setBehavior('classic');
var a1 = new WebFXTreeItem('DOSSIER TECHNIQUE','visu1.html');
tree.add(a1);
document.write(tree);
}