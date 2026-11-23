import React, { useState, useEffect } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Avatar } from '../../../components/ui/Avatar';
import { adminApi } from '../services/adminService';
import {
  Users,
  Search,
  CheckCircle,
  Ban,
  X,
  Plus,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff
} from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Suspended'>('All');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Add User Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalName, setModalName] = useState('');
  const [modalEmail, setModalEmail] = useState('');
  const [modalPhone, setModalPhone] = useState('');
  const [modalPassword, setModalPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalCity, setModalCity] = useState('Rajkot');
  const [modalRole, setModalRole] = useState<'user' | 'owner' | 'admin'>('user');
  const [modalGender, setModalGender] = useState<'male' | 'female'>('male');
  const [modalSubmitting, setModalSubmitting] = useState(false);
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState('');

  const fetchUsers = () => {
    setLoading(true);
    adminApi.getUsers().then((data) => {
      setUsers(data || []);
      if (data && data.length > 0) {
        setSelectedUser((prev: any) => {
          if (!prev) return data[0];
          const found = data.find((u: any) => (u.id || u._id) === (prev.id || prev._id));
          return found || data[0];
        });
      }
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenAddModal = () => {
    setModalName('');
    setModalEmail('');
    setModalPhone('');
    setModalPassword('');
    setShowPassword(false);
    setModalCity('Rajkot');
    setModalRole('user');
    setModalGender('male');
    setModalError('');
    setModalSuccess('');
    setShowAddModal(true);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError('');
    setModalSuccess('');

    if (!modalName.trim() || !modalEmail.trim() || !modalPassword.trim()) {
      setModalError('Please enter Name, Email, and Password.');
      return;
    }

    if (modalPassword.length < 6) {
      setModalError('Password must be at least 6 characters.');
      return;
    }

    if (modalPhone.trim()) {
      const cleanPhone = modalPhone.replace(/[\s\-\+\(\)]/g, '');
      if (!/^\d{10}$/.test(cleanPhone) && !/^(91)?\d{10}$/.test(cleanPhone)) {
        setModalError('Please enter a valid 10-digit mobile number.');
        return;
      }
    }

    setModalSubmitting(true);
    try {
      const newUser = await adminApi.createUser({
        name: modalName.trim(),
        email: modalEmail.trim().toLowerCase(),
        password: modalPassword,
        phone: modalPhone.trim(),
        city: modalCity.trim() || 'Rajkot',
        role: modalRole,
        gender: modalGender,
      });

      setModalSuccess('User created successfully in database!');
      setTimeout(() => {
        setShowAddModal(false);
        fetchUsers();
      }, 700);
    } catch (err: any) {
      setModalError(err.response?.data?.message || err.message || 'Failed to create user');
    } finally {
      setModalSubmitting(false);
    }
  };

  const handleToggleStatus = async (userToUpdate: any) => {
    const userId = userToUpdate.id || userToUpdate._id;
    const currentStatus = userToUpdate.status || 'active';
    const nextStatus = currentStatus === 'suspended' ? 'active' : 'suspended';

    try {
      setActionLoading(true);
      await adminApi.updateUserStatus(userId, nextStatus);
      // Immediately reflect in local state and database
      setUsers((prev) =>
        prev.map((u) => {
          if ((u.id || u._id) === userId) {
            return { ...u, status: nextStatus };
          }
          return u;
        })
      );
      if (selectedUser && (selectedUser.id || selectedUser._id) === userId) {
        setSelectedUser({ ...selectedUser, status: nextStatus });
      }
    } catch (err) {
      console.error('Failed to update user status:', err);
      alert('Could not update user status in database.');
    } finally {
      setActionLoading(false);
    }
  };

  const totalUsers = users.length;
  const activeCount = users.filter((u) => (u.status || 'active') === 'active').length;
  const suspendedCount = users.filter((u) => u.status === 'suspended').length;

  const filteredUsers = users.filter((u) => {
    const currentStatus = u.status || 'active';
    if (statusFilter === 'Active' && currentStatus !== 'active') return false;
    if (statusFilter === 'Suspended' && currentStatus !== 'suspended') return false;

    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q)) ||
      (u.role && u.role.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-[#151C27]">
            Manage Users
          </h1>
          <p className="text-xs text-[#555E74] mt-0.5">
            View, inspect, and manage registered explorers and community curators across Gujarat.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" icon={<Plus size={14} />} onClick={handleOpenAddModal}>
            Add New User
          </Button>
        </div>
      </div>

      {/* 4 Metric KPI Cards backed by database counts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Total Users</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">{totalUsers}</span>
          <span className="text-[10px] text-emerald-700 font-semibold">Registered in MongoDB</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Active Users</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">{activeCount}</span>
          <span className="text-[10px] text-[#006765] font-semibold">
            {totalUsers > 0 ? `${Math.round((activeCount / totalUsers) * 100)}% active accounts` : '0%'}
          </span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Suspended Users</span>
          <span className="text-2xl font-bold font-serif text-red-600 block mt-1">{suspendedCount}</span>
          <span className="text-[10px] text-[#555E74]">Restricted from login</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <span className="text-xs text-[#555E74]">Primary Region</span>
          <span className="text-2xl font-bold font-serif text-[#151C27] block mt-1">Rajkot</span>
          <span className="text-[10px] text-[#006765] font-semibold">Gujarat Territory</span>
        </div>
      </div>

      {/* Main Grid: Data Table Left, User Profile Slide-Over Drawer Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table Column (8 Cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="w-full sm:w-72">
              <Input
                placeholder="Search by name, email or role..."
                icon={<Search size={14} />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#555E74]">
              {(['All', 'Active', 'Suspended'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    statusFilter === f ? 'bg-[#006765] text-white shadow-sm' : 'hover:bg-[#F0F3FF]'
                  }`}
                >
                  {f} {f === 'All' ? `(${totalUsers})` : f === 'Active' ? `(${activeCount})` : `(${suspendedCount})`}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-12 text-center text-xs text-[#555E74]">Loading users from MongoDB...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="py-12 text-center text-xs text-[#555E74]">No users found matching filter.</div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[#555E74] font-bold text-[10px] uppercase">
                    <th className="pb-2.5 pl-2">User</th>
                    <th className="pb-2.5">Email</th>
                    <th className="pb-2.5">Role</th>
                    <th className="pb-2.5">City</th>
                    <th className="pb-2.5 pr-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {filteredUsers.map((u) => {
                    const isSuspended = u.status === 'suspended';
                    const isSelected = selectedUser && (selectedUser.id || selectedUser._id) === (u.id || u._id);
                    return (
                      <tr
                        key={u.id || u._id}
                        onClick={() => setSelectedUser(u)}
                        className={`hover:bg-[#F0F3FF] cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#F0F3FF]/70' : ''
                        }`}
                      >
                        <td className="py-3 pl-2">
                          <div className="flex items-center gap-2.5">
                            <Avatar gender={u.gender || (/(aarav|gaurav|bhavik|raviraj|devang|harish|rajesh)/i.test(u.name) ? 'male' : 'female')} size={28} />
                            <div>
                              <span className="font-bold text-[#151C27] block">{u.name}</span>
                              <span className="text-[10px] text-[#555E74] capitalize">{u.role}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-[#555E74]">{u.email}</td>
                        <td className="py-3 text-[#555E74] capitalize">{u.role}</td>
                        <td className="py-3 text-[#555E74]">{u.city || 'Rajkot'}</td>
                        <td className="py-3 pr-2 text-right">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              isSuspended
                                ? 'text-red-700 bg-red-50 border-red-200'
                                : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                            }`}
                          >
                            {isSuspended ? 'Suspended' : 'Active'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Slide-over Profile Drawer (4 Cols) */}
        {selectedUser && (
          <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
              <span className="text-xs font-bold text-[#151C27] uppercase tracking-wider">
                User Profile Details
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  selectedUser.status === 'suspended'
                    ? 'text-red-700 bg-red-50 border-red-200'
                    : 'text-emerald-700 bg-emerald-50 border-emerald-200'
                }`}
              >
                {selectedUser.status === 'suspended' ? 'Suspended' : 'Active'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Avatar
                gender={selectedUser.gender || (/(aarav|gaurav|bhavik|raviraj|devang|harish|rajesh)/i.test(selectedUser.name) ? 'male' : 'female')}
                size={48}
                name={selectedUser.name}
              />
              <div>
                <h3 className="font-bold text-sm text-[#151C27]">{selectedUser.name}</h3>
                <span className="text-[10px] text-[#006765] font-semibold capitalize">{selectedUser.role} Account</span>
              </div>
            </div>

            {/* Detailed Info */}
            <div className="space-y-2 text-xs text-[#555E74] pt-2 border-t border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-[#006765]" />
                <span>{selectedUser.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#006765]" />
                <span>{selectedUser.phone || '+91 98251 44521'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#006765]" />
                <span>{selectedUser.city || 'Rajkot'}, Gujarat</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-[#006765]" />
                <span>
                  Registered: {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : 'Active Member'}
                </span>
              </div>
            </div>

            {/* Direct Status Toggle Action (Updates MongoDB Directly Without Dropdown) */}
            <div className="pt-3 border-t border-[#F1F5F9] space-y-2">
              <Button
                size="sm"
                fullWidth
                variant={selectedUser.status === 'suspended' ? 'outline' : 'danger'}
                disabled={actionLoading}
                onClick={() => handleToggleStatus(selectedUser)}
              >
                {selectedUser.status === 'suspended' ? 'Activate User' : 'Suspend User'}
              </Button>
              <p className="text-[10px] text-[#555E74] text-center">
                {selectedUser.status === 'suspended'
                  ? 'Suspended users are blocked from logging in across the web platform.'
                  : 'Clicking Suspend immediately updates MongoDB and revokes access.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Add New User Modal Dialog */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#F1F5F9] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#CFE7E6]/40 text-[#006765] flex items-center justify-center border border-[#006765]/20">
                  <UserIcon size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#151C27]">Add New User</h3>
                  <p className="text-xs text-[#555E74]">Create a new user account directly in MongoDB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-lg text-[#555E74] hover:bg-[#F1F5F9] hover:text-[#151C27] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateUser} className="p-6 space-y-4 overflow-y-auto">
              {modalError && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 flex items-center gap-2">
                  <Ban size={14} className="shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              {modalSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
                  <CheckCircle size={14} className="shrink-0 text-emerald-600" />
                  <span>{modalSuccess}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-[#151C27] mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="e.g. Priyal Sharma"
                  value={modalName}
                  onChange={(e) => setModalName(e.target.value)}
                  icon={<UserIcon size={16} />}
                  required
                />
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-[#151C27] mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={modalEmail}
                  onChange={(e) => setModalEmail(e.target.value)}
                  icon={<Mail size={16} />}
                  required
                />
              </div>

              {/* Mobile Number & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#151C27] mb-1">
                    Mobile Number
                  </label>
                  <Input
                    placeholder="98251 00000"
                    value={modalPhone}
                    onChange={(e) => setModalPhone(e.target.value)}
                    icon={<Phone size={16} />}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#151C27] mb-1">
                    City / Territory
                  </label>
                  <Input
                    placeholder="Rajkot"
                    value={modalCity}
                    onChange={(e) => setModalCity(e.target.value)}
                    icon={<MapPin size={16} />}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-[#151C27] mb-1">
                  Temporary Password <span className="text-red-500">*</span>
                </label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  value={modalPassword}
                  onChange={(e) => setModalPassword(e.target.value)}
                  icon={<Lock size={16} />}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#555E74] hover:text-[#151C27] focus:outline-none p-1"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                  required
                />
              </div>

              {/* Role & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-[#151C27] mb-1">
                    Account Role
                  </label>
                  <select
                    value={modalRole}
                    onChange={(e: any) => setModalRole(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E2E8F0] bg-white text-[#151C27] focus:outline-none focus:border-[#006765]"
                  >
                    <option value="user">Explorer (User)</option>
                    <option value="owner">Business Owner</option>
                    <option value="admin">Platform Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#151C27] mb-1">
                    Gender (Avatar)
                  </label>
                  <select
                    value={modalGender}
                    onChange={(e: any) => setModalGender(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#E2E8F0] bg-white text-[#151C27] focus:outline-none focus:border-[#006765]"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F1F5F9]">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={modalSubmitting}
                >
                  {modalSubmitting ? 'Saving to Database...' : 'Save & Register User'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
