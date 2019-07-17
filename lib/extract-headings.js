function headingText(node) {
  const text = node.textContent.trim();

  if (text === '' && node.children.length > 0) {
    return traverseNodes(node, pushImg);
  } else {
    return text;
  }
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

export { pushHeading, pushImg, traverseNodes };
