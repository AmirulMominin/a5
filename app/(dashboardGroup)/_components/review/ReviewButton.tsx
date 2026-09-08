"use client";

import { useActionState, useEffect, useState } from "react";
import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { reviewAction } from "../../_actions/reviewActions";
import { toast } from "sonner";


// interface ReviewDialogProps {
//   rentalId: string;
// }
interface ReviewDialogProps {
  rentalId: string;
  propertyId: string;
  reviewed : boolean;
}

const ReviewDialog = ( {rentalId,propertyId,reviewed}: ReviewDialogProps ) => {
const [review, setReview] = useState(reviewed) 
const [success, setSuccess] = useState(false) 
  const [rating, setRating] = useState(0);
  const [open, setOpen] = useState(false);

  const [state, action, pending] = useActionState(
    reviewAction.bind(null,rentalId, propertyId),
    null
  );
  useEffect(()=>{
    if(!state) return;
    if(state.success){
        toast.success("You have succssfully give review")
        setOpen(false)
        setSuccess(true)
    }
    console.log(state)
  },[state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* <DialogTrigger >
        <Button size="sm" disabled={success || review}>
          Leave Review
        </Button>
      </DialogTrigger> */}
      <DialogTrigger asChild disabled={success || review}>
  <Button size="sm" disabled={success || review}>
    Leave Review
  </Button>
</DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>

          <DialogDescription>
            Share your experience with this property.
          </DialogDescription>
        </DialogHeader>

        <form action={action} className="space-y-6">
          {/* Rental ID */}
          <input
            type="hidden"
            name="rentalId"
            value={rentalId}
          />

          {/* Rating */}
          <div className="space-y-3">
            <Label>Rating</Label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                 
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Hidden rating field */}
            <input
              type="hidden"
              name="rating"
              value={rating}
            />
          </div>

          {/* Review */}
          <div className="space-y-2">
            <Label htmlFor="review">
              Your Review
            </Label>

            <Textarea
              id="review"
              name="review"
              placeholder="Write your experience..."
              rows={5}
              required
            />
          </div>

          {/* Server Action Response */}
          {state?.message && (
            <p
              className={
                state.success
                  ? "text-sm text-green-600"
                  : "text-sm text-red-600"
              }
            >
              {state.message}
            </p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={pending || rating === 0}
            >
              {pending ? "Submitting..." : "Submit Review"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;