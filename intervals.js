function intervalConstruction(arr) {
  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const semitones = ['--', '--', '-', '--', '--', '--', '-'];
  const intervals = {
    m2: [1, 2],
    M2: [2, 2],
    m3: [3, 3],
    M3: [4, 3],
    P4: [5, 4],
    P5: [7, 5],
    m6: [8, 6],
    M6: [9, 6],
    m7: [10, 7],
    M7: [11, 7],
    P8: [12, 8],
  };

  const [interval, start, direction] = arr;

  const [semitone, degree] = intervals[interval];

  const startIndex = notes.indexOf(start.slice(0, 1));

  let degreeNotes = [];
  let semitoneArr = [];

  const distance = direction === 'dsc' ? startIndex - degree : startIndex + degree;

  if (direction === 'asc' && distance < notes.length && startIndex < degree) {
    degreeNotes = notes.slice(startIndex, distance);
    semitoneArr = semitones.slice(startIndex, distance - 1);
  } else if (direction === 'asc' && distance < notes.length && startIndex > degree) {
    degreeNotes = notes.slice(startIndex, distance);
    semitoneArr = semitones.slice(startIndex, distance - 1);
  } else if (direction === 'asc' && distance > notes.length) {
    const endIndex = distance - notes.length;
    degreeNotes = notes.slice(startIndex).concat(notes.slice(0, endIndex));
    semitoneArr = semitones.slice(startIndex).concat(semitones.slice(0, endIndex - 1));
  } else if (direction === 'dsc' && startIndex + distance > notes.length) {
    const endIndex = startIndex - (startIndex - distance);
    degreeNotes = notes.slice(endIndex + 1, startIndex + 1);
    semitoneArr = semitones.slice(endIndex + 1, startIndex);
  } else if (direction === 'dsc' && distance < 0) {
    const endIndex = notes.length + distance + 1;
    degreeNotes = notes.slice(endIndex).concat(notes.slice(0, startIndex + 1));
    semitoneArr = semitones.slice(0, startIndex).concat(semitones.slice(endIndex));
  } else if (direction === 'dsc' && distance === 0) {
    degreeNotes = notes.slice(distance + 1, startIndex + 1);
    semitoneArr = semitones.slice(distance + 1, startIndex);
  } else if (direction === 'dsc' && distance < notes.length) {
    degreeNotes = notes.slice(distance + 1, startIndex + 1);
    semitoneArr = semitones.slice(distance + 1, startIndex + 1);
  }

  let countSemitone = semitoneArr.reduce((acc, el) => acc + el.length, 0);

  if (direction === 'asc') {
    start.length > 1
      ? start.includes('b')
        ? (countSemitone = countSemitone + (start.length - 1))
        : (countSemitone = countSemitone - (start.length - 1))
      : 0;
  } else {
    start.length > 1
      ? start.includes('b')
        ? (countSemitone = countSemitone - (start.length - 1))
        : (countSemitone = countSemitone + (start.length - 1))
      : 0;
  }

  let res = '';

  if (degreeNotes.length === degree && countSemitone === semitone) {
    if (direction === 'dsc') {
      res = degreeNotes[0];
    } else {
      res = degreeNotes[degreeNotes.length - 1];
    }
  } else if (degreeNotes.length === degree && countSemitone < semitone) {
    if (direction === 'dsc') {
      res = degreeNotes[0];
      semitone > countSemitone
        ? semitone - countSemitone === 2
          ? (res = res + 'bb')
          : (res = res + 'b')
        : semitone - countSemitone === 2
        ? (res = res + '##')
        : (res = res + '#');
    } else {
      res = degreeNotes[degreeNotes.length - 1];
      semitone - countSemitone === 1 ? (res = res + '#') : (res = res + '##');
    }
  } else if (degreeNotes.length === degree && countSemitone > semitone) {
    if (direction === 'dsc') {
      res = degreeNotes[0];
      semitone > countSemitone
        ? semitone - countSemitone === -2
          ? (res = res + 'bb')
          : (res = res + 'b')
        : semitone - countSemitone === -2
        ? (res = res + '##')
        : (res = res + '#');
    } else {
      res = degreeNotes[degreeNotes.length - 1];
      semitone > countSemitone
        ? semitone - countSemitone === -2
          ? (res = res + '##')
          : (res = res + '#')
        : semitone - countSemitone === -2
        ? (res = res + 'bb')
        : (res = res + 'b');
    }
  }

  return res;
}

