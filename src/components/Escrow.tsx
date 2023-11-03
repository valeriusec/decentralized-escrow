import React from 'react';
import { EscrowInt } from './Homepage';
import { Button } from './ui/button';
import { ethers } from 'ethers';

const Escrow = (props: EscrowInt) => {
    return (
        <div className='bg-secondary text-secondary-foreground flex justify-center items-center w-fit flex-col gap-4 p-4 rounded-md'>
            <ul className='w-full flex flex-col gap-2 justify-center items-center text-center'>
                <li className="flex flex-col gap-1 justify-center items-center text-center p-2 bg-primary/70 rounded-md w-full">
                    <span className='font-medium'>Arbiter</span>
                    <span className='break-words'>{props.arbiter}</span>
                </li>
                <li className="flex flex-col gap-1 justify-center items-center text-center p-2 bg-primary/70 rounded-md w-full">
                    <span className='font-medium'>Beneficiary </span>
                    <span className='break-words'>{props.beneficiary} </span>
                </li>
                <li className="flex flex-col gap-1 justify-center items-center text-center p-2 bg-primary/70 rounded-md w-full">
                    <span className='font-medium'>Value </span>
                    <span className='break-words'>{(Number(props.value) / 1e18).toString()} ETH</span>
                </li>
            </ul>
            {
                props.approved !== true ? (
                    <Button className='w-full' onClick={(e) => {
                        e.preventDefault();
                        props.handleApprove();
                    }}>
                        Approve Escrow
                    </Button>
                ) : (
                    <Button disabled className='w-full'>
                        Escrow Approved
                    </Button>)
            }
        </div>
    )
}

export default Escrow