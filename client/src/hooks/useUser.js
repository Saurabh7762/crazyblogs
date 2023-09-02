import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useUser=()=> {
    const [user, setUser]= useState(null);
    const [isLoding, setIsLoading]= useState(true);

    useEffect(()=>{
        const unsubscribe= onAuthStateChanged(getAuth(), user=>{
            setUser(user);
            setIsLoading(false);
        });
        return unsubscribe;

    },[]);


  return {user, isLoding};
}

export default useUser
