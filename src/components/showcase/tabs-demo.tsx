"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Gear, Bell } from "@phosphor-icons/react"

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Account
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Gear className="h-4 w-4" />
          Settings
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Alerts
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="p-4 border border-border mt-2">
        <h4 className="font-medium mb-2">Account Settings</h4>
        <p className="text-sm text-muted-foreground">
          Manage your account details, update your profile information, and configure your preferences.
        </p>
      </TabsContent>
      <TabsContent value="settings" className="p-4 border border-border mt-2">
        <h4 className="font-medium mb-2">General Settings</h4>
        <p className="text-sm text-muted-foreground">
          Configure application settings, themes, language preferences, and other general options.
        </p>
      </TabsContent>
      <TabsContent value="notifications" className="p-4 border border-border mt-2">
        <h4 className="font-medium mb-2">Notification Preferences</h4>
        <p className="text-sm text-muted-foreground">
          Control how and when you receive notifications from the application.
        </p>
      </TabsContent>
    </Tabs>
  )
}
