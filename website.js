const API_KEY = "API KEY";

const button = document.getElementById("searchButton");

button.addEventListener("click", searchName);

document
.getElementById("nameInput")
.addEventListener("keypress", function(e){

    if(e.key==="Enter"){
        searchName();
    }

});

async function searchName() {

    const name = document.getElementById("nameInput").value.trim();
    const result = document.getElementById("result");

    if (!name) {
        result.innerHTML = "<p>Please enter a name.</p>";
        return;
    }

    result.innerHTML = "<p>Searching...</p>";

    try {

        const response = await fetch(
            `https://www.behindthename.com/api/lookup.json?name=${encodeURIComponent(name)}&key=${API_KEY}`
        );

        const data = await response.json();

        if (data.length === 0) {
            result.innerHTML = "<p>No names found.</p>";
            return;
        }

        let html = "";

        data.forEach(person => {

            const gender =
                person.gender === "m" ? "Male" :
                person.gender === "f" ? "Female" :
                "Male & Female";

            const usages = person.usages
                .map(u => u.usage_full)
                .join(", ");

            html += `
                <div class="card">
                    <h2>${person.name}</h2>

                    <p><strong>Gender:</strong> ${gender}</p>

                    <p><strong>Used In:</strong> ${usages}</p>

                    <hr>
                </div>
            `;

        });

        result.innerHTML = html;

    }
    catch(error){

        console.error(error);

        result.innerHTML =
        "<p>Name not Found; Something went wrong</p>";

    }

}

   