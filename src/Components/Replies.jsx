function Replies({ replies, onReplyClick }) {
  // Function to format the time (e.g., "2 days ago")
  const formatTimeAgo = (date) => {
    const now = new Date();
    const replyDate = new Date(date);
    const seconds = Math.floor((now - replyDate) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval > 1) return `${interval} years ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;

    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;

    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;

    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;

    return "just now";
  };

  return (
    <div className="flex items-start space-x-4 p-3 border-gray-200">
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
        {/* Placeholder for user avatar */}
        <span className="text-gray-500 font-semibold">{replies.user.firstName[0]}{replies.user.lastName[0]}</span>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{replies.user.firstName} {replies.user.lastName}</h3>
        <p className="text-gray-600">{replies.reply}</p>
        <div className="flex space-x-3 items-center mt-2">
          <button className="hover:underline text-blue-600" onClick={onReplyClick}>Reply</button>
          <span className="text-gray-500 text-sm">{formatTimeAgo(replies.created_at)}</span>
        </div>
      </div>
    </div>
  );
}

export default Replies;
