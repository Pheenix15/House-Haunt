import { useEffect, useState } from "react";
import axios from "axios";

const Wallet = () => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get("/api/wallet/balance");
        console.log(response.data)

        setBalance(response.data.balance);
        console.log("wallet:", balance)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  if (loading) return <p>Loading balance...</p>;
//   if (error) return <p>{error}</p>;

  return (
    <div className="wallet-section">
      <h2>Wallet</h2>
      <p>Balance: ₦{balance}</p>
    </div>
  );
};

export default Wallet;
