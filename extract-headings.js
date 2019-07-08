{
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

    if (text === "" && node.children.length > 0) {
      return formatNodeContents(traverseNodes(node, pushImg));
    } else {
      return text;
    }
  }

  function formatNodeContents(contents, separator = "") {
    return contents.map(formatNodeContent).join(separator);
  }

  function formatNodeContent(content) {
    const [tagName, value] = content;
    return `${toIndent(tagName)}[${tagName}]${value}`;
  }

  function toIndent(tagName) {
    return indentConfig[tagName] || '';
  }

  function pushHeading(node, headings) {
    if (/^h[1-6]/i.test(node.tagName)) {
      headings.push([node.tagName, headingText(node)]);
    }
  }

  function pushImg(node, imgs) {
    if (/^img/i.test(node.tagName)) {
      imgs.push([node.tagName, node.alt]);
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
  console.log(formatNodeContents(traverseNodes(document.body, pushHeading), '\r\n'));
  console.log(formatNodeContents(traverseNodes(document.body, pushImg), '\r\n'));
}
