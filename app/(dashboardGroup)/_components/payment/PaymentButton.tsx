"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { create } from '../../_actions/paymentActions'
import { useRouter } from 'next/navigation'

const PaymentButton = ({rentalId} : {rentalId:string}) => {
    const [submite, setSubmite] = useState(false)
    const router = useRouter()
    const handleClick = async(rentalId: string)=>{
        setSubmite(true)
        const url = await create(rentalId)
        
        router.push(url)
        
    } 
  return (
    <div>
        <Button onClick={()=>handleClick(rentalId)}
            disabled={submite}>
            {submite ? "Working..." : "Pay Now"}
        </Button>
    </div>
  )
}

export default PaymentButton