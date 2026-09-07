"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { create } from '../../_actions/paymentActions'
import { useRouter } from 'next/navigation'

const PaymentButton = ({rentalId} : {rentalId:string}) => {
    const router = useRouter()
    const handleClick = async(rentalId: string)=>{
        const url = await create(rentalId)
        console.log(url)
        router.push(url)
    } 
  return (
    <div>
        <Button onClick={()=>handleClick(rentalId)}>
            Pay Now
        </Button>
    </div>
  )
}

export default PaymentButton