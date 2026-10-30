import { contourPreston } from "@/data/contour-preston";

export default function SettingsPage() {
  const t = contourPreston;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <h1 className="font-display text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-bf-muted">Business profile for Contour Preston</p>
      </header>

      <form className="space-y-4 rounded-3xl border border-bf-line bg-white/70 p-6">
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Business name</span>
          <input className="field" defaultValue={t.name} readOnly />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Type</span>
          <input className="field" defaultValue={t.type} readOnly />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Slug</span>
          <input className="field" defaultValue={t.slug} readOnly />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Address</span>
          <input className="field" defaultValue={t.address} readOnly />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Phone</span>
          <input className="field" defaultValue={t.phone} readOnly />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Email</span>
          <input className="field" defaultValue={t.email} readOnly />
        </label>
        <label className="block space-y-1.5 text-sm">
          <span className="font-medium">Timezone</span>
          <input className="field" defaultValue={t.timezone} readOnly />
        </label>
        <p className="text-xs text-bf-muted">Read-only demo fields — persistence in Phase 3.</p>
      </form>
    </div>
  );
}
