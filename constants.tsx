
import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  User as UserIcon, 
  Settings, 
  PlusCircle, 
  LogOut,
  Edit,
  Trash2,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const MOCK_USERS: any[] = [
  { id: 1, name: 'Admin User', role: 'admin', username: 'admin', email: 'admin@dukaloco.com' },
  { id: 2, name: 'Standard User', role: 'user', username: 'jdoe', email: 'jdoe@dukaloco.com' }
];

// Configuration for app behavior and API client
/* Fix: Added APP_CONFIG which was missing in constants.tsx but required by index.tsx */
export const APP_CONFIG = {
  STALE_TIME: 1000 * 60 * 5, // 5 minutes
  RETRY_COUNT: 2,
};

export const ICONS = {
  Dashboard: <LayoutDashboard className="w-5 h-5" />,
  Posts: <FileText className="w-5 h-5" />,
  Profile: <UserIcon className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
  Plus: <PlusCircle className="w-5 h-5" />,
  Logout: <LogOut className="w-5 h-5" />,
  Edit: <Edit className="w-4 h-4" />,
  Delete: <Trash2 className="w-4 h-4" />,
  Next: <ChevronRight className="w-4 h-4" />,
  Stats: <TrendingUp className="w-5 h-5" />
};
