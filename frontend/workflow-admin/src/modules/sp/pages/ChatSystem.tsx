import { useMemo, useState } from 'react'
import {
  Image,
  Link as LinkIcon,
  MoreHorizontal,
  Paperclip,
  Phone,
  Search,
  Send,
  Smile,
  Video,
} from 'lucide-react'
import { PageHeader } from '../../../shared/components/PageComponents'
import { Badge } from '../../../shared/components/Badge'
import { Button } from '../../../shared/components/Button'
import { Card } from '../../../shared/components/Card'

type Presence = 'online' | 'away' | 'offline'

interface ChatRoom {
  id: string
  name: string
  type: string
  presence: Presence
  lastMessage: string
  lastSeen: string
  unread: number
  typing?: string
}

const chatRooms: ChatRoom[] = [
  {
    id: 'ops',
    name: 'Platform Operations',
    type: 'Internal',
    presence: 'online',
    lastMessage: 'Limiter patch is rolling out to Mumbai edge now.',
    lastSeen: 'now',
    unread: 4,
    typing: 'Alice is typing',
  },
  {
    id: 'acme',
    name: 'Acme Corp Support',
    type: 'Customer',
    presence: 'online',
    lastMessage: 'The temporary exception fixed the 429 errors.',
    lastSeen: '2m',
    unread: 2,
  },
  {
    id: 'billing',
    name: 'Billing Escalations',
    type: 'Finance',
    presence: 'away',
    lastMessage: 'Invoice replay completed for 12 accounts.',
    lastSeen: '14m',
    unread: 0,
  },
  {
    id: 'release',
    name: 'Release Coordination',
    type: 'Engineering',
    presence: 'offline',
    lastMessage: 'QA signed off on the subscription analytics patch.',
    lastSeen: '1h',
    unread: 0,
  },
]

const messages = [
  {
    id: '1',
    author: 'Alice Johnson',
    role: 'SP Admin',
    time: '10:22 AM',
    body: 'The API gateway alert is confirmed. We have two regions seeing elevated burst-limit rejections.',
    mine: false,
  },
  {
    id: '2',
    author: 'You',
    role: 'Platform Lead',
    time: '10:24 AM',
    body: 'Please keep Acme and Global Solutions in the loop. Pin the incident note here once it is ready.',
    mine: true,
  },
  {
    id: '3',
    author: 'System Bot',
    role: 'Automation',
    time: '10:25 AM',
    body: 'Incident INC-1042 linked. Customer-facing status page remains green while mitigation is active.',
    mine: false,
  },
  {
    id: '4',
    author: 'Bob Smith',
    role: 'Support Manager',
    time: '10:29 AM',
    body: 'I attached the affected workspace list and the customer reply draft.',
    mine: false,
  },
]

const attachments = [
  { name: 'affected-workspaces.csv', size: '42 KB', type: 'CSV' },
  { name: 'customer-reply-draft.md', size: '8 KB', type: 'DOC' },
  { name: 'gateway-error-chart.png', size: '318 KB', type: 'IMG' },
]

const presenceClasses: Record<Presence, string> = {
  online: 'bg-emerald-500',
  away: 'bg-amber-500',
  offline: 'bg-slate-300',
}

