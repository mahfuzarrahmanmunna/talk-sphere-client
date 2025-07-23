import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MembershipPage = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();  // Assuming you have user info
    const [error, setError] = useState('');
    const [isPaying, setIsPaying] = useState(false);
    const [isMember, setIsMember] = useState(false);  // Track membership status
    const navigate = useNavigate();

    const amount = 1;  // Assuming the membership fee is $1
    const amountInCent = amount * 100; // Stripe expects the amount in cents

    // Check if the user is a member on component load
    useEffect(() => {
        if (user?.email) {
            // Fetch user membership status from the backend
            axios.get(`http://localhost:3000/users?email=${user.email}`)
                .then(res => {
                    setIsMember(res.data.isMember); // Update the membership status based on backend
                })
                .catch(err => console.error("Error checking membership status:", err));
        }
    }, [user]);

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        // 1. Create payment method
        const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentError) {
            console.error(paymentError);
            setError(paymentError.message);
            return;
        } else {
            setError('');
        }

        // 2. Create payment intent from backend
        const res = await axios.post('http://localhost:3000/create-payment-intent', {
            amountInCent,
            email: user.email,
        });
        const clientSecret = res.data.clientSecret;

        // 3. Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user.displayName || 'Unknown',
                    email: user.email || 'Unknown',
                }
            }
        });

        if (confirmError) {
            console.error(confirmError);
            setError(confirmError.message);
        } else if (paymentIntent.status === 'succeeded') {
            setError('');
            const paymentData = {
                transactionId: paymentIntent.id,
                amount: amount,
                email: user.email,
                createdAt: new Date().toISOString(),
            };

            try {
                const response = await useAxiosSecure.patch(`${user.email}/membership`, {
                    isMember: true,  // Update user to Gold Member
                    badge: 'Gold',
                });

                if (response.data?.message === 'Membership updated successfully') {
                    Swal.fire({
                        title: 'Payment Successful!',
                        text: 'You are now a Gold Member 🎉',
                        icon: 'success',
                        confirmButtonText: 'Awesome!',
                        confirmButtonColor: '#16a34a',
                    });

                    setIsMember(true);  // Update membership status
                    navigate('/dashboard');  // Redirect to the dashboard or relevant page
                }
            } catch (saveErr) {
                console.error('Failed to save payment:', saveErr);
                Swal.fire({
                    title: 'Oops...',
                    text: 'Payment was successful, but we couldn’t save the record. Please contact support.',
                    icon: 'error',
                    confirmButtonText: 'Okay'
                });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <h2 className="text-3xl font-bold mb-4 text-primary">Become a Gold Member</h2>
                <p className="mb-6 text-gray-600">
                    Unlock the full power of Talk Sphere. For just <span className="font-semibold">৳99 / $1</span>, you can post unlimited content and earn a Gold badge!
                </p>

                {isMember ? (
                    // If the user is a member, show this message
                    <div className="text-green-600 font-semibold">
                        You are already a Gold Member 🎉
                    </div>
                ) : (
                    <form onSubmit={handlePayment}>
                        <CardElement />
                        <button
                            type="submit"
                            disabled={!stripe || isPaying || isMember}  // Disable the button if the user is already a member
                            className="mt-6 w-full px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPaying ? "Processing..." : "Pay ৳99 / $1 to Become a Member"}
                        </button>
                        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                    </form>
                )}
            </div>
        </div>
    );
};

export default MembershipPage;
