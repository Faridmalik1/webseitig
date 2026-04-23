import { CrmLoginForm } from "@/components/crm/crm-login-form";

export default function CrmLoginPage() {
  return (
    <div className="min-h-screen bg-[#171717] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="text-2xl font-black tracking-tight text-white mb-1">
            web<span className="text-[#C8E646]">.</span>seitig
          </div>
          <div className="text-sm text-white/40">CRM - Interner Bereich</div>
        </div>

        <CrmLoginForm />

        <p className="text-center text-white/20 text-xs mt-6">
          Web.Seitig Nur fur autorisierte Mitarbeiter
        </p>
      </div>
    </div>
  );
}
