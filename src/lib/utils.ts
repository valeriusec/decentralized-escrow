import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import deploy from '../../web3/scripts/deploy';
import { EscrowInt } from "@/components/Homepage";
import { SetStateAction } from "react";
import { ethers } from "ethers";
 
const provider = new ethers.BrowserProvider(
  window.ethereum as any,
);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function approve(escrowContract: any, signer: any) {
  const approveTxn = await escrowContract.connect(await signer).approve();
  await approveTxn.wait();
}

export async function newContract(signer: any, arbiter: string, beneficiary: string, value: string, setApproved: { (value: SetStateAction<boolean>): void; (arg0: boolean): void; }, setEscrows: { (value: SetStateAction<EscrowInt[]>): void; (arg0: any[]): void; }, escrows: EscrowInt[]) {
  const waitForSigner = await signer;
  const escrowContract = await deploy(waitForSigner, arbiter, beneficiary, value);

  const escrow = {
      address: escrowContract.getAddress(),
      arbiter,
      beneficiary,
      value: value,
      handleApprove: async () => {
          escrowContract.on('Approved', () => {
              setApproved(true);
          })
          await approve(escrowContract, signer);
      }
  }
  setEscrows([...escrows, escrow]);
}

export async function getAccounts( setAccount: { (value: any): void; (arg0: any): void; }, setSigner: any) {
  const accounts = await provider.send('eth_requestAccounts', []);

  setAccount(accounts[0]);
  setSigner(provider.getSigner());
}