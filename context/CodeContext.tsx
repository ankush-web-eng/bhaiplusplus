'use client';
import { CodeState, CodeContextType } from '@/types/code';

import React, { createContext, useContext, useState } from 'react';
const CodeContext = createContext<CodeContextType | undefined>(undefined);

export function CodeProvider({ children }: { children: React.ReactNode }) {
    const [codeState, setCodeState] = useState<CodeState>({
        code: `bhai_sun x = 10;

jaha_tak (x > 0) {
  x = x - 1;
  agar (x == 4) {
    bas_kar_bhai;
  } nahi_to_agar (x == 7) {
    aage_bhad_bhai;
  }
  bol_bhai(x);
}`,
        response: '',
        isLoading: false,
    });

    const setCode = (code: string) => {
        setCodeState(prev => ({ ...prev, code }));
    };

    const submitCode = async () => {
        try {
            setCodeState(prev => ({ ...prev, isLoading: true }));
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/compile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: codeState.code }),
            });

            const data = await response.json();
            setCodeState(prev => ({
                ...prev,
                response: data.error || data.result,
                isLoading: false,
            }));
        } catch (error) {
            setCodeState(prev => ({
                ...prev,
                response: 'Error executing code. Please try again.',
                isLoading: false,
            }));
            console.error(error);
        }
    };

    return (
        <CodeContext.Provider value={{ codeState, setCode, submitCode }}>
            {children}
        </CodeContext.Provider>
    );
}

export const useCode = () => {
    const context = useContext(CodeContext);
    if (!context) {
        throw new Error('useCode must be used within a CodeProvider');
    }
    return context;
};

// 'use client';
// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import { CodeState, CodeContextType } from '@/types/code';

// const CodeContext = createContext<CodeContextType | undefined>(undefined);

// export function CodeProvider({ children }: { children: React.ReactNode }) {
//     const [codeState, setCodeState] = useState<CodeState>({
//         code: '',
//         response: '',
//         isLoading: false,
//     });
//     const [ws, setWs] = useState<WebSocket | null>(null);

//     useEffect(() => {
//         const websocket = new WebSocket('ws://localhost:8081');
//         setWs(websocket);

//         websocket.onopen = () => console.log('Connected to WebSocket server');
//         websocket.onmessage = (event) => {
//             console.log('Received message:', event.data);
//             const { result } = JSON.parse(event.data);
//             setCodeState((prev) => ({
//                 ...prev,
//                 response: result,
//                 isLoading: false,
//             }));
//         };
//         websocket.onclose = () => console.log('WebSocket connection closed');

//         return () => websocket.close();
//     }, []);

//     const setCode = (code: string) => {
//         setCodeState((prev) => ({ ...prev, code }));
//     };

//     const submitCode = async () => {
//         try {
//             const requestId = uuidv4();
//             setCodeState((prev) => ({ ...prev, isLoading: true }));

//             if (ws && ws.readyState === WebSocket.OPEN) {
//                 ws.send(JSON.stringify({ requestId }));
//             }

//             await fetch(`/api/publishtokafka`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ code: codeState.code, requestId }),
//             });
//         } catch (error) {
//             setCodeState((prev) => ({
//                 ...prev,
//                 response: 'Error executing code. Please try again.',
//                 isLoading: false,
//             }));
//             console.error(error);
//         }
//     };

//     return (
//         <CodeContext.Provider value={{ codeState, setCode, submitCode }}>
//             {children}
//         </CodeContext.Provider>
//     );
// }

// export const useCode = () => {
//     const context = useContext(CodeContext);
//     if (!context) {
//         throw new Error('useCode must be used within a CodeProvider');
//     }
//     return context;
// };
