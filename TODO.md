# Authentication Fix TODO

## Issue
- When logged in, accessing /signin redirects to /profile but shows blank screen
- Root cause: Redux auth state not hydrated on page reload, causing profile page to show skeleton instead of content

## Changes Made
- [x] Update signin page to save auth data to localStorage 'auth' after login
- [x] Update AuthProvider to read token from localStorage 'auth' instead of 'accessToken'
- [x] Update AuthProvider logout to clear 'auth' from localStorage

## Testing
- [ ] Login and verify /profile loads correctly
- [ ] Refresh /profile page and verify it still loads
- [ ] Access /signin while logged in and verify redirect to /profile works
- [ ] Logout and verify redirect to /signin
