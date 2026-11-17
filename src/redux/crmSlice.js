import { createSlice } from '@reduxjs/toolkit';

export const INITIAL_CONTACTS = [
  // Mapped to SE 1 Accounts (acc-0001, 0003, 0005, 0007, 0009, 0011, 0015, 0017)
  {
    id: 'cnt-001',
    name: 'Rajesh Sharma',
    email: 'rajesh.sharma@astratech.example.in',
    phone: '+91-9820112233',
    jobTitle: 'VP of Technology',
    accountId: 'acc-0001',
    accountName: 'Astra Technologies',
    status: 'Active',
  },
  {
    id: 'cnt-002',
    name: 'Ananya Deshmukh',
    email: 'ananya@astratech.example.in',
    phone: '+91-9820223344',
    jobTitle: 'Head of Procurement',
    accountId: 'acc-0001',
    accountName: 'Astra Technologies',
    status: 'Active',
  },
  {
    id: 'cnt-003',
    name: 'Vikram Joshi',
    email: 'v.joshi@cresttech.example.in',
    phone: '+91-9877112233',
    jobTitle: 'Chief Financial Officer',
    accountId: 'acc-0003',
    accountName: 'Crest Technologies',
    status: 'Active',
  },
  {
    id: 'cnt-004',
    name: 'Pooja Bhatt',
    email: 'pooja.b@cresttech.example.in',
    phone: '+91-9877223344',
    jobTitle: 'Finance Director',
    accountId: 'acc-0003',
    accountName: 'Crest Technologies',
    status: 'Active',
  },
  {
    id: 'cnt-005',
    name: 'Deepak Varma',
    email: 'deepak.v@ekatech.example.in',
    phone: '+91-9988112233',
    jobTitle: 'Plant Operations Head',
    accountId: 'acc-0005',
    accountName: 'Eka Technologies',
    status: 'Active',
  },
  {
    id: 'cnt-006',
    name: 'Sunita Rao',
    email: 'sunita@gigatech.example.in',
    phone: '+91-9345112233',
    jobTitle: 'Commercial Real Estate Lead',
    accountId: 'acc-0007',
    accountName: 'Giga Technologies',
    status: 'Inactive',
  },
  {
    id: 'cnt-007',
    name: 'Arjun Menon',
    email: 'arjun.m@iristech.example.in',
    phone: '+91-9567112233',
    jobTitle: 'Network Architect',
    accountId: 'acc-0009',
    accountName: 'Iris Technologies',
    status: 'Active',
  },
  {
    id: 'cnt-008',
    name: 'Kavita Nair',
    email: 'kavita@kiranatech.example.in',
    phone: '+91-9812112233',
    jobTitle: 'IT Director',
    accountId: 'acc-0011',
    accountName: 'Kirana Technologies',
    status: 'Active',
  },
  {
    id: 'cnt-009',
    name: 'Manish Pandey',
    email: 'manish.p@omnitech.example.in',
    phone: '+91-9717112233',
    jobTitle: 'Production Manager',
    accountId: 'acc-0015',
    accountName: 'Omni Technologies',
    status: 'Active',
  },
  {
    id: 'cnt-010',
    name: 'Neha Kapoor',
    email: 'neha.k@quantatech.example.in',
    phone: '+91-9919112233',
    jobTitle: 'Asset Manager',
    accountId: 'acc-0017',
    accountName: 'Quanta Technologies',
    status: 'Active',
  },

  // Mapped to SE 2 Accounts (acc-0002, 0004, 0006, 0008, 0010, 0012, 0014, 0016)
  {
    id: 'cnt-011',
    name: 'Dr. Suresh Mehta',
    email: 'suresh.m@bharattech.example.com',
    phone: '+91-9811112233',
    jobTitle: 'Chief Medical Officer',
    accountId: 'acc-0002',
    accountName: 'Bharat Technologies',
    status: 'Active',
  },
  {
    id: 'cnt-012',
    name: 'Ritika Sen',
    email: 'ritika.s@bharattech.example.com',
    phone: '+91-9811223355',
    jobTitle: 'Healthcare IT Admin',
    accountId: 'acc-0002',
    accountName: 'Bharat Technologies',
    status: 'Active',
  },
  {
    id: 'cnt-013',
    name: 'Alok Gupta',
    email: 'alok.g@dhantech.example.com',
    phone: '+91-9765112233',
    jobTitle: 'Retail Systems Head',
    accountId: 'acc-0004',
    accountName: 'Dhan Technologies',
    status: 'Inactive',
  },
  {
    id: 'cnt-014',
    name: 'Divya Iyer',
    email: 'divya.i@fluenttech.example.com',
    phone: '+91-9123112233',
    jobTitle: 'Dean of Digital Learning',
    accountId: 'acc-0006',
    accountName: 'Fluent Technologies',
    status: 'Active',
  },
  {
    id: 'cnt-015',
    name: 'Harish Chandra',
    email: 'harish@harshatech.example.com',
    phone: '+91-9456112233',
    jobTitle: 'Logistics Fleet Director',
    accountId: 'acc-0008',
    accountName: 'Harsha Technologies',
    status: 'Active',
  },
  {
    id: 'cnt-016',
    name: 'Meenakshi Sundaram',
    email: 'meenakshi@jivatech.example.com',
    phone: '+91-9011112233',
    jobTitle: 'Operations Manager',
    accountId: 'acc-0010',
    accountName: 'Jiva Technologies',
    status: 'Inactive',
  },
  {
    id: 'cnt-017',
    name: 'Dr. Rahul Malhotra',
    email: 'rahul.m@lumintech.example.com',
    phone: '+91-9135112233',
    jobTitle: 'Clinical Research Head',
    accountId: 'acc-0012',
    accountName: 'Lumin Technologies',
    status: 'Active',
  },
  {
    id: 'cnt-018',
    name: 'Siddharth Roy',
    email: 'siddharth@nexustech.example.com',
    phone: '+91-9160112233',
    jobTitle: 'E-commerce Supply Lead',
    accountId: 'acc-0014',
    accountName: 'Nexus Technologies',
    status: 'Active',
  },
  {
    id: 'cnt-019',
    name: 'Pallavi Chawla',
    email: 'pallavi@prernatech.example.com',
    phone: '+91-9185112233',
    jobTitle: 'Academic Coordinator',
    accountId: 'acc-0016',
    accountName: 'Prerna Technologies',
    status: 'Inactive',
  },
  {
    id: 'cnt-020',
    name: 'Kunal Singhania',
    email: 'kunal.s@rashmitech.example.com',
    phone: '+91-9209112233',
    jobTitle: 'Supply Chain VP',
    accountId: 'acc-0018',
    accountName: 'Rashmi Technologies',
    status: 'Active',
  },
];

