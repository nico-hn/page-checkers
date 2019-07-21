const altStatus = {
  DEFINED: 'defined',
  UNDEFINED: 'undefined',
  EMPTY: 'empty'
};

function headingText(node) {
  const text = node.textContent.trim();

  if (text === '' && node.children.length > 0) {
    return traverseNodes(node, pushImg);
  } else {
    return text;
  }
}

function isInvisible(node) {
  const style = node.style;

  // if (node.offsetHeight === 0 || node.offsetWidth === 0) {
  //   return true;
  // }

  if (style && style.display === 'none' ||
      style.visibility === 'hidden' ||
     style.opacity === '0') {
    return true;
  }

  const computedStyle = window.getComputedStyle(node);
  if (computedStyle.display === 'none' || computedStyle.visibility === 'hidden') {
    return true;
  }

  return false;
}

function summarizeInvisibility(node) {
  const summary = {
    invisibleRootId: node.id,
    invisibleRootClass: node.class,
    method: ''
  };
  const computedStyle = window.getComputedStyle(node);

  if (computedStyle.display === 'none') {
    summary.method = 'display:none';
  }

  if (computedStyle.visibility === 'hidden') {
    summary.method = 'visibility:hidden';
  }

  return summary;
}

function identifyAltStatus(node) {
  if (node.attributes.alt === undefined) {
    return altStatus.UNDEFINED;
  }

  if (node.alt === '') {
    return altStatus.EMPTY;
  }

  return altStatus.DEFINED;
}

function srcURL(img) {
  if (img.currentSrc.length > 0) {
    return img.currentSrc;
  }

  const curPath = document.URL;
  const url = new URL(img.attributes.src.value, curPath);

  return url.href;
}

function selectImgText(node, status) {
  if (status === altStatus.UNDEFINED) {
    return node.attributes.src.value;
  }

  return node.alt;
}

function pushHeading(node, headings, invisible) {
  if (/^h[1-6]/i.test(node.tagName)) {
    const heading = {
      tagName: node.tagName,
      text: headingText(node)
    };
    if (invisible) {
      heading.invisible = invisible;
    }
    headings.push(heading);
  }
}

function pushImg(node, imgs, invisible) {
  if (/^img/i.test(node.tagName)) {
    const status = identifyAltStatus(node);
    const img = {
      tagName: node.tagName,
      text: selectImgText(node, status),
      altStatus: status,
      currentSrc: srcURL(node)
    };
    if (invisible) {
      img.invisible = invisible;
    }
    imgs.push(img);
  }
}

function traverseNodes(node, action, results = [], invisible = null) {
  if (!invisible && isInvisible(node)) {
    invisible = summarizeInvisibility(node);
  }

  action(node, results, invisible);

  if (node.length === 0) {
    return null;
  }

  const children = node.children;
  const childCount = children.length;

  for (let i = 0; i < childCount; i++) {
    traverseNodes(children[i], action, results, invisible);
  }
  return results;
}

export { pushHeading, pushImg, traverseNodes };
