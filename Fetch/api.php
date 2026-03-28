<?php
header("Content-Type: application/json");
require "db.php";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
 case 'GET':
 try {
   $stmt = $pdo->query("SELECT * FROM nyeremeny");
 $readData=$stmt->fetchAll();
  echo json_encode(['status' => 'Read success!', "readData"=>$readData]);
 }
 catch(PDOException $e) {
 echo json_encode(['status' => 'Read error!']);
 }
 break;
 
 case 'POST':
 try {$data = json_decode(file_get_contents("php://input"), true);
 //Az ID automatikusan kap értéket (AUTO_INCREMENT)
 $stmt = $pdo->prepare("INSERT INTO nyeremeny (huzasid, talalat, darab, ertek) VALUES (?, ?, ?, ?)");
 $stmt->execute([$data['huzasid'], $data['talalat'], $data['darab'], $data['ertek']]);
 echo json_encode(['status' => 'Create success!']);
 }
 catch(PDOException $e) {
 echo json_encode(['status' => 'Create error!']);
 }
 break;
 case 'PUT':
 try {
 $data = json_decode(file_get_contents("php://input"), true);
 $stmt = $pdo->prepare("UPDATE nyeremeny SET huzasid=?, talalat=?, darab=?, ertek=? WHERE id=?");
 $stmt->execute([$data['huzasid'], $data['talalat'], $data['darab'], $data['ertek'], $data['id']]);
 echo json_encode(['status' => 'Update success!']);
 }
 catch(PDOException $e) {
 echo json_encode(['status' => 'Update error!']);
 }
 break;
 case 'DELETE':
 try {
 $data = json_decode(file_get_contents("php://input"), true);

 $stmt = $pdo->prepare("DELETE FROM nyeremeny WHERE id=?");
 $stmt->execute([$data['id']]);
 echo json_encode(['status' => 'Delete success!']);
 }
 catch(PDOException $e) {
 echo json_encode(['status' => 'Delete error!']);
 }
 break;
}
?>
