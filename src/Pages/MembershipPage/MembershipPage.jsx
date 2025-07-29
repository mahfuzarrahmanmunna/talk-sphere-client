import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import usePageTitle from '../../Hooks/usePageTitle';

const MembershipPage = () => {
    usePageTitle();
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [error, setError] = useState('');
    const [isPaying, setIsPaying] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const amount = 1;
    const amountInCent = amount * 100;

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/single-users?email=${user.email}`)
                .then(res => {
                    setIsMember(res.data.isMember);
                })
                .catch(err => console.error("Error checking membership status:", err));
        }
    }, [user, axiosSecure]);

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!stripe || !elements || isMember) return;

        setIsPaying(true);

        const card = elements.getElement(CardElement);
        if (!card) {
            setError("Card element not found.");
            setIsPaying(false);
            return;
        }

        const { error: paymentError } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (paymentError) {
            setError(paymentError.message);
            setIsPaying(false);
            return;
        }

        try {
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCent,
                email: user.email,
            });

            const clientSecret = res.data.clientSecret;

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
                setError(confirmError.message);
            } else if (paymentIntent.status === 'succeeded') {
                const response = await axiosSecure.patch(`/users/${user.email}/membership`, {
                    isMember: true,
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

                    setIsMember(true);
                    navigate('/dashboard');
                } else {
                    throw new Error('Membership update failed');
                }
            }
        } catch (saveErr) {
            console.error('Failed to process payment:', saveErr);
            Swal.fire({
                title: 'Oops...',
                text: 'Something went wrong. Please contact support.',
                icon: 'error',
                confirmButtonText: 'Okay'
            });
        }

        setIsPaying(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                <h2 className="text-3xl font-bold mb-4 text-primary">Become a Gold Member</h2>
                <p className="mb-6 text-gray-600">
                    Unlock the full power of Talk Sphere. For just <span className="font-semibold">৳99 / $1</span>, you can post unlimited content and earn a Gold badge!
                </p>

                {isMember && (
                    <div className="text-green-600 font-semibold mb-4">
                        You are already a Gold Member 🎉
                    </div>
                )}

                <form onSubmit={handlePayment}>
                    <CardElement />
                    <button
                        type="submit"
                        disabled={!stripe || isPaying || isMember}
                        className="mt-6 w-full px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPaying ? "Processing..." : "Pay ৳99 / $1 to Become a Member"}
                    </button>
                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default MembershipPage;