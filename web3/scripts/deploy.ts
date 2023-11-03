import { ethers } from 'ethers';
import Escrow from '../artifacts/contracts/Escrow.sol/Escrow.json';

export default async function deploy(signer: ethers.ContractRunner | null | undefined, arbiter: any | ethers.Overrides, beneficiary: any | ethers.Overrides, value: any) {
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer,
  );
  return factory.deploy(arbiter, beneficiary, {value});
}