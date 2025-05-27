import PageHeader from '../components/ui/PageHeader';

const Settings = () => {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Configure your application settings"
      />
      
      <div className="card p-6">
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900">Settings Coming Soon</h3>
          <p className="mt-2 text-gray-500">This feature is under development.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;