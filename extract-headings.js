{
  function headingText(node) {
    return node.textContent;
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
  console.log(traverseNodes(document.body, pushHeading));
}
