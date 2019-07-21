import {
  pushHeading,
  pushImg,
  traverseNodes
} from '../lib/extract-headings.js';

import {
  formatNodeContents
} from '../lib/text-formatter.js';

describe('extract-headings', function() {

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
    const curPath = document.URL.replace(/[^\/]+$/, '');
    const expectedImgs = `[IMG]Image with alt text
[IMG]
[IMG]images/image_without_alt.svg
[IMG]Image with alt text`.split(/\n/).join('\r\n');

    const expectedData = [
      {
        tagName: 'IMG',
        text: 'Image with alt text',
        altStatus: 'defined',
        currentSrc: `${curPath}images/image_with_alt_text.svg`
      },
      {
        tagName: 'IMG',
        text: '',
        altStatus: 'empty',
        currentSrc: `${curPath}images/image_with_empty_alt.svg`
      },
      {
        tagName: 'IMG',
        text: 'images/image_without_alt.svg',
        altStatus: 'undefined',
        currentSrc: `${curPath}images/image_without_alt.svg`
      },
      {
        tagName: 'IMG',
        text: 'Image with alt text',
        altStatus: 'defined',
        currentSrc: `${curPath}images/image_with_alt_text.svg`
      }
    ];

    it('expects to return a list of imgs', function() {
      document.body.innerHTML = __html__['images.html'];

      const imgs = formatNodeContents(traverseNodes(document.body, pushImg), '\r\n');

      expect(imgs).to.equal(expectedImgs);
    });

    it('expects to return an array of objects', function() {
      document.body.innerHTML = __html__['images.html'];

      const imgs = traverseNodes(document.body, pushImg);

      expect(imgs).to.deep.equal(expectedData);
    });
  });

  describe('node tree with invisible sections', function() {
    document.body.innerHTML = __html__['headings_with_hidden_sections.html'];

    const curPath = document.URL.replace(/[^\/]+$/, '');
    const [
      heading0,
      heading1,
      ,,
      heading2,
      heading3
    ] = traverseNodes(document.body, pushHeading);

    it('expects', function() {
      const expected = {
        tagName: 'H2',
        text: 'Level2-1',
        invisible: {
          invisibleRootId: 'sec-2-1',
          invisibleRootClass: undefined,
          method: 'visibility:hidden'
        }
      };

      expect(heading1).to.deep.equal(expected);
    });

    it('expects', function() {
      const expected = {
        tagName: 'H2',
        text: [
          {
            tagName: 'IMG',
            text: 'Level2-2',
            altStatus: 'defined',
            currentSrc: `${curPath}images/image_with_alt_text.svg`
          }
        ],
        invisible: {
          invisibleRootId: 'sec-2-2',
          invisibleRootClass: undefined,
          method: 'display:none'
        }
      };

      expect(heading2).to.deep.equal(expected);
    });

    it('expects', function() {
      const expected = {
        tagName: 'H2',
        text: 'Level2-3'
      };

      expect(heading3).to.deep.equal(expected);
    });
  });

  describe('pushHeading with images', function() {
    const curPath = document.URL.replace(/[^\/]+$/, '');
    const expectedHeadings = `[H1][IMG]Sample html for headings
__[H2]Level2-1
____[H3]Level3-1
____[H3]Level3-2
__[H2]Level2-2`.split(/\n/).join('\r\n');

    const expectedData = {
      tagName: 'H1',
      text: [
        {
          tagName: 'IMG',
          text: 'Sample html for headings',
          altStatus: 'defined',
          currentSrc: `${curPath}images/title.svg`
        }
      ]
    };

    it('expects to return an array of objects whose text property also is an array', function() {
      document.body.innerHTML = __html__['headings_with_image.html'];

      const headings = traverseNodes(document.body, pushHeading);

      expect(headings[0]).to.deep.equal(expectedData);
    });

    it('expects to return a list of headings', function() {
      document.body.innerHTML = __html__['headings_with_image.html'];
      const headings = formatNodeContents(traverseNodes(document.body, pushHeading), '\r\n');

      expect(headings).to.equal(expectedHeadings);
    });
  });
});
