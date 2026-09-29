export interface Contact {
  name: string;
  category: string;
  phone: string;
  email?: string;
  location?: string;
  description?: string;
}

export const REGIONAL_CONTACTS: Contact[] = [
  { name: 'Habibur Rahman', category: 'Management', phone: '+968 9652 2902', email: 'habiburmaruf@gmail.com', location: 'Al Yarmook', description: 'Branch Manager' },
  { name: 'Saleh Omani', category: 'Professional', phone: '+968 9268 4300', location: 'Rustaq', description: 'AlManthari' },
  { name: 'Omani Glass', category: 'Services', phone: '+968 9499 9764', location: 'Barka', description: 'Glass & Mirror Services' },
  { name: 'Abdul Aziz Office', category: 'Enterprise', phone: '24 322996', location: 'Muscat', description: 'General Office' },
  { name: 'Al-Yarmook Modern Trad.', category: 'Enterprise', phone: '+968 9121 3534', location: 'Rustaq', description: 'Modern Trading' },
  { name: 'Ooredoo Support', category: 'Telecom', phone: '+968 22 001511', description: 'Customer Care & Support' },
  { name: 'Basar Driver', category: 'Transport', phone: '+968 9747 2395', description: 'Company Driver' },
  { name: 'Abdul Hannan Steel', category: 'Services', phone: '7708 7055', location: 'Haidar Shop', description: 'Steel Fabrication' },
  { name: 'Akbar Glass', category: 'Services', phone: '9454 4529', description: 'Glass Installation' },
  { name: 'Nama Majan (Electricity)', category: 'Utilities', phone: '9629 9214', description: 'Regional Utility Support' },
  { name: 'Sky Window', category: 'Services', phone: '9536 3511', location: 'Muscat', description: 'Window & Glass Solutions' },
  { name: 'Al Taqdeer Glass', category: 'Industry', phone: '9711 1138', description: 'Glass Tempering Industries' },
  { name: 'Royal Oman Police (ROP)', category: 'Government', phone: '9999', description: 'Emergency Services' },
  { name: 'Ministry of Health', category: 'Government', phone: '24441999', description: 'General Inquiries' },
  { name: 'Muscat Municipality', category: 'Government', phone: '1111', description: 'Civil Services' }
];

export const HOTLINES = [
  { service: 'Emergency (ROP)', number: '9999', icon: 'Shield' },
  { service: 'Civil Defense', number: '9999', icon: 'Flame' },
  { service: 'Ooredoo Support', number: '1500', icon: 'Phone' },
  { service: 'Omantel Support', number: '1234', icon: 'Phone' },
  { service: 'Nama Water', number: '1442', icon: 'Droplets' },
  { service: 'Electricity Support', number: '1011', icon: 'Zap' },
];
