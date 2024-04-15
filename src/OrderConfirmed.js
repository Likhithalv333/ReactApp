import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function OrderConfirmed() {
    const { id } = useParams();
    const [confirmationMessage, setConfirmationMessage] = useState('');

    useEffect(() => {
        confirmOrder();
    }, []);

    const confirmOrder = () => {
        // Make an HTTP request to confirm the order
        axios.post(`your_api_endpoint/${id}/confirm`)
            .then(response => {
                // Handle successful confirmation
                setConfirmationMessage("thanks for ordering will get back to you soon...");
            })
            .catch(error => {
                // Handle error
                console.error('Error confirming order:', error);
            });
    };

    return (
        <>
            <div align="center">
                <h3>Order Confirmation</h3>
                <hr/>
                <div style={{ width: '450px', height: '500px', float: 'right' }}>
                    <img src='https://static.vecteezy.com/system/resources/previews/002/107/714/large_2x/order-confirmation-page-concept-vector.jpg' 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ width:'700px', height:'500px', padding:'100px', margin:'10px', color:'black', float:'unset' }}>
                    <FaCheckCircle style={{ color: 'green', fontSize: '4em' }} /> {/* Green tick mark */}
                    <h1>
            Thank you for Ordering, we'll get back to you soon..
        </h1>
                    <h1>{confirmationMessage}</h1>
                </div>
                <hr/>
                <Link to="/" className="btn btn-success">Done</Link>
            </div>
        </>
    );
}

export default OrderConfirmed;
