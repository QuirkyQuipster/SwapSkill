import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import api from '../services/api';

function SwapRequests() {
  const { user } = useUser();
  const [swapRequests, setSwapRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('incoming'); // 'incoming' or 'outgoing'

  useEffect(() => {
    fetchSwapRequests();
  }, [activeTab]);

  const fetchSwapRequests = async () => {
    try {
      setLoading(true);
      const data = await api.getSwapRequests({ type: activeTab });
      setSwapRequests(data.swapRequests);
      setError(null);
    } catch (err) {
      setError('Failed to load swap requests');
      console.error('Error fetching swap requests:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await api.updateSwapRequest(requestId, { status: newStatus });
      fetchSwapRequests(); // Refresh the list
      alert(`Request ${newStatus} successfully!`);
    } catch (err) {
      alert('Failed to update request: ' + err.message);
    }
  };

  const handleDelete = async (requestId) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await api.deleteSwapRequest(requestId);
        fetchSwapRequests(); // Refresh the list
        alert('Request deleted successfully!');
      } catch (err) {
        alert('Failed to delete request: ' + err.message);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200';
      case 'cancelled':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200';
      default:
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8 transition-colors duration-300">
        <div className="max-w-3xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Loading swap requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-yellow-300">Your Swap Requests</h2>
        
        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('incoming')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'incoming'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Incoming Requests ({swapRequests.filter(r => r.recipient._id === user._id).length})
          </button>
          <button
            onClick={() => setActiveTab('outgoing')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === 'outgoing'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Outgoing Requests ({swapRequests.filter(r => r.requester._id === user._id).length})
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 p-4 rounded mb-6">
            {error}
          </div>
        )}

        {/* Swap Requests List */}
        <div className="space-y-4">
          {swapRequests.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                {activeTab === 'incoming' 
                  ? 'No incoming swap requests.'
                  : 'No outgoing swap requests.'
                }
              </p>
            </div>
          ) : (
            swapRequests.map((request) => {
              const isIncoming = request.recipient._id === user._id;
              const otherUser = isIncoming ? request.requester : request.recipient;
              
              return (
                <div key={request._id} className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-lg font-bold text-gray-700 dark:text-gray-200 overflow-hidden">
                        {otherUser.profilePhoto ? (
                          <img src={otherUser.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          otherUser.name[0]
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{otherUser.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {isIncoming ? 'wants to learn' : 'you want to learn'} <span className="font-medium">{request.requestedSkill}</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          {isIncoming ? 'and offers' : 'and you offer'} <span className="font-medium">{request.offeredSkill}</span>
                        </div>
                        {request.message && (
                          <div className="text-sm text-gray-600 dark:text-gray-300 mt-1 italic">
                            "{request.message}"
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                      <div className="text-xs text-gray-500">
                        {formatDate(request.createdAt)}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {request.status === 'pending' && (
                    <div className="flex gap-2">
                      {isIncoming ? (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(request._id, 'accepted')}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(request._id, 'rejected')}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleDelete(request._id)}
                          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
                        >
                          Cancel Request
                        </button>
                      )}
                    </div>
                  )}

                  {/* Completed Swap Actions */}
                  {request.status === 'accepted' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusUpdate(request._id, 'completed')}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      >
                        Mark as Completed
                      </button>
                    </div>
                  )}

                  {/* Rating Section (for completed swaps) */}
                  {request.status === 'completed' && (
                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded">
                      <h4 className="font-medium mb-2">Rate this swap:</h4>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            className="text-2xl hover:text-yellow-500 transition"
                            onClick={() => {
                              const comment = prompt('Add a comment (optional):');
                              if (comment !== null) {
                                handleStatusUpdate(request._id, 'completed', star, comment);
                              }
                            }}
                          >
                            ⭐
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default SwapRequests;
