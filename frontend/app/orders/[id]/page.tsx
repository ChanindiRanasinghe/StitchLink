// frontend/app/orders/[id]/page.tsx
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  getOrderDetails, 
  updateOrderStatus, 
  getOrderMessages, 
  sendMessage, 
  submitReview,
  Order, 
  Message 
} from '@/lib/api';

const STEPS = ['OPEN', 'ASSIGNED', 'IN_PRODUCTION', 'COMPLETED', 'DELIVERED'];

export default function OrderDetailPage() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-600">Loading order...</div>}>
      <OrderDetailContent />
    </Suspense>
  );
}

function OrderDetailContent() {
  const params = useParams();
  const orderId = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  // Review form states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderId) return;

    // Load order details and messages concurrently
    Promise.all([
      getOrderDetails(orderId),
      getOrderMessages(orderId).catch(() => []) // Fallback to empty list if no messages exist yet
    ])
      .then(([orderData, messagesData]) => {
        setOrder(orderData);
        setMessages(messagesData);
      })
      .catch((err) => setError(err.message || 'Failed to load order details.'))
      .finally(() => setLoading(false));
  }, [orderId]);

  const handleStatusChange = async (nextStatus: string) => {
    if (!order) return;
    try {
      const updated = await updateOrderStatus(order.id, nextStatus);
      setOrder(updated);
    } catch (err: any) {
      alert(err.message || 'Failed to update order status.');
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !order) return;

    try {
      const sent = await sendMessage(order.id, newMessage);
      setMessages((prev) => [...prev, sent]);
      setNewMessage('');
    } catch (err: any) {
      alert(err.message || 'Failed to send message.');
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!order) return;

    try {
      await submitReview({
        order_id: order.id,
        reviewee_id: order.dressmaker_id,
        rating: Number(rating),
        stitching_quality_rating: Number(rating),
        timeliness_rating: Number(rating),
        comment: comment.trim() || undefined,
      });
      setReviewSubmitted(true);
      alert('Thank you! Your review has been submitted successfully.');
    } catch (err: any) {
      alert(err.message || 'Error submitting review.');
    }
  };

  if (loading) return <div className="p-8 text-gray-600">Loading order...</div>;
  if (error || !order) return <div className="p-8 text-red-500">Error: {error || 'Order not found'}</div>;

  const currentIdx = STEPS.indexOf(order.status);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Order Overview Card */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{order.title}</h1>
            <p className="text-gray-500 mt-1">{order.description || 'No additional description provided.'}</p>
          </div>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            {order.status}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <span className="text-xs text-gray-400 block font-medium">Category</span>
            <span className="font-semibold text-gray-800">{order.category}</span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block font-medium">Quantity</span>
            <span className="font-semibold text-gray-800">{order.quantity} pcs</span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block font-medium">Target Budget</span>
            <span className="font-semibold text-gray-800">
              LKR {order.target_budget_lkr ? order.target_budget_lkr.toLocaleString() : 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-400 block font-medium">District</span>
            <span className="font-semibold text-gray-800">{order.location_district || 'N/A'}</span>
          </div>
        </div>
      </div>

      {/* Production Status Stepper */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-6">Production Status Tracker</h2>
        
        <div className="flex items-center justify-between">
          {STEPS.map((step, idx) => {
            const isDone = idx <= currentIdx;
            return (
              <div key={step} className="flex-1 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  isDone ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {idx + 1}
                </div>
                <span className="text-xs mt-2 font-medium text-gray-600">{step}</span>
              </div>
            );
          })}
        </div>

        {/* Status Transition Action Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          {order.status === 'ASSIGNED' && (
            <button
              onClick={() => handleStatusChange('IN_PRODUCTION')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              Start Sewing (IN_PRODUCTION)
            </button>
          )}
          {order.status === 'IN_PRODUCTION' && (
            <button
              onClick={() => handleStatusChange('COMPLETED')}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
            >
              Mark Batch Completed
            </button>
          )}
          {order.status === 'COMPLETED' && (
            <button
              onClick={() => handleStatusChange('DELIVERED')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition"
            >
              Confirm Delivery Received
            </button>
          )}
        </div>
      </div>

      {/* Review Section (Displays when order reaches DELIVERED status) */}
      {order.status === 'DELIVERED' && !reviewSubmitted && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Leave a Dressmaker Review</h2>
          <p className="text-sm text-gray-500 mb-4">
            Order completed and delivered! Share feedback about stitch quality and punctuality.
          </p>

          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value={5}>5 Stars - Excellent Quality</option>
                <option value={4}>4 Stars - Good Work</option>
                <option value={3}>3 Stars - Average Quality</option>
                <option value={2}>2 Stars - Needs Improvement</option>
                <option value={1}>1 Star - Unsatisfactory</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Feedback Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
                className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}

      {/* Order Discussion & Messaging Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Order Discussion</h2>
        
        <div className="h-64 overflow-y-auto border rounded-lg p-4 bg-gray-50 space-y-3 mb-4">
          {messages.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">
              No messages yet. Start the conversation regarding measurements, fabric, or delivery!
            </p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="bg-white p-3 rounded shadow-sm border border-gray-100">
                <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                  <span className="font-semibold text-gray-700">{msg.sender_name}</span>
                  <span>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-sm text-gray-800">{msg.content}</p>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message regarding sample sizes, adjustments, or shipping..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}