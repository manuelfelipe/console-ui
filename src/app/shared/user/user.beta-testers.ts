export const USERS_ALLOWED_CONFIG = [
  // beavers
  'mmassou1', // Mark
  'mlopezc1', // Manuel
  'mserpie1', // Michael
  'vastrav2', // Val
  'ybakr1',   // Yamen
  // others
  'kmurywe1', // Khaled Murywed
  'agaerem1', // Alain Gaeremynck
  'dlevan1',  // Dan LeVan
  'rladam1',  // Razvan Lada-Moldovan
  'swanand1', // Stijn Wanand
  'vtrembl1', // Vincent Tremblay
  'lrodrig1', // Luis Javier Rodrigues
  'rboulan1', // Rémy Boulanouar
  'pchouze1', // Pierrick Chouzenoux
  'spang1',   // Simmons Pang
  'rkhan1',   // Raza Khan
];

export function isCurrentUserBetaAllowed(): boolean {
  try {
    const user = JSON.parse(localStorage['thecloud.user']);
    const username = user.username || '';

    return USERS_ALLOWED_CONFIG.includes(username.toLowerCase());
  } catch (e) {
    return false;
  }
}
