import React, { createContext } from 'react';

export const AuthContext = createContext({ auth: false });

function ContextWrapper(props) {
    // const [auth, setAuth] = useState(false);

    // useEffect(() => {
    //     // fetch

    //     setAuth(true);
    // }, []);

    return (
        <AuthContext.Provider value={{ auth: true }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default ContextWrapper;