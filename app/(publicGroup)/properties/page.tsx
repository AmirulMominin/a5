import React from 'react'
import { getAllProperties } from '../_actions/getAllProperties'
import CardComponent from '../_components/CardComponent'
import { PropertiesType } from '@/types/types'

const page = async() => {
    const data = await getAllProperties()
    console.log("properties", data)
  return (
    <div>
        <h2>Properties Page</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {
            data.data.map((property : PropertiesType)=><CardComponent key={property.id} property={property}></CardComponent>)
        }
        </div>
    </div>

  )
}

export default page