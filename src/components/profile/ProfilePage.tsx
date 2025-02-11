import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/AuthContext";
import { MapPin, Globe, Phone, Mail, Building2 } from "lucide-react";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card className="p-6">
        <div className="flex items-start gap-6">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user?.avatar} />
          </Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user?.name}</h1>
            <p className="text-muted-foreground capitalize">{user?.role}</p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>AgroFresh Enterprises</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Cape Town, South Africa</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="h-4 w-4" />
                <a href="#" className="hover:underline">
                  www.agrofresh.com
                </a>
              </div>
            </div>
          </div>
          <Button>Edit Profile</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Contact Information</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Input value={user?.email} readOnly />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <Input value="+27 123 456 789" readOnly />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Business Details</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Business Type</Label>
              <Input value={user?.role} readOnly className="capitalize" />
            </div>
            <div className="space-y-2">
              <Label>Business Description</Label>
              <Textarea
                value="Leading supplier of fresh organic produce in the Western Cape region. Specializing in sustainable farming practices and direct farm-to-table distribution."
                readOnly
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4 md:col-span-2">
          <h2 className="text-lg font-semibold">Activity Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-700">28</h3>
              <p className="text-sm text-muted-foreground">Active Listings</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-700">156</h3>
              <p className="text-sm text-muted-foreground">Completed Orders</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-700">4.8/5</h3>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
