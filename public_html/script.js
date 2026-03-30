var selectedIndex = null;
var array1 = new Array(); // Ebben a tömbben tároljuk az adatokat
array1.push({"id":"1","huzasid":"547","talalat":"7","darab":"1", "ertek":"10767529"});
//OR:
//array1[0]= {"id":"John Smith","huzasid":"data1@gmail.com","talalat":"2000","city":"London"};
array1.push({"id":"2","huzasid":"886","talalat":"4","darab":"2843", "ertek":"5085"});
printArray();
// Kiírjuk a tömböt az alsó táblázatba:
function printArray(){
var table = document.getElementById("nyeremenyList").getElementsByTagName('tbody')[0];
// Kiüríti a meglévő táblázatot:
table.innerHTML="";
var newRow;
for (i = 0; i < array1.length; i++) {
// Beszúr egy új sort a táblázatba:
newRow = table.insertRow(table.length);
// Beszúr egy üres cellát az új sorba:
cell1 = newRow.insertCell(0);
// A cellába beteszi a fullName adatot a tömbből:
cell1.innerHTML = array1[i].id;
cell2 = newRow.insertCell(1);
cell2.innerHTML = array1[i].huzasid;
cell3 = newRow.insertCell(2);
cell3.innerHTML = array1[i].talalat;
cell4 = newRow.insertCell(3);
cell4.innerHTML = array1[i].darab;
cell5 = newRow.insertCell(4);
cell5.innerHTML = array1[i].ertek;
// a sor végére tesz két linket: Edit, Delete
// Az onEdit és az onDelete függvényeknek a kiválaszott sor indexét adjuk át paraméterül:
cell6 = newRow.insertCell(5);
cell6.innerHTML = '<a onClick="onEdit('+i+')">Edit</a>' + '<a onClick="onDelete('+i+')">Delete</a>';
}
}
// Ha kitölti az űrlapot és a Submit gombra kattint:
function onFormSubmit() {
// validate(): ellenőrzi az űrlap helyes kitöltését
if (validate()) {
// Kiolvassa a beviteli mezők adatait és visszaadja azokat a formData listában.
var formData = readFormData();
// Ha selectedIndex == null: a gombra kattintás után beszúrja az új rekordot
// különben módosíja a kiválasztott rekordot.
// selectedIndex alapesetben null, Update-nél kap majd értéket
if (selectedIndex==null)
insertNewRecord(formData);
else
updateRecord(formData);
resetForm();
}
}
// Kiolvassa a beviteli mezők adatait és visszaadja azokat egy listában.
function readFormData() {
var formData = {};
formData["id"] = document.getElementById("id").value;
formData["huzasid"] = document.getElementById("huzasid").value;
formData["talalat"] = document.getElementById("talalat").value;
formData["darab"] = document.getElementById("darab").value;
formData["ertek"] = document.getElementById("ertek").value;
return formData;
}
// Beszúrja az új sort a tömb végére, és a sor végére tesz két linket: Edit, Delete
// data: az űrlap adatai egy listában
function insertNewRecord(data) {
// A tömb végére tesszük az új rekordot:
array1.push({"id":data.id,"huzasid":data.huzasid,"talalat":data.talalat,"darab":data.darab,"ertek":data.ertek});
// OR: array1[array1.length]=
// {"id":data.id,"huzasid":data.huzasid,"talalat":data.talalat,"darab":data.darab,"ertek":data.ertek};
printArray();
}
// Kiüríti a beviteli mezőket. pl. az adatok elküldése után hívja meg.
function resetForm() {
document.getElementById("id").value = "";
document.getElementById("huzasid").value = "";
document.getElementById("talalat").value = "";
document.getElementById("darab").value = "";
document.getElementById("ertek").value = "";
selectedIndex = null;
}
// A kiválasztott rekordot betöltjük a felső űrlapba szerkesztéshez:
function onEdit(index) {
document.getElementById("id").value = array1[index].id;
document.getElementById("huzasid").value = array1[index].huzasid;
document.getElementById("talalat").value = array1[index].talalat;
document.getElementById("darab").value = array1[index].darab;
document.getElementById("ertek").value = array1[index].ertek;
selectedIndex=index;
}
// A kiolvasott űrlap adatokkal módosítja a kiválasztott rekordot:
// Update-nél hívjuk meg
function updateRecord(formData) {
array1[selectedIndex].id=formData.id;
array1[selectedIndex].huzasid=formData.huzasid;
array1[selectedIndex].talalat=formData.talalat;
array1[selectedIndex].darab=formData.darab;
array1[selectedIndex].ertek=formData.ertek;
printArray();
}
function onDelete(index) {
// Megerősítés után törli a kiválasztott sort:
if (confirm('Are you sure to delete this record ?')) {
array1.splice(index, 1); // Deleting the entry with the specified index
resetForm();
printArray();
}
}
// validáció: A Full Name mező kitöltése kötelező.
function validate() {
isValid = true;
// Ha üres a Full Name mező (validációs hiba):
if (document.getElementById("id").value == "") {
isValid = false;
// Megjeleníti az elrejtett hibaüzenetet:
document.getElementById("idValidationError").classList.remove("hide");
} else {
// ha nincs validációs hiba (ki van töltve a Full Name mező)
isValid = true;
// Ha nincs elrejtve a validációs hibaüzenet, akkor elrejti azt:
if (!document.getElementById("idValidationError").classList.contains("hide"))
document.getElementById("idValidationError").classList.add("hide");
}
return isValid;
}