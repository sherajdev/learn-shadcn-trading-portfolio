export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="space-y-6">
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Account</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-muted-foreground">Not configured</p>
            </div>
          </div>
        </div>
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Use dark theme</p>
              </div>
              <input type="checkbox" className="toggle" />
            </div>
          </div>
        </div>
        <div className="p-6 bg-card rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">Data & Integrations</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Convex</p>
              <p className="text-sm text-muted-foreground">Backend initialized</p>
            </div>
            <div>
              <p className="font-medium">Cloudflare</p>
              <p className="text-sm text-muted-foreground">Deployment configured</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
