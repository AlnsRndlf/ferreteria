export function validarRun(valorRun) {
  const runLimpio = valorRun.trim().toUpperCase();

  // Debe venir sin puntos ni guion, entre 7 y 9 caracteres.
  if (!/^[0-9]{6,8}[0-9K]$/.test(runLimpio)) {
    return false;
  }

  const cuerpo = runLimpio.slice(0, -1);
  const digitoVerificador = runLimpio.slice(-1);

  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador;
    multiplicador++;

    if (multiplicador > 7) {
      multiplicador = 2;
    }
  }

  const resultado = 11 - (suma % 11);
  let digitoCalculado;

  if (resultado === 11) {
    digitoCalculado = "0";
  } else if (resultado === 10) {
    digitoCalculado = "K";
  } else {
    digitoCalculado = String(resultado);
  }

  return digitoVerificador === digitoCalculado;
}

export function validarCorreoPermitido(correo) {
  const patron = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
  return patron.test(correo.trim());
}