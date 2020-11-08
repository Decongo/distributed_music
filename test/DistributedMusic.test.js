const DiMu = artifacts.require('DistributedMusic');

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
})
