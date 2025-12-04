import { useEffect, useState } from "react";
import axios from "axios";
import "../Wallet.css"

const Wallet = ({setLoading}) => {
  const [balance, setBalance] = useState(null);
  const [topUpModal, setTopUpModal] = useState(false)
  const [failAlert, setFailAlert] = useState("")
  const [topUpAmount, setTopUpAmount] = useState("")

  useEffect(() => {
    setLoading(true)
    const fetchBalance = async () => {
      try {
        const response = await axios.get("/api/wallet");
        console.log(response.data)

        const wallet = response.data
        setBalance(wallet.balance);
        console.log("wallet:", wallet.balance)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [setLoading]);

  // Topup Wallet
  
  const topUpWallet = async () => {
    try {
      const topUp = await axios.post("/api/wallet/topup", {topUpAmount});

      // Update Balance
      setBalance((prev) => Number(prev) + Number(topUpAmount));


      console.log(topUp.data)
      setTopUpModal(false)
      setTopUpAmount("")
    } catch (error) {
      console.log("Failed to topup wallet:", error)
      setFailAlert("Failed to topup wallet")

      setTimeout(() => {
        setFailAlert("")
      }, 3000);
    } finally {
      setTopUpModal(false)
      setTopUpAmount("")
    }
  }

//   if (error) return <p>{error}</p>;

  return (
    <div className="wallet-section">
      <div className="wallet-heading">
        <h2>Wallet</h2>

        <div className="wallet-top-up">
          <button className="button top-up-button"
            onClick={() => setTopUpModal(true)}
          >
            Fund Wallet
          </button>
        </div>
      </div>

      <div className="wallet-body">
        <p>Balance: ₦{balance}</p>
      </div>
      
      {/* TopUp Modal */}
      {topUpModal && (
        <div className="topup-modal">
          <form onSubmit={(e) => { e.preventDefault(); topUpWallet(); }} className="top-up-form" >
            <label htmlFor="amount">Topup Amount</label>
            <input 
              type="number" 
              name="amount" 
              id="amount" 
              value={topUpAmount}
              onChange={(e) => setTopUpAmount(e.target.value)}
            />

            <button type="submit" className="topup-button">TopUp</button>
          </form>
        </div>
      )}
      
      
    </div>
  );
};

export default Wallet;
