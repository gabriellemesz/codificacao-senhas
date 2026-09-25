const passwordInput = document.getElementById("password");
const result = document.getElementById("result");

const generateButton = document.getElementById("generate");
const copyButton = document.getElementById("copy");
const clearButton = document.getElementById("clear");

const togglePassword = document.getElementById("togglePassword");
const message = document.getElementById("message");


// Mostrar / esconder senha
togglePassword.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "👁";
    }
});


// Gerar SHA-256
generateButton.addEventListener("click", async () => {

    const password = passwordInput.value;

    if (!password) {
        message.textContent = "Digite uma senha primeiro.";
        message.style.color = "#f87171";
        return;
    }

    try {

        const encoder = new TextEncoder();

        const data = encoder.encode(password);

        const hashBuffer = await crypto.subtle.digest(
            "SHA-256",
            data
        );

        const hashArray = Array.from(
            new Uint8Array(hashBuffer)
        );

        const hashHex = hashArray
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("");

        result.value = hashHex;

        message.textContent = "Hash gerado com sucesso!";
        message.style.color = "#4ade80";

    } catch (error) {

        console.error(error);

        message.textContent =
            "Erro ao gerar o hash.";

        message.style.color = "#f87171";
    }
});


// Copiar hash
copyButton.addEventListener("click", async () => {

    if (!result.value) {
        message.textContent =
            "Não há nenhum hash para copiar.";

        message.style.color = "#f87171";
        return;
    }

    try {

        await navigator.clipboard.writeText(result.value);

        message.textContent =
            "Hash copiado para a área de transferência!";

        message.style.color = "#4ade80";

    } catch (error) {

        message.textContent =
            "Não foi possível copiar.";

        message.style.color = "#f87171";
    }
});


// Limpar
clearButton.addEventListener("click", () => {

    passwordInput.value = "";
    result.value = "";

    message.textContent = "";

    passwordInput.focus();
});
