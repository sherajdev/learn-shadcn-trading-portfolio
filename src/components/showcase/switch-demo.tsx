"use client"

import * as React from "react"
import { Switch } from "@/components/ui/switch"
import { Bell, Moon, Airplane, WifiHigh } from "@phosphor-icons/react"

export function SwitchDemo() {
  const [notifications, setNotifications] = React.useState(true)
  const [darkMode, setDarkMode] = React.useState(false)
  const [airplane, setAirplane] = React.useState(false)
  const [wifi, setWifi] = React.useState(true)

  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between p-3 border border-border">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium text-sm">Notifications</p>
            <p className="text-xs text-muted-foreground">
              {notifications ? "Enabled" : "Disabled"}
            </p>
          </div>
        </div>
        <Switch checked={notifications} onCheckedChange={setNotifications} />
      </div>

      <div className="flex items-center justify-between p-3 border border-border">
        <div className="flex items-center gap-3">
          <Moon className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium text-sm">Dark Mode</p>
            <p className="text-xs text-muted-foreground">
              {darkMode ? "On" : "Off"}
            </p>
          </div>
        </div>
        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
      </div>

      <div className="flex items-center justify-between p-3 border border-border">
        <div className="flex items-center gap-3">
          <Airplane className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium text-sm">Airplane Mode</p>
            <p className="text-xs text-muted-foreground">
              {airplane ? "On" : "Off"}
            </p>
          </div>
        </div>
        <Switch checked={airplane} onCheckedChange={setAirplane} />
      </div>

      <div className="flex items-center justify-between p-3 border border-border">
        <div className="flex items-center gap-3">
          <WifiHigh className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="font-medium text-sm">WiFi</p>
            <p className="text-xs text-muted-foreground">
              {wifi ? "Connected" : "Disconnected"}
            </p>
          </div>
        </div>
        <Switch checked={wifi} onCheckedChange={setWifi} />
      </div>
    </div>
  )
}
