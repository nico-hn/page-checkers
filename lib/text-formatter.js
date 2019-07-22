const indentConfig = {
  'H1': '',
  'H2': '__',
  'H3': '____',
  'H4': '______',
  'H5': '________',
  'H6': '__________',
  'IMG': ''
};

function invisibilityLabel(content) {
  if (content.invisible) {
    return `<${content.invisible.method}>`;
  }

  return '';
}

function formatNodeContents(contents, separator = '') {
  return contents.map(formatNodeContent).join(separator);
}

function formatNodeContent(content) {
  const { tagName, text } = content;
  const ifText = typeof text === 'string';
  const textVal = ifText ? text : formatNodeContents(text);
  const invisible = invisibilityLabel(content);

  return `${toIndent(tagName)}[${tagName}]${invisible}${textVal}`;
}

function toIndent(tagName) {
  return indentConfig[tagName] || '';
}

export { formatNodeContents };
