// Get the base API URL based on environment
const isProd = window.location.hostname === 'meekandev.github.io';
const API_BASE = isProd ? 'https://meekandev-github-io.onrender.com' : '';

// API endpoints
export async function fetchDrinks() {
    try {
        const response = await fetch(`${API_BASE}/api/drinks`);
        if (!response.ok) throw new Error('Network response was not ok');
        const drinks = await response.json();
        return drinks;
    } catch (error) {
        console.error('Error fetching drinks:', error);
        return [];
    }
}

export async function fetchCustomizations() {
    try {
        const response = await fetch(`${API_BASE}/api/customizations`);
        if (!response.ok) throw new Error('Network response was not ok');
        const customizations = await response.json();
        return customizations;
    } catch (error) {
        console.error('Error fetching customizations:', error);
        return [];
    }
}

export async function submitOrder(order) {
    try {
        const response = await fetch(`${API_BASE}/api/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(order)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error submitting order:', error);
        return null;
    }
}

export const API_URL = API_BASE;
