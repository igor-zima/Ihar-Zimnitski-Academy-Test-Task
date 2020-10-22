function intervalConstruction(arr) {}

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
