import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryForm from '../../components/admin/CategoryForm';
import ToolForm from '../../components/admin/ToolForm';
import AdForm from '../../components/admin/AdForm';
import { Category } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { categoryService } from '../../services/categoryService';

type AdminSection = 'categories' | 'tools' | 'ads' | 'analytics';
type ModalType = 'category' | 'tool' | 'ad' | null;

interface DashboardProps {
  categories: Category[];
}

const Dashboard: React.FC<DashboardProps> = ({ categories }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<AdminSection>('categories');
  const [modalType, setModalType] = useState<ModalType>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      setError(null);
      if (modalType === 'category') {
        if (editingItem) {
          await categoryService.updateCategory(editingItem.id, data);
        } else {
          await categoryService.createCategory(data);
        }
        // Reload the page to refresh the data
        window.location.reload();
      }
      // Handle other types (tools, ads) here
      setModalType(null);
      setEditingItem(null);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Don't close the modal or reset state when there's an error
      return;
    }
  };

  const handleCancel = () => {
    setModalType(null);
    setEditingItem(null);
    setError(null);
  };

  const handleEdit = (type: ModalType, item: any) => {
    setModalType(type);
    setEditingItem(item);
    setError(null);
  };

  const handleDelete = async (type: string, id: string) => {
    try {
      setError(null);
      if (type === 'category') {
        await categoryService.deleteCategory(id);
      }
      // Handle other types (tools, ads) here
      // Reload the page to refresh the data
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const renderModal = () => {
    if (!modalType) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          {modalType === 'category' && (
            <CategoryForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialData={editingItem}
            />
          )}
          {modalType === 'tool' && (
            <ToolForm
              categories={categories}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialData={editingItem}
            />
          )}
          {modalType === 'ad' && (
            <AdForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              initialData={editingItem}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">Welcome, Admin</span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <aside className="w-64">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveSection('categories')}
                className={`w-full px-4 py-2 text-left rounded-lg ${
                  activeSection === 'categories'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Categories Management
              </button>
              <button
                onClick={() => setActiveSection('tools')}
                className={`w-full px-4 py-2 text-left rounded-lg ${
                  activeSection === 'tools'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Tools Management
              </button>
              <button
                onClick={() => setActiveSection('ads')}
                className={`w-full px-4 py-2 text-left rounded-lg ${
                  activeSection === 'ads'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Ads Management
              </button>
              <button
                onClick={() => setActiveSection('analytics')}
                className={`w-full px-4 py-2 text-left rounded-lg ${
                  activeSection === 'analytics'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Analytics
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            {activeSection === 'categories' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold dark:text-white">Categories Management</h2>
                  <button 
                    onClick={() => setModalType('category')}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Add New Category
                  </button>
                </div>
                {/* Categories Table */}
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">ID</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Title</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Description</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Tools Count</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {categories.map(category => (
                      <tr key={category.id}>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{category.id}</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{category.title}</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{category.description}</td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{category.tools.length}</td>
                        <td className="px-4 py-2 space-x-2">
                          <button 
                            onClick={() => handleEdit('category', category)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete('category', category.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeSection === 'tools' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold dark:text-white">Tools Management</h2>
                  <button 
                    onClick={() => setModalType('tool')}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Add New Tool
                  </button>
                </div>
                {/* Tools Table */}
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">ID</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Title</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Category</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Description</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {categories.flatMap(category => 
                      category.tools.map(tool => (
                        <tr key={tool.id}>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{tool.id}</td>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{tool.title}</td>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{category.title}</td>
                          <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{tool.description}</td>
                          <td className="px-4 py-2 space-x-2">
                            <button 
                              onClick={() => handleEdit('tool', { ...tool, categoryId: category.id })}
                              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDelete('tool', tool.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeSection === 'ads' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold dark:text-white">Ads Management</h2>
                  <button 
                    onClick={() => setModalType('ad')}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Add New Ad
                  </button>
                </div>
                {/* Ads Table */}
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Name</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Position</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Status</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                    {/* Sample row - replace with actual data */}
                    <tr>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-200">Header Ad</td>
                      <td className="px-4 py-2 text-gray-700 dark:text-gray-200">Header</td>
                      <td className="px-4 py-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Active</span>
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <button 
                          onClick={() => handleEdit('ad', {
                            name: 'Header Ad',
                            position: 'header',
                            isActive: true,
                            code: '<script>...</script>'
                          })}
                          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete('ad', 'header-ad')}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeSection === 'analytics' && (
              <div>
                <h2 className="text-xl font-semibold dark:text-white mb-6">Analytics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Tools</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {categories.reduce((sum, cat) => sum + cat.tools.length, 0)}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Categories</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Ads</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Daily Visitors</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">1.2k</p>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      {renderModal()}
    </div>
  );
};

export default Dashboard; 