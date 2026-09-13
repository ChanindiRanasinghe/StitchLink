"use client";

import { useEffect, useState } from "react";
import { checkBackendHealth } from "../../lib/api";

export default function ApiTestPage() {
  const [message, setMessage] = useState("Checking backend...");
  const [error, setError] = useState("");

  useEffect(() => {
    checkBackendHealth()
      .then((data) => {
        setMessage(`${data.status} - ${data.service}`);
      })
      .catch(() => {
        setError("Unable to connect to the backend.");
      });
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">StitchLink API Test</h1>

        {error ? (
          <p className="mt-4 text-red-600">{error}</p>
        ) : (
          <p className="mt-4">{message}</p>
        )}
      </div>
    </main>
  );
}