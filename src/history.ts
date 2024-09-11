// check if we are using base path, if not this always is `/`
const baseLocation = new URL(document.baseURI);
export const baseUrl = window.globalConfig.baseUrlRouter || baseLocation.pathname;
