if (document.getElementById) {

var tree = new WebFXTree('DOSSIER_RESSOURCE_PILES_BATTERIES','visu1000000000.html');

tree.setBehavior('classic');
var a1 = new WebFXTreeItem('SOMMAIRE','visu1.html');
tree.add(a1);
document.write(tree);
}