import TrackingMap from './TrackingMap';

<TrackingMap
  orderType="deliveries"    // or "move_request"
  orderId={order.id}
  pickup={{ lat: order.pickup_lat, lng: order.pickup_lng }}
  dropoff={{ lat: order.dropoff_lat, lng: order.dropoff_lng }}
/>
