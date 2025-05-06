<?php
$a = ["Ana", "Andrés", "Beto", "Carlos", "Carmen", "Diana", "Gabriela", "Gustavo", "Lucho", "Luis", "María", "Pedro"];

$q = $_GET["q"];
$hint = "";

if ($q !== "") {
  $q = strtolower($q);
  $len = strlen($q);
  foreach($a as $name) {
    if (stristr($q, substr($name, 0, $len))) {
      if ($hint === "") {
        $hint = $name;
      } else {
        $hint .= ", $name";
      }
    }
  }
}

echo $hint === "" ? "sin sugerencias" : $hint;
?>
