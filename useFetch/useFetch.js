import {  useState , useEffect, useRef } from 'react';


export const useFetch = ( url ) => {

    const isMounted = useRef(true);

    const [state, setState] = useState({ loading: true, data: null, error: null });

    useEffect( ()=> {

        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect( () => {
        setState( { loading: true, data: null, error: null } );
        
        
        fetch(url)
        .then( resp => resp.json())
        .then( data => {
            if ( isMounted.current ) {
                setState({
                    loading: false,
                    error: null,
                    data: data
                })
                //console.log(data)
            }
            
        })
        .catch( () => {
            setState( { 
                data: null,
                loading: false,
                error: 'Error loading data'
            })
        })

    }, [url]);
    
    return state;
}
