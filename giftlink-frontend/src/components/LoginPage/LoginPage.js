import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
    // useState hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // handleLogin function
    const handleLogin = async () => {
        console.log("Login invoked");

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",         // Content-Type header
                    "Authorization": "Bearer sampleAuthToken"   // Authorization header
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Login successful:", data);
                alert("Login successful!");
                sessionStorage.setItem("auth-token", data.token);
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred during login");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>

                        {/* Email input */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password input */}
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Login button */}
                        <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
                            Login
                        </button>

                        <p className="mt-4 text-center">
                            New here? <a href="/app/register" className="text-primary">Register Here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
