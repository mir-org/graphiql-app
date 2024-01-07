function pretty(str: string) {
  const firstBracketIndex = str.indexOf('{');
  let query = str.slice(0, firstBracketIndex).trim();
  query = query.replace(/\s+/g, ' ');
  let request = str.slice(firstBracketIndex);
  request = normalize(request);
  request = enterEditor(request);
  request = indentationEditor(request);
  request = spaceEditor(request);
  const result = (query.length <= 5 ? '' : query) + request;
  return result;
}

function normalize(str: string) {
  const result = str.replace(/ /gi, '').replace(/\n/gi, '');
  return result;
}

function enterEditor(str: string) {
  const result = str.split('');
  let isBracketOpen = false;
  for (let i = 0; i < result.length; i++) {
    if (result[i] === '(') {
      isBracketOpen = true;
    }
    if (result[i] === ')') {
      isBracketOpen = false;
    }
    if (isBracketOpen) continue;
    if (result[i] === '}' && result[i + 1] === '}') {
      result[i] = '\n' + '}';
      continue;
    }
    if (result[i] === '}') {
      result[i] = '\n' + '}' + '\n';
      continue;
    }
    if (result[i] === '{') {
      result[i] = '{' + '\n';
      continue;
    }
  }
  return result.join('');
}

function indentationEditor(str: string) {
  const lines = str.split('\n');
  let prettifiedStr = '';
  let indentationLevel = 0;
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) {
      continue;
    }
    if (trimmedLine.startsWith('}')) {
      indentationLevel = Math.max(0, indentationLevel - 1);
    }
    prettifiedStr += '  '.repeat(indentationLevel) + trimmedLine + '\n';
    if (trimmedLine.endsWith('{')) {
      indentationLevel += 1;
    }
  }
  return prettifiedStr;
}

function spaceEditor(str: string) {
  const result = str
    .replace(/:/gi, ': ')
    .replace(/\)/gi, ') ')
    .replace(/,/gi, ', ')
    .replace(/{/gi, ' {')
    .replace(/  {/gi, ' {');
  return result;
}

export default pretty;
