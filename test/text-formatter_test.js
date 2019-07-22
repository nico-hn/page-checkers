import {
  pushHeading,
  pushImg,
  traverseNodes
} from '../lib/extract-headings.js';

import {
  formatNodeContents
} from '../lib/text-formatter.js';


describe('text-formatter', function() {
  describe('pushHeading', function() {
    const expectedHeadings = `[H1]Sample html for headings
__[H2]Level2-1
____[H3]Level3-1
____[H3]Level3-2
__[H2]Level2-2`.split(/\n/).join('\r\n');

    it('expects to return a list of headings', function() {
      document.body.innerHTML = __html__['headings.html'];

      const headings = formatNodeContents(traverseNodes(document.body, pushHeading), '\r\n');

      expect(headings).to.equal(expectedHeadings);
    });
  });

  describe('pushImg', function() {
    const expectedImgs = `[IMG]Image with alt text
[IMG]
[IMG]images/image_without_alt.svg
[IMG]Image with alt text`.split(/\n/).join('\r\n');

    it('expects to return a list of imgs', function() {
      document.body.innerHTML = __html__['images.html'];

      const imgs = formatNodeContents(traverseNodes(document.body, pushImg), '\r\n');

      expect(imgs).to.equal(expectedImgs);
    });
  });

  describe('pushHeading with images', function() {
    const expectedHeadings = `[H1][IMG]Sample html for headings
__[H2]Level2-1
____[H3]Level3-1
____[H3]Level3-2
__[H2]Level2-2`.split(/\n/).join('\r\n');

    it('expects to return a list of headings', function() {
      document.body.innerHTML = __html__['headings_with_image.html'];
      const headings = formatNodeContents(traverseNodes(document.body, pushHeading), '\r\n');

      expect(headings).to.equal(expectedHeadings);
    });
  });

  describe('pushHeading with hidden headings', function() {
    const expectedHeadings = `[H1]Headings with hidden sections
__[H2]<visibility:hidden>Level2-1
____[H3]<visibility:hidden>Level3-1
____[H3]<visibility:hidden>Level3-2
__[H2]<display:none>[IMG]Level2-2
__[H2]Level2-3`.split(/\n/).join('\r\n');

    it ('expects to return a list of headings with its vibility', function() {
      document.body.innerHTML = __html__['headings_with_hidden_sections.html'];
      const headings = formatNodeContents(traverseNodes(document.body, pushHeading), '\r\n');

      expect(headings).to.equal(expectedHeadings);
    });
  });
});
