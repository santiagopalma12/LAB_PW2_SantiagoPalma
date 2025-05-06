<?php
$customers = [
  "ALFKI" => [
    "Nombre" => "Alfreds Futterkiste",
    "Ciudad" => "Berlin",
    "País" => "Alemania"
  ],
  "NORTS" => [
    "Nombre" => "North/South",
    "Ciudad" => "Londres",
    "País" => "Reino Unido"
  ],
  "WOLZA" => [
    "Nombre" => "Wolski Zajazd",
    "Ciudad" => "Varsovia",
    "País" => "Polonia"
  ]
];

$q = $_GET["q"];
if (array_key_exists($q, $customers)) {
  $c = $customers[$q];
  echo "<table border='1'>
          <tr><th>Nombre</th><td>{$c['Nombre']}</td></tr>
          <tr><th>Ciudad</th><td>{$c['Ciudad']}</td></tr>
          <tr><th>País</th><td>{$c['País']}</td></tr>
        </table>";
} else {
  echo "Cliente no encontrado.";
}
?>
