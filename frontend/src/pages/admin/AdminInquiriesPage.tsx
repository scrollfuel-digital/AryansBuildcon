import React, { useState, useEffect } from 'react';
import { Inquiry } from '../../types/auth';
import InquiriesTable from '../../components/admin/InquiriesTable';
import AdminLoadingBar from '../../components/admin/AdminLoadingBar';
import { fetchInquiries, updateInquiryStatus, deleteInquiry } from '../../api/contactApi';

export const AdminInquiriesPage: React.FC = () => {
  const [token] = useState<string | null>(localStorage.getItem('adminToken'));
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Fetching inquiries...');
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage(null), 4500);
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!token) return;
    setIsLoading(true);
    setLoadingMessage('Fetching leads & customer inquiries...');
    try {
      const res = await fetchInquiries(token);
      if (res?.data) setInquiries(res.data);
    } catch (err: any) {
      showToast(err?.message || 'Failed to fetch inquiries', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateInquiryStatus = async (id: string, newStatus: string) => {
    if (!token) return;
    setIsLoading(true);
    setLoadingMessage(`Updating lead status to ${newStatus}...`);
    try {
      await updateInquiryStatus(token, id, newStatus);
      showToast(`Inquiry status updated to ${newStatus}`);
      setInquiries((prev) =>
        prev.map((item) => (item._id === id || item.id === id ? { ...item, status: newStatus as any } : item))
      );
    } catch (err: any) {
      showToast(err?.message || 'Failed to update status', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!token) return;
    if (!window.confirm('Are you sure you want to delete this lead record?')) return;
    setIsLoading(true);
    setLoadingMessage('Deleting inquiry record...');
    try {
      await deleteInquiry(token, id);
      showToast('Lead record deleted');
      setInquiries((prev) => prev.filter((item) => item._id !== id && item.id !== id));
    } catch (err: any) {
      showToast(err?.message || 'Failed to delete inquiry', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['Date', 'Name', 'Phone', 'Email', 'Project/Location', 'Status', 'Message'];
    const rows = inquiries.map((i) => [
      new Date(i.createdAt).toLocaleDateString(),
      `"${i.name}"`,
      `"${i.phone}"`,
      `"${i.email}"`,
      `"${i.projectTitle}"`,
      `"${i.status}"`,
      `"${i.message.replace(/"/g, '""')}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `aryans_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.includes(searchQuery) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!token) return null;

  return (
    <div className="space-y-6">
      <AdminLoadingBar
        isLoading={isLoading}
        loadingMessage={loadingMessage}
        statusMessage={statusMessage}
        setStatusMessage={setStatusMessage}
      />

      <InquiriesTable
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        filteredInquiries={filteredInquiries}
        handleExportCSV={handleExportCSV}
        handleUpdateInquiryStatus={handleUpdateInquiryStatus}
        handleDeleteInquiry={handleDeleteInquiry}
      />
    </div>
  );
};

export default AdminInquiriesPage;
