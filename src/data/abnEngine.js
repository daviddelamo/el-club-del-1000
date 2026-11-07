// ABN Educational Engine focused exclusively on "Amigos del 1000"

/**
 * Generates an Amigos del 1000 exercise
 * Level 1: Centenas exactas (e.g., 300 + 700 = 1000)
 * Level 2: Decenas redondas (e.g., 340 + 660 = 1000) -> 40 necesita 60; luego 300+100=400, faltan 600
 * Level 3: Cualquier número (e.g., 348 + 652 = 1000) -> 48 necesita 52; luego 300+100=400, faltan 600
 */
export function generateExercise(target = 1000, level = 2) {
  if (level === 1) {
    // Nivel 1: Centenas exactas (100 a 900)
    const c = Math.floor(Math.random() * 9) + 1; // 1 to 9
    const num1 = c * 100;
    const answer = 1000 - num1;

    return {
      target: 1000,
      level: 1,
      num1,
      answer,
      centenasPart: answer,
      decenasPart: 0,
      type: 'hundreds'
    };
  } else if (level === 2) {
    // Nivel 2: Decenas exactas (e.g., 340, 570, 720)
    const c = Math.floor(Math.random() * 9); // 0 to 8
    const d = Math.floor(Math.random() * 9) + 1; // 1 to 9 (10 to 90)
    const num1 = c * 100 + d * 10;
    const answer = 1000 - num1;

    const decenasGiven = d * 10;
    const decenasNeeded = 100 - decenasGiven; // First step she calculates! (e.g. 40 -> 60)
    const centenasNeeded = answer - decenasNeeded; // Second step (e.g. 600)

    return {
      target: 1000,
      level: 2,
      num1,
      answer,
      decenasGiven,
      decenasPart: decenasNeeded,
      centenasPart: centenasNeeded,
      type: 'decenasFirst'
    };
  } else {
    // Nivel 3: Cualquier número de 3 cifras (e.g., 348, 627, 415)
    const c = Math.floor(Math.random() * 8) + 1; // 1 to 8
    const d = Math.floor(Math.random() * 9);     // 0 to 8
    const u = Math.floor(Math.random() * 9) + 1; // 1 to 9 (unidades no cero)
    const num1 = c * 100 + d * 10 + u;
    const answer = 1000 - num1;

    const decenasUnitsGiven = num1 % 100; // e.g. 48
    const decenasUnitsNeeded = 100 - decenasUnitsGiven; // First step (e.g. 52)
    const centenasNeeded = answer - decenasUnitsNeeded; // Second step (e.g. 600)

    return {
      target: 1000,
      level: 3,
      num1,
      answer,
      decenasGiven: decenasUnitsGiven,
      decenasPart: decenasUnitsNeeded,
      centenasPart: centenasNeeded,
      type: 'decenasFirst'
    };
  }
}
