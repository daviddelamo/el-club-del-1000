// ABN Educational Engine for "Amigos del 1000" (and 100, 10)

/**
 * Generates an exercise according to target (1000, 100, 10) and difficulty level
 */
export function generateExercise(target = 1000, level = 1) {
  if (target === 10) {
    const num1 = Math.floor(Math.random() * 9) + 1; // 1 to 9
    const answer = 10 - num1;
    const options = generateOptions(answer, 10, 1, 9);
    return {
      target: 10,
      level: 1,
      num1,
      answer,
      options,
      breakdown: {
        type: 'units',
        unitsNeeded: answer,
        explanation: `A ${num1} le faltan ${answer} para llegar a 10.`
      }
    };
  }

  if (target === 100) {
    if (level === 1) {
      // Decenas exactas (e.g., 30 + 70)
      const d = Math.floor(Math.random() * 9) + 1;
      const num1 = d * 10;
      const answer = 100 - num1;
      const options = generateOptions(answer, 100, 10, 90, 10);
      return {
        target: 100,
        level: 1,
        num1,
        answer,
        options,
        breakdown: {
          type: 'roundTens',
          num1,
          answer,
          explanation: `Pensamos en amigos del 10: ${d} + ${10 - d} = 10, así que ${num1} + ${answer} = 100.`
        }
      };
    } else {
      // Cualquier número hasta 100 (e.g., 34 + 66)
      const tens = Math.floor(Math.random() * 8) + 1; // 1 to 8
      const units = Math.floor(Math.random() * 9) + 1; // 1 to 9
      const num1 = tens * 10 + units;
      const answer = 100 - num1;
      const options = generateOptions(answer, 100, 1, 99);
      return {
        target: 100,
        level: 2,
        num1,
        answer,
        options,
        breakdown: {
          type: 'tensAndUnits',
          tensGiven: tens,
          tensNeeded: 9 - tens, // Sum to 9 in tens
          unitsGiven: units,
          unitsNeeded: 10 - units, // Sum to 10 in units
          explanation: `Regla ABN del 100: Las decenas suman 9 (${tens} + ${9 - tens} = 90) y las unidades suman 10 (${units} + ${10 - units} = 10). ¡Total: 90 + 10 = 100!`
        }
      };
    }
  }

  // TARGET = 1000
  if (level === 1) {
    // NIVEL 1: Centenas exactas (100, 200, 300 ... 900)
    const c = Math.floor(Math.random() * 9) + 1; // 1 to 9
    const num1 = c * 100;
    const answer = 1000 - num1;
    const options = generateOptions(answer, 1000, 100, 900, 100);

    return {
      target: 1000,
      level: 1,
      num1,
      answer,
      options,
      breakdown: {
        type: 'hundreds',
        cGiven: c,
        cNeeded: 10 - c,
        explanation: `¡Es como los amigos del 10 con dos ceros! Si ${c} + ${10 - c} = 10, entonces ${num1} + ${answer} = 1000.`
      }
    };
  } else if (level === 2) {
    // NIVEL 2: Decenas exactas (e.g., 340 + 660, 480 + 520)
    const c = Math.floor(Math.random() * 9); // 0 to 8
    const d = Math.floor(Math.random() * 9) + 1; // 1 to 9
    const num1 = c * 100 + d * 10;
    const answer = 1000 - num1;

    // Smart distractors for round tens: common mistake is summing hundreds to 10 instead of 9
    const distractors = [
      answer + 100, // Error: 1100
      answer - 100 > 0 ? answer - 100 : answer + 200,
      answer + 10,
    ];
    const options = shuffle([answer, ...distractors]).slice(0, 4);

    return {
      target: 1000,
      level: 2,
      num1,
      answer,
      options,
      breakdown: {
        type: 'hundredsAndTens',
        cGiven: Math.floor(num1 / 100),
        cNeeded: 9 - Math.floor(num1 / 100),
        dGiven: d,
        dNeeded: 10 - d,
        explanation: `Regla ABN: Las centenas suman 900 (${Math.floor(num1 / 100) * 100} + ${(9 - Math.floor(num1 / 100)) * 100}) y las decenas completan el 100 restante (${d * 10} + ${(10 - d) * 10}). ¡900 + 100 = 1000!`
      }
    };
  } else {
    // NIVEL 3: Cualquier número de 3 cifras (e.g., 348 + 652)
    const c = Math.floor(Math.random() * 8) + 1; // 1 to 8
    const d = Math.floor(Math.random() * 9);     // 0 to 8
    const u = Math.floor(Math.random() * 9) + 1; // 1 to 9 (no 0, to make it 3 orders)
    const num1 = c * 100 + d * 10 + u;
    const answer = 1000 - num1;

    const cNeeded = 9 - c;
    const dNeeded = 9 - d;
    const uNeeded = 10 - u;

    // Distractors based on common ABN pitfalls:
    // 1. Made hundreds sum to 10 instead of 9
    const dist1 = (10 - c) * 100 + dNeeded * 10 + uNeeded;
    // 2. Made tens sum to 10 instead of 9
    const dist2 = cNeeded * 100 + (10 - d) * 10 + uNeeded;
    // 3. Off by 1 in units
    const dist3 = answer + (uNeeded > 2 ? -1 : 1);

    const options = shuffle([answer, dist1, dist2, dist3]);

    return {
      target: 1000,
      level: 3,
      num1,
      answer,
      options,
      breakdown: {
        type: 'fullABN',
        cGiven: c,
        cNeeded,
        dGiven: d,
        dNeeded,
        uGiven: u,
        uNeeded,
        explanation: `El Truco Mágico ABN del 1000:
1. Las Centenas suman 9 (${c} + ${cNeeded} = 9  👉  ${c * 100} + ${cNeeded * 100} = 900)
2. Las Decenas suman 9 (${d} + ${dNeeded} = 9  👉  ${d * 10} + ${dNeeded * 10} = 90)
3. Las Unidades suman 10 (${u} + ${uNeeded} = 10)
¡Suma todo: 900 + 90 + 10 = 1000!`
      }
    };
  }
}

/**
 * Generate 4 distinct options including the correct answer
 */
function generateOptions(answer, max, min, maxNum, step = 1) {
  const opts = new Set([answer]);

  while (opts.size < 4) {
    let candidate;
    const offset = (Math.floor(Math.random() * 5) - 2) * step;
    if (offset !== 0 && answer + offset >= min && answer + offset <= max) {
      candidate = answer + offset;
    } else {
      candidate = Math.floor((Math.random() * (maxNum - min)) / step) * step + min;
    }
    if (candidate > 0 && candidate < max) {
      opts.add(candidate);
    }
  }

  return shuffle(Array.from(opts));
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
