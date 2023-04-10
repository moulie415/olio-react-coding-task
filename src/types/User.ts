export default interface User {
  id: number;
  first_name: string;
  current_avatar: {
    original: string;
    large: string;
    small: string;
  };
  roles: string[];
  location: {
    latitude: number;
    longitude: number;
  };
  rating: {
    rating: number;
    number: number;
  };
  verifications: {
    method: string;
  }[];
}
