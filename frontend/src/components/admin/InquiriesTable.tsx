import { Search, Filter, Download, Phone, Mail, Trash2 } from 'lucide-react';
import { Inquiry } from './types';

interface InquiriesTableProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  filteredInquiries: Inquiry[];
  handleExportCSV: () => void;
  handleUpdateInquiryStatus: (id: string, status: string) => void;
  handleDeleteInquiry: (id: string) => void;
}

export default function InquiriesTable({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  filteredInquiries,
  handleExportCSV,
  handleUpdateInquiryStatus,
  handleDeleteInquiry,
}: InquiriesTableProps) {
  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#171411] p-4 rounded-2xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, phone, email..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-accent-gold"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-accent-gold" />
            <span className="text-xs text-white/70">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-accent-gold cursor-pointer"
            >
              <option value="All" className="bg-[#171411]">All Statuses</option>
              <option value="New" className="bg-[#171411]">New</option>
              <option value="Contacted" className="bg-[#171411]">Contacted</option>
              <option value="Site Visit Scheduled" className="bg-[#171411]">Site Visit Scheduled</option>
              <option value="Closed" className="bg-[#171411]">Closed</option>
            </select>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-500/30 text-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Inquiries Data Table */}
      <div className="bg-[#171411] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-white/80">
            <thead className="bg-[#1e1a16] text-[10px] font-semibold text-accent-gold uppercase tracking-wider border-b border-white/10">
              <tr>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Project / Corridor</th>
                <th className="p-4">Inquiry Notes</th>
                <th className="p-4">Lead Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredInquiries.length > 0 ? (
                filteredInquiries.map((inq) => (
                  <tr key={inq._id || inq.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium text-cream">
                      <div className="font-semibold text-sm">{inq.name}</div>
                      <div className="text-[10px] text-white/40 font-mono mt-0.5">
                        {new Date(inq.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-1.5 font-mono text-accent-gold">
                        <Phone className="w-3 h-3" />
                        <a href={`tel:${inq.phone}`} className="hover:underline">
                          {inq.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5 text-white/60">
                        <Mail className="w-3 h-3" />
                        <span>{inq.email}</span>
                      </div>
                    </td>
                    <td className="p-4 font-serif text-cream text-xs">
                      <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg inline-block">
                        {inq.projectTitle}
                      </span>
                    </td>
                    <td className="p-4 max-w-xs text-white/70 font-light leading-snug">
                      {inq.message}
                    </td>
                    <td className="p-4">
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleUpdateInquiryStatus(inq._id || inq.id!, e.target.value)
                        }
                        className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border font-sans cursor-pointer ${
                          inq.status === 'New'
                            ? 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                            : inq.status === 'Site Visit Scheduled'
                            ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                            : inq.status === 'Contacted'
                            ? 'bg-blue-950/80 border-blue-500/40 text-blue-300'
                            : 'bg-zinc-800 border-zinc-600 text-zinc-400'
                        }`}
                      >
                        <option value="New" className="bg-[#171411]">New</option>
                        <option value="Contacted" className="bg-[#171411]">Contacted</option>
                        <option value="Site Visit Scheduled" className="bg-[#171411]">Site Visit Scheduled</option>
                        <option value="Closed" className="bg-[#171411]">Closed</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteInquiry(inq._id || inq.id!)}
                        className="p-2 bg-red-950/40 hover:bg-red-900/80 text-red-300 rounded-lg transition-colors cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-white/40 font-light">
                    No customer inquiry leads found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
