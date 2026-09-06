"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { requestsDecision } from '../../_actions/landloardActions'
import { toast } from 'sonner'

const StatusButton = ({rentalId} : {rentalId:string}) => {
    const handleButton = async(status: string)=>{
        const result = await requestsDecision(status, rentalId)
        console.log("line 10",result)
        console.log("line 10",result.success)
        if(result.success && status === "APPROVE"){
            toast.success("You have accept this request")
        }
        else if(result.success && status === "REJECT"){
            toast.error("You have reject this request")
        }
    }
  return (
    <div>
        <Button onClick={()=>handleButton("APPROVE")}>
            Accept
        </Button>
        <Button onClick={()=>handleButton("REJECT")}>
            Reject
        </Button>
    </div>
  )
}

export default StatusButton