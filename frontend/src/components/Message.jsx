const Message = ({ username, body }) => (
  <div className="text-break mb-2">
    <b>{username}</b>
    {': '}
    {body}
  </div>
);

export default Message;
