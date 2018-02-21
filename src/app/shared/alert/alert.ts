export interface Alert {
  message: string;
  type: 'primary' | 'success' | 'info' | 'warning' | 'danger';
  isActive: boolean;
}
