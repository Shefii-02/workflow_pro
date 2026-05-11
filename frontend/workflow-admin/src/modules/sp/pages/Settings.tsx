import React, { useState } from 'react'
import { Save, Lock, Bell, Shield, Zap, Key } from 'lucide-react'
import { PageHeader } from '../../../shared/components/PageComponents'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'
interface SettingItem {
  id: string
  label: string
  type: 'toggle' | 'input' | 'select' | 'textarea'
  value: string | boolean
  options?: { label: string; value: string }[]
  description?: string
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, SettingItem[]>>({
    general: [
      {
        id: 'platform_name',
        label: 'Platform Name',
        type: 'input',
        value: 'Workflow Pro',
        description: 'The name of your platform',
      },
      {
        id: 'platform_url',
        label: 'Platform URL',
        type: 'input',
        value: 'https://workflow.pro',
        description: 'Primary platform domain',
      },
      {
        id: 'support_email',
        label: 'Support Email',
        type: 'input',
        value: 'support@workflow.pro',
        description: 'Email for customer support inquiries',
      },
      {
        id: 'timezone',
        label: 'Default Timezone',
        type: 'select',
        value: 'UTC',
        options: [
          { label: 'UTC', value: 'UTC' },
          { label: 'EST', value: 'EST' },
          { label: 'PST', value: 'PST' },
          { label: 'CET', value: 'CET' },
        ],
      },
    ],
    security: [
      {
        id: 'two_factor_required',
        label: 'Require 2FA for Admin Users',
        type: 'toggle',
        value: true,
        description: 'All admin accounts must use two-factor authentication',
      },
      {
        id: 'password_expiry',
        label: 'Password Expiry (days)',
        type: 'input',
        value: '90',
        description: 'Force password change after this many days',
      },
      {
        id: 'ip_whitelist',
        label: 'IP Whitelist Enabled',
        type: 'toggle',
        value: false,
        description: 'Restrict admin access to specific IP addresses',
      },
      {
        id: 'session_timeout',
        label: 'Session Timeout (minutes)',
        type: 'input',
        value: '30',
        description: 'Automatically logout inactive sessions',
      },
    ],
    notifications: [
      {
        id: 'email_on_signup',
        label: 'Email on New Signup',
        type: 'toggle',
        value: true,
        description: 'Send email notifications for new user registrations',
      },
      {
        id: 'email_on_payment',
        label: 'Email on Payment',
        type: 'toggle',
        value: true,
        description: 'Send email notifications for successful payments',
      },
      {
        id: 'email_on_error',
        label: 'Email on System Errors',
        type: 'toggle',
        value: false,
        description: 'Send email alerts for critical system errors',
      },
      {
        id: 'slack_alerts',
        label: 'Slack Alerts',
        type: 'toggle',
        value: true,
        description: 'Send critical alerts to Slack channel',
      },
    ],
    api: [
      {
        id: 'api_rate_limit',
        label: 'API Rate Limit (req/min)',
        type: 'input',
        value: '1000',
        description: 'Maximum API requests per minute per user',
      },
      {
        id: 'api_timeout',
        label: 'API Request Timeout (sec)',
        type: 'input',
        value: '30',
        description: 'Maximum time to process an API request',
      },
      {
        id: 'cors_enabled',
        label: 'CORS Enabled',
        type: 'toggle',
        value: true,
        description: 'Allow cross-origin requests',
      },
      {
        id: 'api_versioning',
        label: 'API Versioning Strategy',
        type: 'select',
        value: 'url_path',
        options: [
          { label: 'URL Path', value: 'url_path' },
          { label: 'Header', value: 'header' },
          { label: 'Query Param', value: 'query_param' },
        ],
      },
    ],
  })

  const [changed, setChanged] = useState(false)

  const handleSettingChange = (section: string, id: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id ? { ...item, value } : item
      ),
    }))
    setChanged(true)
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving settings:', settings)
    setChanged(false)
  }

  const sections: Record<string, { icon: React.ReactNode; description: string }> = {
    general: { icon: <Zap className="w-5 h-5" />, description: 'General platform settings' },
    security: { icon: <Shield className="w-5 h-5" />, description: 'Security and access control' },
    notifications: { icon: <Bell className="w-5 h-5" />, description: 'Alert and notification preferences' },
    api: { icon: <Key className="w-5 h-5" />, description: 'API configuration and limits' },
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Settings"
        description="Configure platform-wide settings and preferences."
        action={
          <Button
            variant="primary"
            icon={<Save className="w-4 h-4" />}
            onClick={handleSave}
            disabled={!changed}
          >
            {changed ? 'Save Changes' : 'Saved'}
          </Button>
        }
      />

      <div className="space-y-6">
        {Object.entries(settings).map(([sectionKey, sectionSettings]) => (
          <Card key={sectionKey} className="p-4 rounded-lg border border-slate-200">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
              <div className="text-slate-700">
                {sections[sectionKey]?.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 capitalize">{sectionKey} Settings</h3>
                <p className="text-sm text-slate-600">{sections[sectionKey]?.description}</p>
              </div>
            </div>

            <div className="space-y-6">
              {sectionSettings.map((setting) => (
                <div key={setting.id} className="flex items-start justify-between gap-6 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="flex-1 min-w-0">
                    <label className="block text-sm font-semibold text-slate-900 mb-1">
                      {setting.label}
                    </label>
                    {setting.description && (
                      <p className="text-sm text-slate-600">{setting.description}</p>
                    )}
                  </div>

                  <div className="flex-shrink-0 w-64">
                    {setting.type === 'toggle' && (
                      <button
                        onClick={() => handleSettingChange(sectionKey, setting.id, !setting.value)}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                          setting.value
                            ? 'bg-emerald-600'
                            : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                            setting.value ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    )}
                    {setting.type === 'input' && (
                      <input
                        type="text"
                        value={String(setting.value)}
                        onChange={(e) => handleSettingChange(sectionKey, setting.id, e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                      />
                    )}
                    {setting.type === 'select' && (
                      <select
                        value={String(setting.value)}
                        onChange={(e) => handleSettingChange(sectionKey, setting.id, e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                      >
                        {setting.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                    {setting.type === 'textarea' && (
                      <textarea
                        value={String(setting.value)}
                        onChange={(e) => handleSettingChange(sectionKey, setting.id, e.target.value)}
                        rows={4}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 rounded-lg border border-slate-200 bg-slate-50">
        <div className="flex gap-4">
          <Lock className="w-5 h-5 text-slate-700 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">Security Notice</h3>
            <p className="text-sm text-slate-600">
              Changes to security settings will take effect immediately. All active sessions will remain valid until their scheduled expiration.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default SettingsPage
