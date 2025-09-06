import React from 'react';

export const AuthContext = React.createContext({// authContext using react.createcontext;
    token: null, // represents the authentication token, initially set to null.
    userId: null, // represents the user ID, initially set to null.
    isAdmin: false, // represents whether the user has admin privileges, initially set to false
    login: (token, userId, isAdmin) => {}, // can be used to update the contexts state when the user logs out.
    logout: () => {},
});