"use client";

import { useActionState, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createNewProperty } from "../../_actions/landloardActions";
import { toast } from "sonner";


const AddPropertyDialog = () => {
  const [open, setOpen] = useState(false);
  const [state,action,pending] = useActionState(createNewProperty, null)

//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     price: "",
//     area: "",
//     type: "",
//     location: "",
//     image: "",
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log(formData);

//     // Later:
//     // call POST /api/landlord/properties here

//     setOpen(false);
//   };

useEffect(()=>{
  if(!state) return;
  console.log("56", state)
  if(state.success){
    toast.success("Prooperp created")
    setTimeout(() => {
      setOpen(false);
    }, 0);


  }else if(!state.success){
    
    console.log("Erro line 62")
  }
},[state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger >
        <Button>+ Add Property</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
          <DialogDescription>
            Enter the details of your property below.
          </DialogDescription>
        </DialogHeader>

        <form  action={action} className="space-y-4">
          {/* Property Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Property Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Modern 2 Bedroom Apartment"
             
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your property..."
              
              required
            />
          </div>

          {/* Price + Area */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Monthly Rent</Label>
              <Input
                id="price"
                name="rent"
                type="number"
                placeholder="25000"
                
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Area (sq ft)</Label>
              <Input
                id="area"
                name="area"
                type="number"
                placeholder="1200"
                
                required
              />
            </div>
          </div>

          {/* Type */}
          {/* <div className="space-y-2">
            <Label htmlFor="type">Property Type</Label>
            <Input
              id="type"
              name="type"
              placeholder="e.g. Apartment"
              
              required
            />
          </div> */}


         {/* Property Type Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="type">Property Type</Label>
            <Select name="type" required>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select Property Type" />
              </SelectTrigger>
              <SelectContent >
                <SelectItem value="HOUSE">HOUSE</SelectItem>
                <SelectItem value="FLAT">FLAT</SelectItem>
                <SelectItem value="PLOT">PLOT</SelectItem>
              </SelectContent>
            </Select>

            {/* Hidden Input to ensure 'type' is sent with FormData */}
            <input  name="type"  />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g. Mirpur, Dhaka"
              
              required
            />
          </div>

          {/* Image */}
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              placeholder="https://example.com/property.jpg"
              
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit">Add Property</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPropertyDialog;