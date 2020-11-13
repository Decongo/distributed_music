const DiMu = artifacts.require('DistributedMusic');

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('DiMu', ([deployer, author]) => {
  let dimu;

  before(async () => {
    dimu = await DiMu.deployed();
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await dimu.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    })

    it('has a name', async () => {
      const name = await dimu.name()
      assert.equal(name, 'DistributedMusic')
    })
  })


  describe('upload track', async () => {
    const hash = '28da3231fa7daf0950c4f8663c686e3a';

    it('fails when missing hash', async () => {
      return await dimu.uploadTrack('', 'Title', { from: author }).should.be.rejected;
    })

    it('fails when missing title', async () => {
      return await dimu.uploadTrack(hash, '', { from: author }).should.be.rejected;
    })

    it('uploads a track', async () => {
      const result = await dimu.uploadTrack(hash, 'Title', { from: author });
      const trackCount = await dimu.trackCount();

      assert.equal(trackCount, 1);
      const event = result.logs[0].args;

      // check that track count is correct
      assert.equal(event.id.toNumber(), trackCount.toNumber(), 'ID is correct');

      // check that tack hash is correct
      assert.equal(event.hash, hash, 'hash is correct');

      // chec that video title is correct
      assert.equal(event.title, 'Title', 'title is correct');

      // check that author is correct
      assert.equal(event.author, author, 'author is correct');
    })

    it('displays tracks', async () => {
      const result = await dimu.uploadTrack(hash, 'Title', { from: author });
      const trackCount = await dimu.trackCount();
      const track = await dimu.tracks(trackCount);

      assert.equal(track.id.toNumber(), trackCount.toNumber(), 'ID is correct');
      assert.equal(track.hash, hash, 'hash is correct');
      assert.equal(track.title, 'Title', 'title is correct');
      assert.equal(track.author, author, 'author is correct');
    })
  })
})
