import User from "./User";

export default interface Article {
  id: number;
  title: string;
  description: string;
  donation_description: string;
  collection: {
    id: number;
  };
  section: string;
  location: {
    latitude: number;
    longitude: number;
    distance: number;
    town: string;
    country: string;
  };
  collection_notes: string;
  value: {
    price: number;
    currency: string;
    payment_type: string;
  };
  created_at: string;
  updated_at: string;
  status: string;
  expiry: string;
  reactions: {
    likes: number;
    by_user: boolean;
    views: number;
    impressions: number;
  };
  is_owner: boolean;
  conversations: {
    linked: number;
    request_id: number | null;
  };
  photos: {
    uid: string;
    files: {
      original: string;
      large: string;
      medium: string;
      small: string;
    };
    dimensions: {
      width: number;
      height: number;
    };
  }[];
  images: {
    uid: string;
    files: {
      original: string;
      large: string;
      medium: string;
      small: string;
    };
    dimensions: {
      width: number;
      height: number;
    };
  }[];
  user: User;
  first: boolean;
  last_listed: string;
  pickups: {
    multiple: boolean;
    users: User[];
    items: number;
  };
  veteran_delay: number;
}
