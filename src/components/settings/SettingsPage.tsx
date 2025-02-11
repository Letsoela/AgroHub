import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Lock, Eye, Globe, Palette } from "lucide-react";

const SettingsPage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-6">
          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Account Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value="user@example.com" readOnly />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input type="tel" placeholder="+27 123 456 789" />
              </div>
              <div className="space-y-2">
                <Label>Language</Label>
                <Input value="English" readOnly />
              </div>
              <div className="space-y-2">
                <Label>Time Zone</Label>
                <Input value="Africa/Johannesburg" readOnly />
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Business Profile</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Business Name</Label>
                <Input placeholder="Enter business name" />
              </div>
              <div className="space-y-2">
                <Label>Business Type</Label>
                <Input placeholder="Enter business type" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Business Address</Label>
                <Input placeholder="Enter business address" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <h3 className="font-semibold">Profile Visibility</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Control who can see your profile
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <h3 className="font-semibold">Activity Status</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Show when you're active
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <h3 className="font-semibold">Two-Factor Authentication</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <Switch />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="font-semibold">Email Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Receive notifications via email
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="font-semibold">Push Notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Receive push notifications
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="font-semibold">Order Updates</h3>
                <p className="text-sm text-muted-foreground">
                  Get notified about order status changes
                </p>
              </div>
              <Switch />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <h3 className="font-semibold">Theme</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Select your preferred theme
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Light
                </Button>
                <Button variant="outline" size="sm">
                  Dark
                </Button>
                <Button variant="outline" size="sm">
                  System
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
