// import { useState } from "react";
// import type { ResData } from "../types/ResData";

// interface RequestState<T> {
//     data: T | null;
//     error: string | null;
//     isLoading: boolean;
// }

// const INITIAL_STATE = {
//     data: null,
//     error: null,
//     isLoading: false,
// };

// const useFetch = <T, P>(func: (params: P) => Promise<Response>) => {
//     const [state, setState] = useState<RequestState<T>>(INITIAL_STATE);
//     console.log('Usefetch:', { state });

//     const executeFetch = async (params: P) => {
//         setState({ data: null, error: null, isLoading: true });
//         const res = await func(params);
//         const resData = (await res.json()) as ResData<T>;
//         if (!resData.success)
//             return setState({
//                 data: null,
//                 error: resData.message,
//                 isLoading: false,
//             });
//         setState({ data: resData.data, error: null, isLoading: false });
//         return resData.data;
//     };
//     return { state, executeFetch };
// };

// export default useFetch;
