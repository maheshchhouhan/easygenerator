import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-400 to-blue-600">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Welcome to the Application
        </h2>
      </div>
    </>
  );
};

export default Dashboard;
