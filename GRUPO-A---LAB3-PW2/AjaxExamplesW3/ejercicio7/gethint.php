<?php
//Esta es una lista de nombres, para usarlos de ejemplo en el ejercicio.
$a = ["Ana", "Beto", "Carlos", "Diana", "Elena", "Fernando", "Gabriela", "Hugo", "Iván", "Julia"];

$q = $_GET["q"] ?? "";
$hint = "";

if ($q !== "") {
    $q = strtolower($q);
    $len = strlen($q);
    foreach ($a as $name) {
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
