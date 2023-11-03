import {ethers} from 'hardhat';
import {expect} from 'chai';
import { BaseContract, ContractTransactionResponse, Contract } from 'ethers';
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';

describe('Escrow', function () {
  let contract: BaseContract & { deploymentTransaction(): ContractTransactionResponse; } & Omit<Contract, keyof BaseContract> | any;
  let depositor;
  let beneficiary: any;
  let arbiter: any;
  const deposit = ethers.parseEther('1');
  beforeEach(async () => {
    depositor = ethers.provider.getSigner(0);
    beneficiary = ethers.provider.getSigner(1);
    arbiter = ethers.provider.getSigner(2);
    const Escrow = await ethers.getContractFactory('Escrow');
    contract = await Escrow.deploy(
      (await arbiter).getAddress(),
      (await beneficiary).getAddress,
      {
        value: deposit,
      }
    );
    await contract.deployed();
  });

  it('should be funded initially', async function () {
    let balance = await ethers.provider.getBalance(contract.address);
    expect(balance).to.eq(deposit);
  });

  describe('after approval from address other than the arbiter', () => {
    it('should revert', async () => {
      await expect(contract.connect(beneficiary).approve()).to.be.reverted;
    })
  })

  describe('after approval from the arbiter', () => {
    it('should transfer balance to beneficiary', async () => {
      const before = await ethers.provider.getBalance((await beneficiary).getAddress());
      const approveTxn = await contract.connect(arbiter).approve();
      await approveTxn.wait();
      const after = await ethers.provider.getBalance((await beneficiary).getAddress());
      expect(after).to.eq(deposit);
    });
  });
})

