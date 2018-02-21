export const BEAVERS = [
  'mmassou1', // Mark
  'mlopezc1', // Manuel
  'mserpie1', // Michael
  'vastrav2', // Val
  'ybakr1',   // Yamen
  'drone',    // Drone
];

export function isCurrentBeaverUser(): boolean {
  try {
    const user = JSON.parse(localStorage['thecloud.user']);
    const username = user.username || '';

    return BEAVERS.includes(username.toLowerCase());
  } catch (e) {
    return false;
  }
}
