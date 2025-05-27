import PageHeader from '../components/ui/PageHeader';

const Profile = () => {
  return (
    <div>
      <PageHeader
        title="Your Profile"
        description="Manage your account information"
      />
      
      <div className="card p-6">
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-gray-900">Profile Management Coming Soon</h3>
          <p className="mt-2 text-gray-500">This feature is under development.</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;