export default function CartItem({ item, onQuantityChange, onRemove }) {
    return (
      <div className="border p-4 mb-4 rounded-lg flex items-center">
        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
        <div className="flex-1">
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p className="text-green-500">${item.price}</p>
          <div className="flex items-center mt-2">
            <button onClick={() => onQuantityChange(item.id, item.quantity - 1)}>-</button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
              className="w-16 text-center mx-2"
            />
            <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => onRemove(item.id)} className="ml-4 text-red-500">Remove</button>
          </div>
        </div>
      </div>
    );
  }
  