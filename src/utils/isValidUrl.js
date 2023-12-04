export const isValidUrl = (url) => {
    // عبارت منظم برای بررسی URL
    const urlPattern = /^http?:\/\/.*\.(jpeg|jpg|gif|png)$/i ;
    return urlPattern.test(url);
  };