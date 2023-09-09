import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const LoginFormNew = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (accessToken) {
            fetch('https://api.tiktok.com/v1/user/info/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('API Request Failed');
                    }
                    return response.json();
                })
                .then((data) => {
                    setUserInfo(data);
                })
                .catch((error) => {
                    console.error('API Request Error:', error);
                });
        }
    }, [accessToken]);

    const initiateTikTokLogin = async () => {
        router.push('/api/oauth');
    };

    return (
        <div>
            {accessToken ? (
                <div>
                    <p>Authenticated</p>
                    {userInfo && (
                        <div>
                            <p>User Info:</p>
                            <pre>{JSON.stringify(userInfo, null, 2)}</pre>
                        </div>
                    )}
                </div>
            ) : (
                <button onClick={initiateTikTokLogin}>
                    Login with TikTok
                </button>
            )}
        </div>
    );
};

export default LoginFormNew;
