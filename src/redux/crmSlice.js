import { createSlice } from '@reduxjs/toolkit';
import { initialAccounts } from './mockData';

// Realistic reference pools for deterministic contact & lead generation
const FIRST_NAMES = [
  'Rajesh', 'Ananya', 'Vikram', 'Pooja', 'Deepak', 'Sunita', 'Arjun', 'Kavita',
  'Manish', 'Neha', 'Suresh', 'Ritika', 'Alok', 'Divya', 'Harish', 'Meenakshi',
  'Rahul', 'Siddharth', 'Pallavi', 'Kunal', 'Rohan', 'Sneha', 'Amit', 'Priyanka',
  'Nikhil', 'Shreya', 'Gaurav', 'Meera', 'Tarun', 'Aarti',
];

const LAST_NAMES = [
  'Sharma', 'Deshmukh', 'Joshi', 'Bhatt', 'Varma', 'Rao', 'Menon', 'Nair',
  'Pandey', 'Kapoor', 'Mehta', 'Sen', 'Gupta', 'Iyer', 'Chandra', 'Sundaram',
  'Malhotra', 'Roy', 'Chawla', 'Singhania', 'Kulkarni', 'Verma', 'Patel',
];

const JOB_TITLES = [
  'VP of Technology',
  'Head of Procurement',
  'Chief Financial Officer',
  'Operations Director',
  'IT Infrastructure Head',
  'Managing Director',
  'Commercial Operations Lead',
  'Supply Chain Manager',
  'Digital Transformation Lead',
  'Business Development Head',
];

const INDUSTRY_LEAD_TITLES = {
  'Information Technology': 'Enterprise Cloud Migration Suite',
  'Healthcare': 'Hospital & Clinical Management Rollout',
  'Finance': 'Core FinTech Compliance Platform',
  'Retail': 'Omnichannel POS Modernization',
  'Manufacturing': 'Smart Factory IoT Automation',
  'Education': 'Campus Digital LMS Licensing',
  'Real Estate': 'Commercial Property ERP Portal',
  'Logistics': 'Fleet & Warehouse Tracking System',
  'Telecommunications': 'Network Analytics & SLA Upgrade',
  'Hospitality': 'Unified Property Booking Engine',
};

const DEAL_VALUES = [
  '₹6,50,000', '₹9,80,000', '₹12,40,000', '₹15,00,000',
  '₹18,50,000', '₹21,00,000', '₹24,50,000', '₹28,00,000',
];

const LEAD_STAGES = [
  'New', 'Contacted', 'Qualified', 'Proposal Sent', 'Negotiation', 'Closed Won',
];

const LEAD_SOURCES = [
  'Website Form', 'Direct Client', 'Partner Referral', 'LinkedIn Campaign', 'Inbound Call',
];

// Deterministically map 1 primary contact to each of the 99 accounts
export const INITIAL_CONTACTS = initialAccounts.map((account, index) => {
  const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
  const lastName = LAST_NAMES[index % LAST_NAMES.length];
  const name = `${firstName} ${lastName}`;
  const domain = account.website
    ? account.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
    : `${account.accountName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
  const phone = `+91-${9800000000 + ((index * 13749 + 12345) % 199999999)}`;
  const jobTitle = JOB_TITLES[index % JOB_TITLES.length];

  return {
    id: `cnt-${String(index + 1).padStart(3, '0')}`,
    name,
    email,
    phone,
    jobTitle,
    accountId: account.id,
    accountName: account.accountName,
    status: account.status,
  };
});

// Fast lookup map from accountId to primary contact
const contactByAccountId = new Map(
  INITIAL_CONTACTS.map((c) => [c.accountId, c])
);

// Deterministically create 1 active lead for each Active account (66 leads total)
export const INITIAL_LEADS = initialAccounts
  .filter((account) => account.status === 'Active')
  .map((account, index) => {
    const primaryContact = contactByAccountId.get(account.id);
    const titleTemplate =
      INDUSTRY_LEAD_TITLES[account.industry] || 'Enterprise Digital Platform';
    const dealValue = DEAL_VALUES[index % DEAL_VALUES.length];
    const stage = LEAD_STAGES[index % LEAD_STAGES.length];
    const source = LEAD_SOURCES[index % LEAD_SOURCES.length];

    // Formatted recent creation dates (e.g. 2026-11-01 through 2026-11-18)
    const day = String((index % 18) + 1).padStart(2, '0');
    const createdAt = `2026-11-${day}`;

    return {
      id: `lead-${String(101 + index).padStart(3, '0')}`,
      leadTitle: `${titleTemplate} (${account.accountName.split(' ')[0]})`,
      accountId: account.id,
      accountName: account.accountName,
      contactName: primaryContact ? primaryContact.name : 'Primary Contact',
      value: dealValue,
      stage,
      source,
      createdAt,
    };
  });

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
