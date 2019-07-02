{
  function pushHeading(node, headings) {
    if (/^h[1-6]/i.test(node.tagName)) {
      headings.push([node.tagName, node.textContent]);
    }
  }

  function collectHeadings(node, action, headings) {
    action(node, headings);

    if (node.length === 0) {
      return null;
    }
    const children = node.children;
    const childCount = children.length;
    for (let i = 0; i < childCount; i++) {
      collectHeadings(children[i], pushHeading, headings);
    }
    return headings;
  }
  console.log(collectHeadings(document.body, pushHeading, []));
}
