import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Accounts from './pages/Accounts';
import Contacts from './pages/Contacts';
import Leads from './pages/Leads';
import Login from './pages/Login';
import Placeholder from './pages/Placeholder';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="account-report" element={<Placeholder title="Account Report" description="Live analytics derived from your account dataset." />} />
          <Route path="account-upload" element={<Placeholder title="Account Upload" description="Import account records from a CSV file. Preview and validate before importing." />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="leads" element={<Leads />} />
          <Route path="deals" element={<Placeholder title="Deal" description="Monitor your deal pipeline and revenue opportunities." />} />
          <Route path="profile" element={<Placeholder title="Profile" description="Personal, education, experience, and other details." />} />
          <Route path="inbox" element={<Placeholder title="Inbox" description="Your messages and notifications will appear here." />} />
          <Route path="my-jobs" element={<Placeholder title="My Jobs" description="Track your active job applications and assignments." />} />
          <Route path="test-results" element={<Placeholder title="Test Results" description="View your assessment scores and test history." />} />
          <Route path="*" element={<Placeholder title="Page Not Found" description="The page you requested does not exist." />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
