// Estrutura Try-Catch-Finally
try
{
    // Código que pode lançar uma exceção
    let result = riskyOperation();
    console.log(result);
} 
catch (error)
{
    // Tratamento da exceção
    console.error("Ocorreu um erro:", error);
} 
finally  // Opcional
{
    // Código que sempre será executado
    console.log("Operação finalizada.");
}

// Instrução Throw
function validateAge(age: number)
{
    if (age < 0)
    {
        throw new Error("Idade não pode ser negativa.");
    }
    return true;
}

try
{
    validateAge(-1);
}
catch (error)
{
    console.error("Erro de validação:", error.message);
}

// Estrutura Async/Await com Try-Catch
async function fetchData(url: string)
{
    try
    {
        let response = await fetch(url);
        if (!response.ok)
        {
            throw new Error("Erro na requisição: " + response.statusText);
        }
        let data = await response.json();
        console.log(data);
    }
    catch (error)
    {
        console.error("Erro ao buscar dados:", error);
    }
}

fetchData("https://api.example.com/data");
