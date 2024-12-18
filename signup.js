
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const DNI = document.getElementById("DNI").value;

    postData("createUser", {name, surname, DNI}, () => {
        alert("Usuario creado");
    });

    form.reset();
});