export const INITIAL_LEADS = [
  // Mapped to SE 1 Accounts
  {
    id: 'lead-101',
    leadTitle: 'Enterprise Cloud Migration 2027',
    accountId: 'acc-0001',
    accountName: 'Astra Technologies',
    contactName: 'Rajesh Sharma',
    value: '₹18,50,000',
    stage: 'Proposal Sent',
    source: 'Website Form',
    createdAt: '2026-11-12',
  },
  {
    id: 'lead-102',
    leadTitle: 'Annual SLA Renewal & Support',
    accountId: 'acc-0001',
    accountName: 'Astra Technologies',
    contactName: 'Ananya Deshmukh',
    value: '₹6,20,000',
    stage: 'Negotiation',
    source: 'Direct Client',
    createdAt: '2026-11-14',
  },
  {
    id: 'lead-103',
    leadTitle: 'Fintech Core Banking API Integration',
    accountId: 'acc-0003',
    accountName: 'Crest Technologies',
    contactName: 'Vikram Joshi',
    value: '₹24,00,000',
    stage: 'Qualified',
    source: 'Partner Referral',
    createdAt: '2026-11-10',
  },
  {
    id: 'lead-104',
    leadTitle: 'Factory Automation IoT Licenses',
    accountId: 'acc-0005',
    accountName: 'Eka Technologies',
    contactName: 'Deepak Varma',
    value: '₹14,50,000',
    stage: 'Contacted',
    source: 'Trade Show',
    createdAt: '2026-11-15',
  },
  {
    id: 'lead-105',
    leadTitle: 'Smart Property Management Portal',
    accountId: 'acc-0007',
    accountName: 'Giga Technologies',
    contactName: 'Sunita Rao',
    value: '₹9,80,000',
    stage: 'New',
    source: 'LinkedIn Campaign',
    createdAt: '2026-11-16',
  },
  {
    id: 'lead-106',
    leadTitle: '5G Fiber Infrastructure Expansion',
    accountId: 'acc-0009',
    accountName: 'Iris Technologies',
    contactName: 'Arjun Menon',
    value: '₹32,00,000',
    stage: 'Closed Won',
    source: 'Direct Client',
    createdAt: '2026-11-08',
  },
  {
    id: 'lead-107',
    leadTitle: 'Kirana Point-of-Sale Cloud Upgrade',
    accountId: 'acc-0011',
    accountName: 'Kirana Technologies',
    contactName: 'Kavita Nair',
    value: '₹7,50,000',
    stage: 'Proposal Sent',
    source: 'Inbound Call',
    createdAt: '2026-11-13',
  },
  {
    id: 'lead-108',
    leadTitle: 'ERP Inventory System Extension',
    accountId: 'acc-0015',
    accountName: 'Omni Technologies',
    contactName: 'Manish Pandey',
    value: '₹11,00,000',
    stage: 'Contacted',
    source: 'Website Form',
    createdAt: '2026-11-16',
  },

  // Mapped to SE 2 Accounts
  {
    id: 'lead-109',
    leadTitle: 'Hospital Management Suite Deployment',
    accountId: 'acc-0002',
    accountName: 'Bharat Technologies',
    contactName: 'Dr. Suresh Mehta',
    value: '₹28,00,000',
    stage: 'Negotiation',
    source: 'Healthcare Expo',
    createdAt: '2026-11-09',
  },
  {
    id: 'lead-110',
    leadTitle: 'Telemedicine Mobile App Modules',
    accountId: 'acc-0002',
    accountName: 'Bharat Technologies',
    contactName: 'Ritika Sen',
    value: '₹8,40,000',
    stage: 'Qualified',
    source: 'Partner Referral',
    createdAt: '2026-11-14',
  },
  {
    id: 'lead-111',
    leadTitle: 'POS Billing Modernization Pilot',
    accountId: 'acc-0004',
    accountName: 'Dhan Technologies',
    contactName: 'Alok Gupta',
    value: '₹5,60,000',
    stage: 'New',
    source: 'Inbound Call',
    createdAt: '2026-11-16',
  },
  {
    id: 'lead-112',
    leadTitle: 'K-12 Interactive LMS Platform',
    accountId: 'acc-0006',
    accountName: 'Fluent Technologies',
    contactName: 'Divya Iyer',
    value: '₹16,00,000',
    stage: 'Proposal Sent',
    source: 'Educational Summit',
    createdAt: '2026-11-11',
  },
  {
    id: 'lead-113',
    leadTitle: 'GPS Warehouse Tracking Solution',
    accountId: 'acc-0008',
    accountName: 'Harsha Technologies',
    contactName: 'Harish Chandra',
    value: '₹21,50,000',
    stage: 'Closed Won',
    source: 'Direct Client',
    createdAt: '2026-11-07',
  },
  {
    id: 'lead-114',
    leadTitle: 'Resort Booking Engine Upgrade',
    accountId: 'acc-0010',
    accountName: 'Jiva Technologies',
    contactName: 'Meenakshi Sundaram',
    value: '₹4,90,000',
    stage: 'Contacted',
    source: 'Website Form',
    createdAt: '2026-11-15',
  },
  {
    id: 'lead-115',
    leadTitle: 'Diagnostic Lab Data Sync Service',
    accountId: 'acc-0012',
    accountName: 'Lumin Technologies',
    contactName: 'Dr. Rahul Malhotra',
    value: '₹19,00,000',
    stage: 'Proposal Sent',
    source: 'Partner Referral',
    createdAt: '2026-11-12',
  },
  {
    id: 'lead-116',
    leadTitle: 'Omnichannel Order Routing Engine',
    accountId: 'acc-0014',
    accountName: 'Nexus Technologies',
    contactName: 'Siddharth Roy',
    value: '₹13,20,000',
    stage: 'Qualified',
    source: 'LinkedIn Campaign',
    createdAt: '2026-11-14',
  },
];

