const indentConfig = {
  'H1': '',
  'H2': '__',
  'H3': '____',
  'H4': '______',
  'H5': '________',
  'H6': '__________',
  'IMG': ''
};

function formatNodeContents(contents, separator = '') {
  return contents.map(formatNodeContent).join(separator);
}

function formatNodeContent(content) {
  const { tagName, text } = content;
  const ifText = typeof text === 'string';
  const textVal = ifText ? text : formatNodeContents(text);

  return `${toIndent(tagName)}[${tagName}]${textVal}`;
}

function toIndent(tagName) {
  return indentConfig[tagName] || '';
}

export { formatNodeContents };