console.log(intervalConstruction(['M2', 'C', 'asc'])); //D
console.log(intervalConstruction(['P5', 'B', 'asc'])); //F#
console.log(intervalConstruction(['m2', 'Bb', 'dsc'])); //A
console.log(intervalConstruction(['M3', 'Cb', 'dsc'])); //Abb
console.log(intervalConstruction(['P4', 'G#', 'dsc'])); //D#
console.log(intervalConstruction(['m3', 'B', 'dsc'])); //G#
console.log(intervalConstruction(['m2', 'Fb', 'asc'])); //Gbb
console.log(intervalConstruction(['M2', 'E#', 'dsc'])); //D#
console.log(intervalConstruction(['P4', 'E', 'dsc'])); //B
console.log(intervalConstruction(['m2', 'D#', 'asc'])); //E
console.log(intervalConstruction(['M7', 'G', 'asc'])); //F#

function intervalIdentification(arr) {
  const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const dashes = ['--', '--', '-', '--', '--', '--', '-'];
  const intervals = {
    m2: [1, 2],
    M2: [2, 2],
    m3: [3, 3],
    M3: [4, 3],
    P4: [5, 4],
    P5: [7, 5],
    m6: [8, 6],
    M6: [9, 6],
    m7: [10, 7],
    M7: [11, 7],
    P8: [12, 8],
  };
  const [start, end, direction] = arr;

  const startIndex = notes.indexOf(start.slice(0, 1));
  const endIndex = notes.indexOf(end.slice(0, 1));

  let newArr = [];
  let newDashes = [];

  if (direction !== 'dsc') {
    newArr =
      endIndex < startIndex
        ? notes.slice(startIndex).concat(notes.slice(0, endIndex + 1))
        : notes.slice(startIndex, endIndex + 1);

    newDashes =
      endIndex < startIndex
        ? dashes.slice(startIndex).concat(dashes.slice(0, endIndex))
        : dashes.slice(startIndex, endIndex);
  } else if (direction === 'dsc' && endIndex < startIndex) {
    newArr = notes.slice(endIndex, startIndex + 1);

    newDashes = dashes.slice(endIndex, startIndex);
  } else if (endIndex < startIndex) {
    newArr = notes.slice(endIndex, startIndex + 1);

    newDashes = dashes.slice(endIndex, endIndex - startIndex);
  } else if (direction === 'dsc' && endIndex > startIndex) {
    newArr = notes.slice(0, startIndex + 1).concat(notes.slice(endIndex));

    newDashes = dashes.slice(0, startIndex + 1).concat(dashes.slice(endIndex + 1));
  } else {
    newArr = notes.slice(0, startIndex + 1).concat(notes.slice(endIndex));

    newDashes = dashes.slice(0, startIndex + 1).concat(dashes.slice(endIndex));
  }

  const countDegrees = newArr.length;
  let countDashes = newDashes.reduce((acc, el) => acc + el.length, 0);

  if (direction === 'dsc' && endIndex > startIndex) {
    start.length > 1
      ? start.includes('b')
        ? (countDashes = countDashes - (start.length - 1))
        : (countDashes = countDashes + (start.length - 1))
      : 0;

    end.length > 1
      ? end.includes('b')
        ? (countDashes = countDashes + (end.length - 1))
        : (countDashes = countDashes + (end.length - 1))
      : 0;
  } else if (direction === 'dsc' && endIndex < startIndex) {
    start.length > 1
      ? start.includes('b')
        ? (countDashes = countDashes - (start.length - 1))
        : (countDashes = countDashes + (start.length - 1))
      : 0;

    end.length > 1
      ? end.includes('b')
        ? (countDashes = countDashes - (end.length - 1))
        : (countDashes = countDashes - (end.length - 1))
      : 0;
  } else {
    start.length > 1
      ? start.includes('b')
        ? (countDashes = countDashes - (start.length - 1))
        : (countDashes = countDashes + (start.length - 1))
      : 0;

    end.length > 1
      ? end.includes('b')
        ? (countDashes = countDashes - (end.length - 1))
        : (countDashes = countDashes + (end.length - 1))
      : 0;
  }

  const keys = Object.keys(intervals);
  const res = keys
    .filter((el) => {
      const [semitone, degree] = intervals[el];
      if (semitone === Math.abs(countDashes) && degree === countDegrees) {
        return el;
      }
    })
    .join('');

  return res;
}
