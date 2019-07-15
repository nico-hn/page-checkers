import {
  formatNodeContents,
  pushHeading,
  pushImg,
  traverseNodes
} from '../lib/extract-headings.js';

describe('extract-headings', function() {
  document.body.innerHTML = __html__['headings.html'];

  describe('pushHeading', function() {
    const expectedHeadings = `[H1]Sample html for headings
__[H2]Level2-1
____[H3]Level3-1
____[H3]Level3-2
__[H2]Level2-2`.split(/\n/).join('\r\n');
    it('expects to return a list of headings', function() {
      const headings = formatNodeContents(traverseNodes(document.body, pushHeading), '\r\n');

      expect(headings).to.equal(expectedHeadings);
    });
  });

  describe('pushImg', function() {
    it('expects to return a list of imgs', function() {
      const imgs = formatNodeContents(traverseNodes(document.body, pushImg), '\r\n');

      expect(imgs).to.equal('');
    });
  });
});
