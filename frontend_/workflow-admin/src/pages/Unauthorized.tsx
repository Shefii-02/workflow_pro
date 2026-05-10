export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-xl rounded-3xl bg-white p-10 shadow-xl text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Unauthorized</h1>
        <p className="text-sm text-gray-600 mb-6">
          You do not have permission to access this page. Please contact your administrator or sign in with an account that has the required access.
        </p>
      </div>
    </div>
  )
}
