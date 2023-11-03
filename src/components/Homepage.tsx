"use client"
import React from 'react'
import Escrow from './Escrow';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { getAccounts, newContract } from '@/lib/utils';
import { ethers } from 'ethers';

declare global {
    interface Window {
        ethereum?: any;
    }
}

export interface EscrowInt {
    address: Promise<string>;
    arbiter: string;
    beneficiary: string;
    value: string;
    approved: boolean;
    handleApprove: () => Promise<void>;
}

const Homepage = () => {
    const [escrows, setEscrows] = React.useState<EscrowInt[]>([]);
    const [account, setAccount] = React.useState();
    const [signer, setSigner] = React.useState<any>();

    const [beneficiary, setBeneficiary] = React.useState<string>('');
    const [arbiter, setArbiter] = React.useState<string>('');
    const [value, setValue] = React.useState<string>('');

    const [approved, setApproved] = React.useState<boolean>(false);

    React.useEffect(() => {
        getAccounts(setAccount, setSigner);
    }, [account]);

    return (
        <div className='w-full flex flex-col gap-8 items-center justify-center p-4'>
            <div className='w-full max-w-[500px] drop-shadow-lg bg-primary rounded-md flex justify-center items-center flex-col p-4 text-primary-foreground gap-4'>
                <h1>New Contract</h1>
                <div className='w-full'>
                    <Label>
                        Arbiter Address
                        <Input placeholder='Enter Arbiter Address ex. "0x..."' type="text" onChange={(e) => setArbiter(e.target.value)} />
                    </Label>
                </div>
                <div className='w-full'>
                    <Label>
                        Beneficiary Address
                        <Input placeholder='Enter Beneficiary Address ex. "0x..."' type="text" onChange={(e) => setBeneficiary(e.target.value)} />
                    </Label>
                </div>
                <div className='w-full'>
                    <Label>
                        Deposit Amount (in ETH)
                        <Input placeholder='Enter Deposit Amount ex. "1 ETH"' type="text" onChange={(e) => (setValue(e.target.value !== '' ?ethers.parseEther(e.target.value).toString() : ''))} />
                    </Label>
                </div>
                <Button variant="secondary" className="w-full" onClick={(e) => {
                    e.preventDefault();
                    if (beneficiary !== '' && arbiter !== '' && value !== '') {
                        newContract(signer, arbiter, beneficiary, value, setApproved, setEscrows, escrows);
                    }
                }}>
                    Deploy Contract
                </Button>
            </div>
            <div className='w-full bg-primary text-primary-foreground rounded-md p-4 flex justify-center items-center flex-col gap-4 max-w-[1400px]'>
                <h1>Existing Contracts</h1>
                <div className='w-full flex flex-wrap gap-4 justify-center items-center'>
                    {escrows.length !== 0 ?
                        escrows.map((escrow, index) => {
                                return <Escrow key={index} {...escrow} />
                        }) : (
                            <h4 className='text-destructive'>
                                No Escrow Contracts
                            </h4>
                        )}
                </div>
            </div>
        </div>
    )
}

export default Homepage