export default function ChatSystemPage() {
  const [selectedRoomId, setSelectedRoomId] = useState(chatRooms[0].id)
  const [searchTerm, setSearchTerm] = useState('')

  const selectedRoom = chatRooms.find((room) => room.id === selectedRoomId) ?? chatRooms[0]
  const filteredRooms = useMemo(
    () => chatRooms.filter((room) => room.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [searchTerm],
  )

  return (
    <div className="space-y-5">
      <PageHeader
        title="Realtime Chat"
        description="Internal operations chat, customer support rooms, unread queues, presence, typing states, and shared attachments."
        action={<Button variant="primary">New Room</Button>}
      />

      <div className="grid min-h-[760px] gap-6 xl:grid-cols-[340px_1fr_300px]">
        <Card className="flex min-h-0 flex-col p-0">
          <div className="border-b border-slate-200 p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search chats"
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-400"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3">
            {filteredRooms.map((room) => (
              <button
                key={room.id}
                type="button"
                onClick={() => setSelectedRoomId(room.id)}
                className={`mb-2 flex w-full items-start gap-3 rounded-xl p-3 text-left transition ${
                  room.id === selectedRoomId ? 'bg-brand-50 ring-1 ring-brand-100' : 'hover:bg-slate-50'
                }`}
              >
                <span className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-slate-100 font-semibold text-slate-700">
                  {room.name.slice(0, 2).toUpperCase()}
                  <span className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white ${presenceClasses[room.presence]}`} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate font-semibold text-slate-950">{room.name}</span>
                    <span className="text-xs text-slate-400">{room.lastSeen}</span>
                  </span>
                  <span className="mt-1 flex items-center gap-2">
                    <Badge variant="outline" size="sm">{room.type}</Badge>
                    {room.unread > 0 && <span className="rounded-full bg-rose-500 px-2 py-0.5 text-xs font-semibold text-white">{room.unread}</span>}
                  </span>
                  <span className="mt-2 block truncate text-sm text-slate-500">{room.typing ?? room.lastMessage}</span>
                </span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="flex min-h-0 flex-col p-0">
          <div className="flex items-center justify-between border-b border-slate-200 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 font-semibold text-brand-700">
                {selectedRoom.name.slice(0, 2).toUpperCase()}
                <span className={`absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white ${presenceClasses[selectedRoom.presence]}`} />
              </span>
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold text-slate-950">{selectedRoom.name}</h2>
                <p className="text-sm text-slate-500">
                  {selectedRoom.presence === 'online' ? 'Online now' : selectedRoom.presence === 'away' ? 'Away' : 'Offline'} · {selectedRoom.type}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
                <Phone className="h-4 w-4" />
              </button>
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
                <Video className="h-4 w-4" />
              </button>
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto bg-slate-50/70 p-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.mine ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[78%] rounded-lg p-4 shadow-sm ${message.mine ? 'bg-brand-600 text-white' : 'bg-white text-slate-800'}`}>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="font-semibold">{message.author}</span>
                    <span className={message.mine ? 'text-xs text-brand-100' : 'text-xs text-slate-400'}>{message.role}</span>
                    <span className={message.mine ? 'text-xs text-brand-100' : 'text-xs text-slate-400'}>{message.time}</span>
                  </div>
                  <p className="text-sm leading-6">{message.body}</p>
                </div>
              </div>
            ))}

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="flex gap-1 rounded-full bg-white px-3 py-2 shadow-sm">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:120ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:240ms]" />
              </span>
              {selectedRoom.typing ?? 'Support team is reviewing the thread'}
            </div>
          </div>

          <div className="border-t border-slate-200 p-4">
            <div className="rounded-xl border border-slate-200 bg-white p-3">
              <textarea
                className="h-20 w-full resize-none border-0 text-sm outline-none"
                placeholder={`Message ${selectedRoom.name}`}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-500">
                  <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100"><Paperclip className="h-4 w-4" /></button>
                  <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100"><Image className="h-4 w-4" /></button>
                  <button className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100"><Smile className="h-4 w-4" /></button>
                </div>
                <Button variant="primary" icon={<Send className="h-4 w-4" />}>Send</Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-slate-950">Room Status</h3>
          <div className="mt-5 space-y-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Online members</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">18</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Unread messages</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">{chatRooms.reduce((sum, room) => sum + room.unread, 0)}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Response target</p>
              <p className="mt-2 text-xl font-semibold text-slate-950">5m</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-slate-950">Attachments</h3>
            <div className="mt-4 space-y-3">
              {attachments.map((attachment) => (
                <div key={attachment.name} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                    <LinkIcon className="h-4 w-4 text-slate-600" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-slate-950">{attachment.name}</span>
                    <span className="text-xs text-slate-500">{attachment.type} · {attachment.size}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