const crmSlice = createSlice({
  name: 'crm',
  initialState: {
    contacts: INITIAL_CONTACTS,
    leads: INITIAL_LEADS,
  },
  reducers: {
    addContact: (state, action) => {
      state.contacts.unshift(action.payload);
    },
    updateContact: (state, action) => {
      const idx = state.contacts.findIndex((c) => c.id === action.payload.id);
      if (idx !== -1) {
        state.contacts[idx] = { ...state.contacts[idx], ...action.payload };
      }
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter((c) => c.id !== action.payload);
    },
    addLead: (state, action) => {
      state.leads.unshift(action.payload);
    },
    updateLead: (state, action) => {
      const idx = state.leads.findIndex((l) => l.id === action.payload.id);
      if (idx !== -1) {
        state.leads[idx] = { ...state.leads[idx], ...action.payload };
      }
    },
    deleteLead: (state, action) => {
      state.leads = state.leads.filter((l) => l.id !== action.payload);
    },
  },
});

export const {
  addContact,
  updateContact,
  deleteContact,
  addLead,
  updateLead,
  deleteLead,
} = crmSlice.actions;

// Select all raw contacts & leads
export const selectAllContacts = (state) => state.crm.contacts;
export const selectAllLeads = (state) => state.crm.leads;

// Row-level scoped contacts based on logged-in user
export const selectScopedContacts = (state) => {
  const user = state.auth?.currentUser;
  const accounts = state.accounts.list;
  const contacts = state.crm.contacts;

  if (!user || user.role === 'admin') {
    return contacts;
  }

  // Set of account IDs mapped to this executive
  const myAccountIds = new Set(
    accounts.filter((acc) => acc.assignedTo === user.label).map((acc) => acc.id)
  );

  return contacts.filter((c) => myAccountIds.has(c.accountId));
};

// Row-level scoped leads based on logged-in user
export const selectScopedLeads = (state) => {
  const user = state.auth?.currentUser;
  const accounts = state.accounts.list;
  const leads = state.crm.leads;

  if (!user || user.role === 'admin') {
    return leads;
  }

  const myAccountIds = new Set(
    accounts.filter((acc) => acc.assignedTo === user.label).map((acc) => acc.id)
  );

  return leads.filter((l) => myAccountIds.has(l.accountId));
};

export default crmSlice.reducer;
