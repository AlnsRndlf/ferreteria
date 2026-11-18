import { existsSync, readFileSync, writeFileSync } from "node:fs";

const rutaPaquete = "package.json";
const paquete = JSON.parse(readFileSync(rutaPaquete, "utf8"));
let cambios = 0;
let faltantes = 0;

for (const seccion of ["dependencies", "devDependencies"]) {
  for (const [nombre, version] of Object.entries(paquete[seccion] ?? {})) {
    if (version !== "latest" && version !== "*") continue;

    const rutaModulo = `node_modules/${nombre}/package.json`;
    if (!existsSync(rutaModulo)) {
      console.log(`✗ ${nombre}: no está instalado (corre primero: npm install)`);
      faltantes++;
      continue;
    }

    const instalada = JSON.parse(readFileSync(rutaModulo, "utf8")).version;
    paquete[seccion][nombre] = `^${instalada}`;
    console.log(`✓ ${nombre}: ${version} -> ^${instalada}`);
    cambios++;
  }
}

if (cambios > 0) {
  writeFileSync(rutaPaquete, JSON.stringify(paquete, null, 2) + "\n");
}
console.log(`\n${cambios} versión(es) fijada(s)${faltantes ? `, ${faltantes} pendiente(s)` : ""}.`);
if (cambios > 0) console.log("Ahora guarda package.json y package-lock.json en Git.");
