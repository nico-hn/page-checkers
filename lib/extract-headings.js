const indentConfig = {
  'H1': '',
  'H2': '__',
  'H3': '____',
  'H4': '______',
  'H5': '________',
  'H6': '__________',
  'IMG': ''
};

function headingText(node) {
  const text = node.textContent.trim();

  if (text === '' && node.children.length > 0) {
    return traverseNodes(node, pushImg);
  } else {
    return text;
  }
}

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

function pushHeading(node, headings) {
  if (/^h[1-6]/i.test(node.tagName)) {
    const heading = {
      tagName: node.tagName,
      text: headingText(node)
    };
    headings.push(heading);
  }
}

function pushImg(node, imgs) {
  if (/^img/i.test(node.tagName)) {
    const img = {
      tagName: node.tagName,
      text: node.alt
    };
    imgs.push(img);
  }
}

function traverseNodes(node, action, results = []) {
  action(node, results);

  if (node.length === 0) {
    return null;
  }

  const children = node.children;
  const childCount = children.length;

  for (let i = 0; i < childCount; i++) {
    traverseNodes(children[i], action, results);
  }
  return results;
}

export { formatNodeContents, pushHeading, pushImg, traverseNodes };
