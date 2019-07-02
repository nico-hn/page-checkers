{
  function collectHeadings(node, headings) {
    if (/^h[1-6]/i.test(node.tagName)) {
      headings.push([node.tagName, node.textContent]);
    }
    if (node.length === 0) {
      return null;
    }
    const children = node.children;
    const childCount = children.length;
    for (let i = 0; i < childCount; i++) {
      collectHeadings(children[i], headings);
    }
    return headings;
  }
  console.log(collectHeadings(document.body, []));
}
