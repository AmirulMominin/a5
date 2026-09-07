"use client"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { isApplied, requestForRent } from '../../_actions/tenentActions'
import { toast } from 'sonner'

const RequestRentalButton = ({propertyId, applied} : {propertyId:string, applied: boolean}) => {
   const [apply,setApply] = useState(false)
   const [submatting,setSubmatting] = useState(false)
    const handleClick = async(propertyId : string)=>{
        setSubmatting(true)
        const data = await requestForRent(propertyId)
        console.log("line 11",data)
        if(data.success){
            console.log("line 13",data)
            setApply(true)
            toast.success("Rental Request Sent!!")
            setSubmatting(false)
        }else{
            toast.error("Somthing went worong!")
            setSubmatting(false)
        }
        
    }
  return (
    <div>
        <Button onClick={()=>handleClick(propertyId) }
            disabled={applied || apply}
        >{submatting ? "Submatting" : "Rental Request"}
            
        </Button>
    </div>
  )
}

export default RequestRentalButton