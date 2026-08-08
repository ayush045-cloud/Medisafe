import { useEffect, useState } from "react";
import { getHealthStatus } from "./services/healthService";

function App() {
  const [status, setStatus] = useState("loading");
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    getHealthStatus()
      .then((data) => {
        if (!mounted) return;
        setStatus(data.status === "ok" ? "Connected" : "Unavailable");
        setDetails(data);
      })
      .catch(() => {
        if (!mounted) return;
        setStatus("Disconnected");
        setError("Unable to reach the backend API.");
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white shadow rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Medisafe</h1>
        <p className="text-slate-500 mb-6">Healthcare & Medication Safety System</p>

        <div className="rounded-lg border border-slate-200 p-4">
          <p className="text-sm text-slate-500 mb-1">Backend Status</p>
          <p
            className={
              "text-lg font-semibold " +
              (status === "Connected" ? "text-green-600" : status === "loading" ? "text-slate-500" : "text-red-600")
            }
          >
            {status === "loading" ? "Checking..." : status}
          </p>
          {details?.database && (
            <p className="text-xs text-slate-400 mt-2">Database: {details.database}</p>
          )}
          {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
