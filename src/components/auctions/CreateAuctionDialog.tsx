import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus } from "lucide-react";

interface CreateAuctionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateAuctionDialog = ({
  open,
  onOpenChange,
}: CreateAuctionDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Auction</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 space-y-2">
            <Label>Title</Label>
            <Input placeholder="Enter auction title" />
          </div>

          <div className="col-span-2 space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Describe your livestock or produce" />
          </div>

          <div className="space-y-2">
            <Label>Starting Price</Label>
            <Input type="number" placeholder="0.00" />
          </div>

          <div className="space-y-2">
            <Label>Reserve Price (Optional)</Label>
            <Input type="number" placeholder="0.00" />
          </div>

          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input type="datetime-local" />
          </div>

          <div className="space-y-2">
            <Label>End Date</Label>
            <Input type="datetime-local" />
          </div>

          <div className="col-span-2">
            <Label>Images</Label>
            <div className="mt-2 border-2 border-dashed rounded-lg p-4 text-center">
              <Button variant="outline" className="w-full">
                <ImagePlus className="w-4 h-4 mr-2" /> Upload Images
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>Create Auction</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAuctionDialog;
