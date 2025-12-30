
import React from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { INDIAN_STATES } from '../../constants';

interface LoginPageProps {
  onLogin: () => void;
}

const InputField: React.FC<{ label: string; type?: string; placeholder: string; id: string; }> = ({ label, type = 'text', placeholder, id }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <input type={type} id={id} name={id} placeholder={placeholder} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
    </div>
);

const SelectField: React.FC<{ label: string; id: string; children: React.ReactNode }> = ({ label, id, children }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <select id={id} name={id} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md">
            {children}
        </select>
    </div>
);


const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800">Welcome to <span className="text-orange-500">Polytics</span></h1>
            <p className="text-slate-600 mt-2">Connecting Communities, Empowering Voices across India.</p>
        </div>
        <Card className="shadow-2xl">
            <h2 className="text-2xl font-semibold text-center text-slate-700 mb-6">Create Your Profile</h2>
            <p className="text-center text-sm text-slate-500 mb-6">To connect you with the right communities, we need to know a little about you. In this demo, just click "Join Now" to start.</p>
            <form onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField id="name" label="Full Name" placeholder="e.g., Arjun Sharma" />
                    <InputField id="dob" label="Date of Birth" type="date" placeholder="" />
                    <InputField id="religion" label="Religion" placeholder="e.g., Hinduism" />
                    <InputField id="caste" label="Caste" placeholder="e.g., Brahmin" />
                    <SelectField id="state" label="State">
                        <option>Select your state</option>
                        {INDIAN_STATES.map(state => <option key={state} value={state}>{state}</option>)}
                    </SelectField>
                    <InputField id="city" label="City" placeholder="e.g., Mumbai" />
                    <InputField id="school" label="School" placeholder="e.g., Delhi Public School" />
                    <InputField id="college" label="College/University" placeholder="e.g., IIT Bombay" />
                    <div className="md:col-span-2">
                        <InputField id="hobbies" label="Hobbies" placeholder="e.g., Cricket, Reading (comma separated)" />
                    </div>
                     <div className="md:col-span-2">
                        <InputField id="interests" label="Interests" placeholder="e.g., Technology, Politics (comma separated)" />
                    </div>
                </div>
                <div className="mt-8">
                    <Button type="submit" className="w-full text-lg">
                        Join Now & Explore
                    </Button>
                </div>
            </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
