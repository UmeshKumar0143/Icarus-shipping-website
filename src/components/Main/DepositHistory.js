import React, { useEffect, useState } from "react";
import axios from "axios";

const DepositHistory = ({ userId }) => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepositHistory = async () => {
      try {
        const response = await axios.get(`/api/payment/payment-history/${userId}`);
        setDeposits(response.data.payments);
      } catch (err) {
        setError("Failed to load deposit history");
        console.error("Error fetching deposit history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepositHistory();
  }, [userId]);

  if (loading) return <p>Loading deposit history...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="deposit-history-container p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Deposit History</h2>
      {deposits.length === 0 ? (
        <p>No deposits found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Date</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Method</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((deposit) => (
              <tr key={deposit._id} className="text-center">
                <td className="border p-2">{new Date(deposit.date).toLocaleString()}</td>
                <td className="border p-2">{deposit.amount} BTC</td>
                <td className="border p-2">{deposit.paymentMethod}</td>
                <td className={`border p-2 font-semibold ${deposit.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}>
                  {deposit.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DepositHistory;
