import axios from 'axios';
import { toast } from 'react-toastify';
import UserService from './UserService';

const apiBaseUrl = UserService.getBaseUrl();

const PaymentService = {
  getAuthConfig: () => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  },

  createAndOpenPayment: async (description, amountInRupees, onSuccess) => {
    try {
      const paymentRequest = {
        amount: Math.round(amountInRupees * 100),
        currency: 'INR',
        receiptId: `receipt_${Date.now()}`
      };

      const response = await axios.post(
        `${apiBaseUrl}/user/payment/order`,
        paymentRequest,
        PaymentService.getAuthConfig()
      );

      const orderData = response.data;

      const options = {
        key: "rzp_test_2si88BIj5nC7Ez",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Raitanna Market",
        description,
        order_id: orderData.id,
        handler: function (rzpResponse) {
          toast.success(`✅ Payment successful! Payment ID: ${rzpResponse.razorpay_payment_id}`, {
            style: { marginTop: '60px' }
          });
          if (onSuccess) onSuccess(rzpResponse);
        },
        prefill: {
          name: "Your Name",
          email: "user@example.com",
          contact: "9703318647"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      toast.error("❌ Failed to create order.", {
        style: { marginTop: '60px' }
      });
    }
  }
};

export default PaymentService;
