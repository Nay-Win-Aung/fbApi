document.addEventListener("DOMContentLoaded", () => {
    const apiForm = document.getElementById("apiForm");
    const resultContainer = document.getElementById("result");

    apiForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const apiUrl = document.getElementById("apiUrl").value;
        const accessToken = document.getElementById("accessToken").value;

        try {
            const data = await fetchFacebookData(apiUrl, accessToken);
            displayData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    });

    async function fetchFacebookData(apiUrl, accessToken) {
        const response = await fetch(`${apiUrl}&access_token=${accessToken}`);
        const data = await response.json();
        return data;
    }

    function displayData(data) {
        resultContainer.innerHTML = `
            <h2>Data Result:</h2>
            <table class="result-table">
                <thead>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(data).map(([field, value]) => `
                        <tr>
                            <td>${field}</td>
                            <td>${typeof value === "object" ? JSON.stringify(value) : value}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        `;
    }
});
