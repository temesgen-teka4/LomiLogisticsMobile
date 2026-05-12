/**
 * LOMI LOGISTICS - GLOBAL TYPE DEFINITIONS
 */

export type VehicleType = 'small' | 'medium' | 'heavy';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';

export type Driver = {
  id: string;
  name: string;
  email: string;
  phone: string;
  rating: number;
  totalJobs: number;
  vehicleType: string;
  licensePlate: string;
};

export type Task = {
  id: string;
  customer: string;
  location: string;
  price: string;
  status: TaskStatus;
  weight: string;
  loadType: string;
  phone: string;
  latitude: number;
  longitude: number;
};

export type RootStackParamList = {
  Login: undefined;      // The Welcome/Language Screen
  LoginForm: undefined;  // The Email/Password Screen
  Register: undefined;
  AdminPanel: undefined;
  VehicleCapability: undefined; 
  Dashboard: { vehicleType: VehicleType };
  Details: { task: Task };
  History: undefined;
  Profile: { driver: Driver }; 
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}