describe('canary', function() {
  it('canary test', function() {
    expect(1).to.be.a('number');
  });

  it('canary test for html2js', function() {
    document.body.innerHTML = __html__['headings.html'];
    const h1 = document.querySelector('h1');

    expect(h1.textContent).to.equal('Sample html for headings');
  });
});
