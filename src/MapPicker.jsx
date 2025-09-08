import MapPicker from './MapPicker';

// state in your page:
const [pickup, setPickup] = useState({ lat: 23.7806, lng: 90.4070 });   // Dhaka default
const [dropoff, setDropoff] = useState(null);

// in JSX:
<label>Pickup Location</label>
<MapPicker value={pickup} onChange={setPickup} height={280} />

<label>Dropoff Location</label>
<MapPicker value={dropoff} onChange={setDropoff} height={280} />

// on submit (e.g., in MakeDelivery / Move):
await supabase.from('deliveries').insert([{
  // ... your existing fields
  pickup_lat: pickup?.lat,
  pickup_lng: pickup?.lng,
  dropoff_lat: dropoff?.lat,
  dropoff_lng: dropoff?.lng,
}])
