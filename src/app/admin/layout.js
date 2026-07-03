const AdminLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-100">
            <main className="flex-1 overflow-y-auto p-6">
                {children}
            </main>
        </div>
    );
}

export default AdminLayout