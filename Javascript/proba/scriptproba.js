var selectedIndex = null;
var array1 = new Array(); // Ebben a tömbben tároljuk az adatokat
array1.push({"fullName":"John Smith","email":"data1@gmail.com","salary":"2000","city":"London"});
//OR:
//array1[0]= {"fullName":"John Smith","email":"data1@gmail.com","salary":"2000","city":"London"};
array1.push({"fullName":"Tom Brown","email":"data2@gmail.com","salary":"2500","city":"Paris"});
printArray();
// Kiírjuk a tömböt az alsó táblázatba:
function printArray(){
var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
// Kiüríti a meglévő táblázatot:
table.innerHTML="";
var newRow;
for (i = 0; i < array1.length; i++) {
// Beszúr egy új sort a táblázatba:
newRow = table.insertRow(table.length);
// Beszúr egy üres cellát az új sorba:
cell1 = newRow.insertCell(0);
// A cellába beteszi a fullName adatot a tömbből:
cell1.innerHTML = array1[i].fullName;
cell2 = newRow.insertCell(1);
cell2.innerHTML = array1[i].email;
cell3 = newRow.insertCell(2);
cell3.innerHTML = array1[i].salary;
cell4 = newRow.insertCell(3);
cell4.innerHTML = array1[i].city;
cell4 = newRow.insertCell(4);
// a sor végére tesz két linket: Edit, Delete
// Az onEdit és az onDelete függvényeknek a kiválaszott sor indexét adjuk át paraméterül:
cell4.innerHTML = '<a onClick="onEdit('+i+')">Edit</a>' + '<a onClick="onDelete('+i+')">Delete</a>';
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
formData["fullName"] = document.getElementById("fullName").value;
formData["email"] = document.getElementById("email").value;
formData["salary"] = document.getElementById("salary").value;
formData["city"] = document.getElementById("city").value;
return formData;
}
// Beszúrja az új sort a tömb végére, és a sor végére tesz két linket: Edit, Delete
// data: az űrlap adatai egy listában
function insertNewRecord(data) {
// A tömb végére tesszük az új rekordot:
array1.push({"fullName":data.fullName,"email":data.email,"salary":data.salary,"city":data.city});
// OR: array1[array1.length]=
// {"fullName":data.fullName,"email":data.email,"salary":data.salary,"city":data.city};
printArray();
}
// Kiüríti a beviteli mezőket. pl. az adatok elküldése után hívja meg.
function resetForm() {
document.getElementById("fullName").value = "";
document.getElementById("email").value = "";
document.getElementById("salary").value = "";
document.getElementById("city").value = "";
selectedIndex=null;
}
// A kiválasztott rekordot betöltjük a felső űrlapba szerkesztéshez:
function onEdit(index) {
document.getElementById("fullName").value = array1[index].fullName;
document.getElementById("email").value = array1[index].email;
document.getElementById("salary").value = array1[index].salary;
document.getElementById("city").value = array1[index].city;
selectedIndex=index;
}
// A kiolvasott űrlap adatokkal módosítja a kiválasztott rekordot:
// Update-nél hívjuk meg
function updateRecord(formData) {
array1[selectedIndex].fullName=formData.fullName;
array1[selectedIndex].email=formData.email;
array1[selectedIndex].salary=formData.salary;
array1[selectedIndex].city=formData.city;
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
if (document.getElementById("fullName").value == "") {
isValid = false;
// Megjeleníti az elrejtett hibaüzenetet:
document.getElementById("fullNameValidationError").classList.remove("hide");
} else {
// ha nincs validációs hiba (ki van töltve a Full Name mező)
isValid = true;
// Ha nincs elrejtve a validációs hibaüzenet, akkor elrejti azt:
if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
document.getElementById("fullNameValidationError").classList.add("hide");
}
return isValid;
}